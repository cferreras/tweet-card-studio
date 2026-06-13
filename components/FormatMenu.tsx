"use client";

import { CalendarClock, Download, ImageOff, Moon, RotateCcw, Sun } from "lucide-react";

type FormatMenuProps = {
  format: "horizontal" | "vertical";
  theme: "light" | "dark";
  isOpen: boolean;
  isDownloading: boolean;
  onFormatChange: (format: "horizontal" | "vertical") => void;
  onThemeChange: (theme: "light" | "dark") => void;
  onDownload: () => void;
  onUseCurrentDate: () => void;
  onRestoreImage: () => void;
  onReset: () => void;
};

export function FormatMenu({
  format,
  theme,
  isOpen,
  isDownloading,
  onFormatChange,
  onThemeChange,
  onDownload,
  onUseCurrentDate,
  onRestoreImage,
  onReset,
}: FormatMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-11 z-30 w-[244px] rounded-lg border border-[var(--color-menu-border)] bg-menu p-2 text-sm shadow-[var(--shadow-menu)]">
      <div className="px-2 pb-2 pt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
        Format
      </div>
      <div className="grid grid-cols-2 gap-1 rounded-md bg-[var(--color-soft-control)] p-1">
        {(["horizontal", "vertical"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={[
              "rounded px-3 py-2 font-semibold transition",
              format === option
                ? "bg-card text-ink shadow-[0_1px_4px_rgba(15,20,25,0.08)]"
                : "text-muted hover:text-ink",
            ].join(" ")}
            onClick={() => onFormatChange(option)}
          >
            {option === "horizontal" ? "Horizontal" : "Vertical"}
          </button>
        ))}
      </div>

      <div className="mt-3 px-2 pb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
        Theme
      </div>
      <div className="grid grid-cols-2 gap-1 rounded-md bg-[var(--color-soft-control)] p-1">
        {(["light", "dark"] as const).map((option) => {
          const Icon = option === "light" ? Sun : Moon;

          return (
            <button
              key={option}
              type="button"
              className={[
                "flex items-center justify-center gap-2 rounded px-3 py-2 font-semibold transition",
                theme === option
                  ? "bg-card text-ink shadow-[0_1px_4px_rgba(15,20,25,0.08)]"
                  : "text-muted hover:text-ink",
              ].join(" ")}
              onClick={() => onThemeChange(option)}
            >
              <Icon aria-hidden className="h-4 w-4" />
              {option === "light" ? "Light" : "Dark"}
            </button>
          );
        })}
      </div>

      <div className="my-3 h-px bg-rule" />

      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-semibold text-ink transition hover:bg-[var(--color-hover)]"
        disabled={isDownloading}
        onClick={onDownload}
      >
        <Download aria-hidden className="h-4 w-4" />
        {isDownloading ? "Preparing..." : "Download PNG"}
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-semibold text-ink transition hover:bg-[var(--color-hover)]"
        onClick={onUseCurrentDate}
      >
        <CalendarClock aria-hidden className="h-4 w-4" />
        Current date
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-semibold text-ink transition hover:bg-[var(--color-hover)]"
        onClick={onRestoreImage}
      >
        <ImageOff aria-hidden className="h-4 w-4" />
        Restore image
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-semibold text-ink transition hover:bg-[var(--color-hover)]"
        onClick={onReset}
      >
        <RotateCcw aria-hidden className="h-4 w-4" />
        Reset template
      </button>
    </div>
  );
}
