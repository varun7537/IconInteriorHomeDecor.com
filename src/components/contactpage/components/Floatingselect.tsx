"use client";

import { useId, useState } from "react";

interface FloatingSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}

export function FloatingSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: FloatingSelectProps) {
  const id = useId();

  const [focused, setFocused] = useState(false);

  const floated = focused || value.length > 0;

  return (
    <div className="relative w-full">

      <select
        id={id}
        name={name}
        value={value}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="
          peer
          w-full
          appearance-none
          cursor-pointer
          rounded-xl
          border
          border-white/15
          bg-[#151515]
          px-4
          pb-3
          pt-6
          text-[15px]
          text-white
          outline-none
          transition-all
          duration-300

          hover:border-white/30

          focus:border-[#FFDE59]
          focus:bg-[#1b1b1b]
          focus:shadow-[0_0_25px_rgba(255,222,89,0.15)]
        "
      >

        <option value="" className="bg-[#1F1F1F] text-white/50">

        </option>

        {options.map((item) => (
          <option
            key={item}
            value={item}
            className="bg-[#151515] text-white"
          >
            {item}
          </option>
        ))}

      </select>

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
          <span className="ml-1 text-[#FFDE59]">
            *
          </span>
        )}
      </label>

      <svg
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          right-4
          top-7
          h-4
          w-4
          text-white/50
          transition-all
          duration-300

          ${
            focused
              ? "rotate-180 text-[#FFDE59]"
              : "rotate-0"
          }
        `}
        viewBox="0 0 12 8"
        fill="none"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span
        className={`
          absolute
          bottom-0
          left-4
          right-4
          h-[2px]
          rounded-full
          bg-[#FFDE59]
          transition-all
          duration-300

          ${
            focused
              ? "opacity-100 scale-x-100"
              : "opacity-0 scale-x-0"
          }
        `}
      />

    </div>
  );
}