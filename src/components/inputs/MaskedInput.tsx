import React, {useEffect, useRef, useState} from "react";
import {useFormikContext} from "formik";

type Props = {
  mask: string;
  name: string;
};

export default function MaskedInput({mask, name}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {setFieldValue, setFieldTouched, values} = useFormikContext<any>();

  const value: string = values[name] || "";
  const [digits, setDigits] = useState<string>("");

  const buildMasked = (d: string) => {
    let i = 0;
    return mask.replace(/_/g, () => d[i++] ?? "_");
  };

  const masked = buildMasked(digits);

  const maxDigits = (mask.match(/_/g) || []).length;

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

  const updateDigits = (newDigits: string, caretIndex?: number) => {
    const trimmed = newDigits.slice(0, maxDigits);
    setDigits(trimmed);
    setFieldValue(name, trimmed);

    requestAnimationFrame(() => {
      const idx = caretIndex ?? trimmed.length;
      const pos = posForDigitIndex(idx);
      inputRef.current?.setSelectionRange(pos, pos);
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = inputRef.current!;
    const cursor = el.selectionStart ?? 0;

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const index = placeholderIndexBeforePos(cursor);
      updateDigits(
          digits.slice(0, index) + e.key + digits.slice(index),
          index + 1
      );
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      const index = placeholderIndexBeforePos(cursor) - 1;
      if (index < 0) return;
      updateDigits(
          digits.slice(0, index) + digits.slice(index + 1),
          index
      );
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();
      const index = placeholderIndexBeforePos(cursor);
      if (index >= digits.length) return;
      updateDigits(
          digits.slice(0, index) + digits.slice(index + 1),
          index
      );
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const el = inputRef.current!;
    const cursor = el.selectionStart ?? 0;
    const index = placeholderIndexBeforePos(cursor);

    updateDigits(
        digits.slice(0, index) + pasted + digits.slice(index),
        index + pasted.length
    );
  };

  const onFocus = () => {
    requestAnimationFrame(() => {
      const pos = masked.indexOf("_");
      inputRef.current?.setSelectionRange(
          pos === -1 ? mask.length : pos,
          pos === -1 ? mask.length : pos
      );
    });
  };

  const onBlur = () => {
    setFieldTouched(name, true);
  };

  useEffect(() => {
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
          onBlur={onBlur}
          onChange={() => {
          }}
          aria-label="phone"
      />
  );
}
