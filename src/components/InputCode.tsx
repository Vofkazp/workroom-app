import React, {useEffect, useRef} from "react";

export default function InputCode({sendCode} : {sendCode: (code: string) => void}) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const input = e.currentTarget;
    const value = input.value;
    if (value.length > 1) {
      input.value = value.slice(0, 1);
    }
    if (input.value.length === 1) {
      const next = inputsRef.current[index + 1];

      if (next) {
        next.focus();
      } else {
        input.blur();
        const code = inputsRef.current
            .map((inp) => inp?.value || "")
            .join("");
        sendCode(code);
      }
    }
  };

  return (
      <div className="input-container">
        <label className="input-label" htmlFor="code">Code from SMS</label>
        <div className="inputs-row-elements numbers">
          {[0, 1, 2, 3].map((i) => (
              <input
                  key={i}
                  type="number"
                  placeholder={String(i + 1)}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  onInput={(e) => handleInput(e, i)}
              />
          ))}
        </div>
        <span className="error">Incorrect data</span>
      </div>
  );
}