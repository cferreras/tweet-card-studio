"use client";

import { MoreHorizontal } from "lucide-react";
import { AvatarUploader } from "@/components/AvatarUploader";
import { EditableText } from "@/components/EditableText";
import { FormatMenu } from "@/components/FormatMenu";
import { ImageDropZone } from "@/components/ImageDropZone";

export type TweetFormat = "horizontal" | "vertical";
export type ThemeMode = "light" | "dark";

export type TweetState = {
  name: string;
  handle: string;
  text: string;
  time: string;
  date: string;
  avatarUrl: string | null;
  imageUrl: string | null;
  imageVisible: boolean;
  format: TweetFormat;
  theme: ThemeMode;
};

type TweetPreviewProps = {
  state: TweetState;
  isMenuOpen: boolean;
  isDownloading: boolean;
  onStateChange: (nextState: Partial<TweetState>) => void;
  onMenuToggle: () => void;
  onDownload: () => void;
  onUseCurrentDate: () => void;
  onThemeChange: (theme: ThemeMode) => void;
  onReset: () => void;
};

export function TweetPreview({
  state,
  isMenuOpen,
  isDownloading,
  onStateChange,
  onMenuToggle,
  onDownload,
  onUseCurrentDate,
  onThemeChange,
  onReset,
}: TweetPreviewProps) {
  const isVertical = state.format === "vertical";
  const imageBackgroundColor = "var(--color-placeholder)";

  return (
    <article
      className={[
        "relative bg-card text-ink",
        "mx-auto overflow-visible",
        isVertical ? "w-[540px] px-8 pb-10 pt-9" : "w-[820px] px-9 pb-8 pt-9",
      ].join(" ")}
    >
      <header className="flex items-start gap-5">
        <AvatarUploader
          avatarUrl={state.avatarUrl}
          accentColor="#8aa0b2"
          onAvatarChange={(avatarUrl) => onStateChange({ avatarUrl })}
        />

        <div className="min-w-0 flex-1 pt-1">
          <EditableText
            aria-label="Name"
            value={state.name}
            onChange={(name) => onStateChange({ name })}
            className={[
              "max-w-full break-words text-[30px] font-[800] leading-[1.04] text-ink",
              isVertical ? "pr-12" : "pr-16",
            ].join(" ")}
          />
          <EditableText
            aria-label="Handle"
            value={state.handle}
            onChange={(handle) => onStateChange({ handle })}
            className="mt-1 max-w-full break-words text-[28px] font-[450] leading-[1.08] text-muted"
          />
        </div>

        <div className="relative -mr-1">
          <button
            type="button"
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-[var(--color-hover)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus)]"
            onClick={onMenuToggle}
          >
            <MoreHorizontal aria-hidden className="h-7 w-7 stroke-[3]" />
          </button>
          <FormatMenu
            format={state.format}
            theme={state.theme}
            isOpen={isMenuOpen}
            isDownloading={isDownloading}
            onFormatChange={(format) => onStateChange({ format })}
            onThemeChange={onThemeChange}
            onDownload={onDownload}
            onUseCurrentDate={onUseCurrentDate}
            onRestoreImage={() => onStateChange({ imageVisible: true, imageUrl: null })}
            onReset={onReset}
          />
        </div>
      </header>

      <EditableText
        aria-label="Post text"
        value={state.text}
        onChange={(text) => onStateChange({ text })}
        multiline
        className={[
          "mt-9 whitespace-pre-wrap break-words text-[31px] font-[450] leading-[1.22] text-ink",
          isVertical ? "min-h-[44px]" : "min-h-[44px]",
        ].join(" ")}
      />

      {state.imageVisible ? (
        <ImageDropZone
          imageUrl={state.imageUrl}
          backgroundColor={imageBackgroundColor}
          format={state.format}
          onImageChange={(imageUrl) => onStateChange({ imageUrl })}
          onImageRemove={() => onStateChange({ imageVisible: false, imageUrl: null })}
        />
      ) : null}

      <div className="mt-8 flex flex-wrap items-baseline gap-x-2 text-[27px] font-[450] leading-tight text-muted">
        <EditableText
          aria-label="Time"
          value={state.time}
          onChange={(time) => onStateChange({ time })}
          className="min-w-[2ch] max-w-full break-words"
        />
        <span aria-hidden>·</span>
        <EditableText
          aria-label="Date"
          value={state.date}
          onChange={(date) => onStateChange({ date })}
          className="min-w-[2ch] max-w-full break-words"
        />
      </div>

      <div className="mt-8 h-px w-full bg-rule" />
    </article>
  );
}
