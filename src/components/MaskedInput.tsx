import React, {useEffect, useRef, useState} from "react";

type Props = {
  mask: string;
  value?: string;
  onChange?: (digits: string) => void;
};

export default function MaskedInput({mask, value = "", onChange}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [digits, setDigits] = useState<string>(() => {
    return value.replace(/\D/g, "");
  });
  const buildMasked = (d: string) => {
    let i = 0;
    return mask.replace(/_/g, () => (d[i++] ?? "_"));
  };

  const masked = buildMasked(digits);

  const placeholderIndexBeforePos = (pos: number) => {
    let count = 0;
    for (let i = 0; i < pos && i < mask.length; i++) {
      if (mask[i] === "_") count++;
    }
    return count;
  };

  const posForDigitIndex = (digitIndex: number) => {
    let found = 0;
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === "_") {
        if (found === digitIndex) return i;
        found++;
      }
    }
    return mask.length;
  };

  const updateDigits = (newDigits: string, caretAtDigitIndex?: number | null) => {
    const maxDigits = (mask.match(/_/g) || []).length;
    const trimmed = newDigits.slice(0, maxDigits);
    setDigits(trimmed);
    onChange?.(trimmed);
    requestAnimationFrame(() => {
      const idx = caretAtDigitIndex ?? trimmed.length; // по умолчанию — конец введённых цифр
      const pos = posForDigitIndex(idx);
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = inputRef.current!;
    const selectionStart = el.selectionStart ?? 0;
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const insertAt = placeholderIndexBeforePos(selectionStart);
      const newDigits =
          digits.slice(0, insertAt) + e.key + digits.slice(insertAt);
      updateDigits(newDigits, insertAt + 1);
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      const beforeIndex = placeholderIndexBeforePos(selectionStart);
      if (beforeIndex === 0) {
        return;
      }
      const removeIndex = beforeIndex - 1;
      const newDigits = digits.slice(0, removeIndex) + digits.slice(removeIndex + 1);
      updateDigits(newDigits, removeIndex);
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();
      const atIndex = placeholderIndexBeforePos(selectionStart);
      if (atIndex >= digits.length) return;
      const newDigits = digits.slice(0, atIndex) + digits.slice(atIndex + 1);
      updateDigits(newDigits, atIndex);
      return;
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const el = inputRef.current!;
    const pos = el.selectionStart ?? 0;
    const insertAt = placeholderIndexBeforePos(pos);
    const newDigits = digits.slice(0, insertAt) + pasted + digits.slice(insertAt);
    updateDigits(newDigits, insertAt + pasted.length);
  };
  const onFocus = () => {
    requestAnimationFrame(() => {
      const firstEmpty = masked.indexOf("_");
      const pos = firstEmpty === -1 ? mask.length : firstEmpty;
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };

  useEffect(() => {
    if (!value) return;
    const extDigits = value.replace(/\D/g, "");
    if (extDigits !== digits) {
      setDigits(extDigits);
    }
  }, [value]);

  return (
      <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          value={masked}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onFocus={onFocus}
          onChange={() => {
          }}
          aria-label="phone"
      />
  );
}
