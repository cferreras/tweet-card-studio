"use client";

import { ChangeEvent, useRef } from "react";
import { Plus } from "lucide-react";
import { readImageFile } from "@/lib/readImageFile";

type AvatarUploaderProps = {
  avatarUrl: string | null;
  accentColor: string;
  onAvatarChange: (url: string) => void;
};

export function AvatarUploader({
  avatarUrl,
  accentColor,
  onAvatarChange,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextUrl = await readImageFile(file);
    onAvatarChange(nextUrl);
    event.target.value = "";
  }

  return (
    <div className="relative h-[76px] w-[76px] shrink-0">
      <button
        type="button"
        className="group block h-full w-full overflow-hidden rounded-full bg-placeholder focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus)]"
        aria-label="Change avatar"
        onClick={() => inputRef.current?.click()}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            className="h-full w-full object-cover transition duration-150 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8cb8ee] via-[#f0c084] to-[#7b4c31] text-[28px] font-black text-white">
            T
          </span>
        )}
      </button>
      <button
        type="button"
        className="export-hidden absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-card text-white shadow-[0_2px_8px_rgba(15,20,25,0.16)] transition brightness-100 hover:brightness-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-focus)]"
        style={{ backgroundColor: accentColor }}
        aria-label="Upload avatar"
        onClick={() => inputRef.current?.click()}
      >
        <Plus aria-hidden className="h-5 w-5 stroke-[3]" />
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
