import React, {useEffect, useRef, useState} from "react";

export default function SelectItem({
                                     list,
                                     value,
                                     disabled,
                                     name,
                                     selected,
                                   }: {
  list: { value: number; label: string }[];
  value: number;
  name: string;
  disabled?: boolean;
  selected: (name: string, value: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const index = list.findIndex((el) => el.value === value);
    if (index !== -1) setActiveIndex(index);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && activeIndex !== null && listRef.current) {
      const option = listRef.current.children[activeIndex] as HTMLElement;
      option?.scrollIntoView({block: "nearest"});
    }
  }, [open, activeIndex]);

  const onToggle = () => {
    if (!disabled) setOpen((o) => !o);
  };

  const onSelect = (i: number) => {
    selected(name, list[i].value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i === null ? 0 : Math.min(i + 1, list.length - 1)));
        console.log(activeIndex);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i === null ? 0 : Math.max(i - 1, 0)));
        break;

      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;

      case "End":
        e.preventDefault();
        setActiveIndex(list.length - 1);
        break;

      case "Enter":
        e.preventDefault();
        if (activeIndex !== null) onSelect(activeIndex);
        break;

      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
      <div
          className={`select-item ${open ? "open" : ""} ${disabled ? "disabled" : ""}`}
          ref={ref}
          tabIndex={0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-activedescendant={
            activeIndex !== null ? `option-${list[activeIndex].value}` : undefined
          }
          onKeyDown={onKeyDown}
      >
        <div className="select-item-input" onClick={onToggle}>
          {list.find((i) => i.value === value)?.label}
        </div>

        <ul
            className="select-item-list"
            role="listbox"
            ref={listRef}
            style={{"--i": list.length} as React.CSSProperties}
        >
          {list.map((item, i) => (
              <li
                  key={item.value}
                  id={`option-${item.value}`}
                  role="option"
                  aria-selected={value === item.value}
                  className={`select-list-item 
              ${value === item.value ? "selected" : ""}
              ${activeIndex === i ? "active" : ""}
            `}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => onSelect(i)}
              >
                <span>{item.label}</span>
              </li>
          ))}
        </ul>
      </div>
  );
}
