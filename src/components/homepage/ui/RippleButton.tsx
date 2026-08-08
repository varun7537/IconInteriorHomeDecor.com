"use client";

import {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useState,
} from "react";

interface RippleSpan {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  rippleClassName?: string;
}

const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  function RippleButton(
    {
      children,
      className = "",
      rippleClassName = "bg-white/40",
      onClick,
      type = "button",
      ...props
    },
    ref
  ) {
    const [ripples, setRipples] = useState<RippleSpan[]>([]);

    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.4;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const id = performance.now();

        setRipples((prev) => [...prev, { id, x, y, size }]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 650);

        onClick?.(e);
      },
      [onClick]
    );

    return (
      <button
        {...props}
        type={type}
        ref={ref}
        onClick={handleClick}
        className={`relative isolate overflow-hidden transition-transform duration-200 ease-out will-change-transform hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${className}`}
      >
        {children}
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden="true"
            className={`pointer-events-none absolute rounded-full animate-ripple ${rippleClassName}`}
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
      </button>
    );
  }
);

export default RippleButton;