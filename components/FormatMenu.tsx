"use client";

import { Download, ImageOff, RotateCcw } from "lucide-react";

type FormatMenuProps = {
  format: "horizontal" | "vertical";
  backgroundColor: string;
  isOpen: boolean;
  isDownloading: boolean;
  onFormatChange: (format: "horizontal" | "vertical") => void;
  onBackgroundColorChange: (color: string) => void;
  onDownload: () => void;
  onRestoreImage: () => void;
  onReset: () => void;
};

const colorOptions = ["#b79bff", "#a8d8ff", "#ffd166", "#f4a6b7"];

export function FormatMenu({
  format,
  backgroundColor,
  isOpen,
  isDownloading,
  onFormatChange,
  onBackgroundColorChange,
  onDownload,
  onRestoreImage,
  onReset,
}: FormatMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-11 z-30 w-[244px] rounded-lg border border-[#dde6ee] bg-white p-2 text-sm shadow-[0_16px_42px_rgba(15,20,25,0.12)]">
      <div className="px-2 pb-2 pt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
        Format
      </div>
      <div className="grid grid-cols-2 gap-1 rounded-md bg-[#f2f5f7] p-1">
        {(["horizontal", "vertical"] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={[
              "rounded px-3 py-2 font-semibold transition",
              format === option
                ? "bg-white text-ink shadow-[0_1px_4px_rgba(15,20,25,0.08)]"
                : "text-muted hover:text-ink",
            ].join(" ")}
            onClick={() => onFormatChange(option)}
          >
            {option === "horizontal" ? "Horizontal" : "Vertical"}
          </button>
        ))}
      </div>

      <div className="mt-3 px-2 pb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
        Background
      </div>
      <div className="grid grid-cols-4 gap-2 px-2">
        {colorOptions.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Change background to ${color}`}
            className={[
              "h-8 rounded-full border transition",
              backgroundColor.toLowerCase() === color.toLowerCase()
                ? "border-ink ring-2 ring-ink/10"
                : "border-[#dce5ec]",
            ].join(" ")}
            style={{ backgroundColor: color }}
            onClick={() => onBackgroundColorChange(color)}
          />
        ))}
      </div>

      <div className="my-3 h-px bg-rule" />

      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-semibold text-ink transition hover:bg-[#f4f7f9]"
        disabled={isDownloading}
        onClick={onDownload}
      >
        <Download aria-hidden className="h-4 w-4" />
        {isDownloading ? "Preparing..." : "Download PNG"}
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-semibold text-ink transition hover:bg-[#f4f7f9]"
        onClick={onRestoreImage}
      >
        <ImageOff aria-hidden className="h-4 w-4" />
        Restore image
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-semibold text-ink transition hover:bg-[#f4f7f9]"
        onClick={onReset}
      >
        <RotateCcw aria-hidden className="h-4 w-4" />
        Reset template
      </button>
    </div>
  );
}
