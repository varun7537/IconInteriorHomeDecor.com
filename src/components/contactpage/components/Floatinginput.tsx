"use client";

import { useId, useState } from "react";

interface FloatingInputProps {
  label: string;
  type?: "text" | "email" | "tel";
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}

export function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  autoComplete,
  error,
}: FloatingInputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const floated = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`
          peer
          w-full
          rounded-xl
          border
          bg-white/[0.03]
          px-4
          pb-3
          pt-6
          text-[15px]
          text-white
          outline-none
          transition-all
          duration-300

          ${
            error
              ? "border-red-400/70 focus:border-red-400"
              : "border-white/15 focus:border-[#FFDE59]"
          }

          focus:bg-white/[0.05]
          focus:shadow-[0_0_20px_rgba(255,222,89,0.15)]
        `}
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
              : "top-5 text-sm text-white/40"
          }
        `}
      >
        {label}
        {required && (
          <span className="ml-1 text-[#FFDE59]">*</span>
        )}
      </label>


      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-xs text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}