"use client";

import { ChangeEvent, useRef } from "react";
import { Plus, X } from "lucide-react";
import { readImageFile } from "@/lib/readImageFile";

type ImageDropZoneProps = {
  imageUrl: string | null;
  backgroundColor: string;
  format: "horizontal" | "vertical";
  onImageChange: (url: string) => void;
  onImageRemove: () => void;
};

export function ImageDropZone({
  imageUrl,
  backgroundColor,
  format,
  onImageChange,
  onImageRemove,
}: ImageDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextUrl = await readImageFile(file);
    onImageChange(nextUrl);
    event.target.value = "";
  }

  return (
    <div
      className={[
        "relative mt-8 overflow-hidden rounded-[28px]",
        "transition-colors duration-200",
        format === "horizontal" ? "h-[360px]" : "h-[608px]",
      ].join(" ")}
      style={{ backgroundColor }}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      ) : null}
      <button
        type="button"
        aria-label="Remove image block"
        className="export-hidden absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-[var(--color-menu-border)] bg-menu text-ink shadow-[var(--shadow-floating)] transition hover:bg-[var(--color-hover)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus)]"
        onClick={(event) => {
          event.stopPropagation();
          onImageRemove();
        }}
      >
        <X aria-hidden className="h-5 w-5 stroke-[3]" />
      </button>
      <button
        type="button"
        aria-label="Upload main image"
        className={[
          "group absolute inset-0 grid place-items-center",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#8aa0b2]/35",
          imageUrl ? "bg-black/0 hover:bg-black/[0.03]" : "hover:bg-black/[0.02]",
        ].join(" ")}
        onClick={() => inputRef.current?.click()}
      >
        {!imageUrl ? (
          <span className="grid h-28 w-28 place-items-center rounded-full border border-rule bg-card shadow-[0_10px_28px_rgba(15,20,25,0.08)] transition group-hover:border-muted/45">
            <Plus aria-hidden className="h-16 w-16 stroke-[2.4] text-muted" />
          </span>
        ) : null}
      </button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFile}
      />
    </div>
  );
}
