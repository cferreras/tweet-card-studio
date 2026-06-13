"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { ThemeMode, TweetPreview, TweetState } from "@/components/TweetPreview";

const initialState: TweetState = {
  name: "[Editable name]",
  handle: "[@editablehandle]",
  text: "[Write your post here]",
  time: "[Time]",
  date: "[Date]",
  avatarUrl: null,
  imageUrl: null,
  imageVisible: true,
  format: "horizontal",
  theme: "light",
};

const themeStorageKey = "tweet-card-studio-theme";

export function TweetComposer() {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewViewportRef = useRef<HTMLDivElement>(null);
  const [tweet, setTweet] = useState<TweetState>(initialState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const [previewHeight, setPreviewHeight] = useState<number | null>(null);
  const exportWidth = tweet.format === "vertical" ? 540 : 820;

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (storedTheme === "light" || storedTheme === "dark") {
      updateTweet({ theme: storedTheme });
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    updateTweet({ theme: prefersDark ? "dark" : "light" });
  }, []);

  useEffect(() => {
    function updateScale() {
      const viewportWidth = previewViewportRef.current?.clientWidth ?? exportWidth;
      setPreviewScale(Math.min(1, viewportWidth / exportWidth));
    }

    updateScale();
    window.addEventListener("resize", updateScale);

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateScale) : null;

    if (previewViewportRef.current) {
      resizeObserver?.observe(previewViewportRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScale);
      resizeObserver?.disconnect();
    };
  }, [exportWidth]);

  useEffect(() => {
    if (!previewRef.current) return;

    function updateHeight() {
      if (!previewRef.current) return;
      setPreviewHeight(previewRef.current.offsetHeight);
    }

    updateHeight();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateHeight) : null;

    resizeObserver?.observe(previewRef.current);

    return () => resizeObserver?.disconnect();
  }, [exportWidth]);

  function updateTweet(nextState: Partial<TweetState>) {
    setTweet((current) => ({ ...current, ...nextState }));
  }

  async function waitForImages(node: HTMLElement) {
    const images = Array.from(node.querySelectorAll("img"));

    await Promise.all(
      images.map(async (image) => {
        if (image.complete && image.naturalWidth > 0) return;

        if (typeof image.decode === "function") {
          await image.decode().catch(() => undefined);
          return;
        }

        await new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      }),
    );
  }

  async function handleDownload() {
    if (!previewRef.current || isDownloading) return;

    setIsMenuOpen(false);
    setIsDownloading(true);
    setDownloadError(null);
    document.activeElement instanceof HTMLElement && document.activeElement.blur();

    await new Promise((resolve) => requestAnimationFrame(resolve));

    try {
      previewRef.current.classList.add("is-exporting");
      await waitForImages(previewRef.current);
      const exportHeight = previewRef.current.scrollHeight;

      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: tweet.theme === "dark" ? "#000000" : "#ffffff",
        skipFonts: false,
        width: exportWidth,
        height: exportHeight,
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "tweet-card.png";
      link.href = objectUrl;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (error) {
      console.error("PNG download failed", error);
      setDownloadError("Could not download the PNG. Please try again.");
    } finally {
      previewRef.current?.classList.remove("is-exporting");
      setIsDownloading(false);
    }
  }

  function handleReset() {
    setTweet((current) => ({ ...initialState, theme: current.theme }));
    setIsMenuOpen(false);
  }

  function handleUseCurrentDate() {
    const now = new Date();
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now);
    const date = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(now);

    updateTweet({ time, date });
    setIsMenuOpen(false);
  }

  function handleThemeChange(theme: ThemeMode) {
    window.localStorage.setItem(themeStorageKey, theme);
    updateTweet({ theme });
  }

  return (
    <main
      data-theme={tweet.theme}
      className="flex min-h-screen flex-col items-center justify-center bg-app px-5 py-10 transition-colors duration-200"
    >
      <header className="mb-7 text-center">
        <h1 className="text-[28px] font-[800] leading-tight text-ink">
          Tweet Card Studio
        </h1>
        <p className="mt-1 text-[14px] font-medium text-muted">
          Create clean tweet-style images in seconds.
        </p>
      </header>
      <div
        ref={previewViewportRef}
        className="mx-auto w-full overflow-visible"
        style={{
          maxWidth: exportWidth,
          height: previewHeight ? previewHeight * previewScale : undefined,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            width: exportWidth,
            transform: `scale(${previewScale})`,
          }}
        >
          <div ref={previewRef} className="bg-card" style={{ width: exportWidth }}>
            <TweetPreview
              state={tweet}
              isMenuOpen={isMenuOpen}
              isDownloading={isDownloading}
              onStateChange={updateTweet}
              onMenuToggle={() => setIsMenuOpen((open) => !open)}
              onDownload={handleDownload}
              onUseCurrentDate={handleUseCurrentDate}
              onThemeChange={handleThemeChange}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 text-center text-[13px] font-medium text-muted">
        Made by{" "}
        <a
          href="https://carlosferreras.com"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink transition hover:text-muted"
        >
          Carlos Ferreras
        </a>{" "}
        · carlosferreras.com
      </footer>
      {downloadError ? (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-md border border-[var(--color-menu-border)] bg-menu px-4 py-2 text-sm font-semibold text-ink shadow-[var(--shadow-menu)]"
        >
          {downloadError}
        </div>
      ) : null}
    </main>
  );
}
