interface CornerBracketProps {
  position: "tl" | "tr" | "bl" | "br";
  className?: string;
}

const rotations: Record<CornerBracketProps["position"], string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0 rotate-90",
  bl: "bottom-0 left-0 -rotate-90",
  br: "bottom-0 right-0 rotate-180",
};


export function CornerBracket({ position, className = "" }: CornerBracketProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      fill="none"
      className={`absolute h-6 w-6 ${rotations[position]} ${className}`}
    >
      <path d="M1 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 1H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}