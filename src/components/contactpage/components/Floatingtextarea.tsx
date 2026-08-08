"use client";

import { useId, useState } from "react";

interface FloatingTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
}

export function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 5,
}: FloatingTextareaProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const floated = focused || value.length > 0;

  return (
    <div className="relative">

      <textarea
        id={id}
        name={name}
        value={value}
        rows={rows}
        required={required}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e)=>onChange(e.target.value)}
        className="
          peer
          w-full
          resize-none
          rounded-xl
          border
          border-white/15
          bg-white/[0.03]
          px-4
          pb-3
          pt-7
          text-[15px]
          text-white
          outline-none
          transition-all
          duration-300

          focus:border-[#FFDE59]
          focus:bg-white/[0.05]
          focus:shadow-[0_0_20px_rgba(255,222,89,.15)]
        "
      />

      <label
        htmlFor={id}
        className={`
          pointer-events-none
          absolute
          left-4
          transition-all
          duration-200
          uppercase

          ${
            floated
            ? "top-2 text-[10px] tracking-[0.18em] text-[#FFDE59]"
            : "top-6 text-sm text-white/40"
          }
        `}
      >
        {label}
        {required && (
          <span className="ml-1 text-[#FFDE59]">*</span>
        )}
      </label>

    </div>
  );
}