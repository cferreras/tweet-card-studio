"use client";

import {
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
  useLayoutEffect,
  useRef,
} from "react";

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  "aria-label": string;
};

export function EditableText({
  value,
  onChange,
  className,
  multiline = false,
  "aria-label": ariaLabel,
}: EditableTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (ref.current && value !== lastValueRef.current) {
      ref.current.innerText = value;
      lastValueRef.current = value;
    }
  }, [value]);

  function handleInput() {
    const nextValue = ref.current?.innerText ?? "";
    lastValueRef.current = nextValue;
    onChange(nextValue);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      ref.current?.blur();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, multiline ? text : text.replace(/\s+/g, " "));
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    const text = event.currentTarget.innerText.trim();
    if (!/^\[.+\]$/.test(text)) return;

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(event.currentTarget);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  return (
    <div
      ref={ref}
      aria-label={ariaLabel}
      className={className}
      contentEditable
      role="textbox"
      spellCheck={false}
      suppressContentEditableWarning
      onInput={handleInput}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
    />
  );
}
