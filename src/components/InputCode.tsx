import React, {useEffect, useRef} from "react";
import {useFormikContext} from "formik";

type FormValues = {
  isCode: string;
};

export default function InputCode({sendCode}: { sendCode: (code: string) => void }) {
  const {errors} = useFormikContext<FormValues>();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleInput = (
      e: React.FormEvent<HTMLInputElement>,
      index: number
  ) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/\D/g, "").slice(0, 1);

    if (!input.value) return;

    const next = inputsRef.current[index + 1];
    if (next) {
      next.focus();
      return;
    }

    const code = inputsRef.current
        .map((inp) => inp?.value || "")
        .join("");
    sendCode(code);
    input.blur();
  };

  return (
      <div className="input-container">
        <label className="input-label">Code from SMS</label>
        <div className="inputs-row-elements numbers">
          {[0, 1, 2, 3].map((i) => (
              <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  placeholder={String(i + 1)}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  onInput={(e) => handleInput(e, i)}
              />
          ))}
        </div>
        {errors.isCode && (
            <span className="error">{errors.isCode}</span>
        )}
      </div>
  );
}
