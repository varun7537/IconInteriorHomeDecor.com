// process-icons.tsx
import type { SVGProps } from "react";
import type { ProcessIcon } from "./lib/process-data";

type IconProps = SVGProps<SVGSVGElement>;

function ChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" {...props}>
      <path d="M4 5.5h16v10.5H9.5L5.5 19v-3H4V5.5Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

function MeasureIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" {...props}>
      <rect x="4" y="9" width="16" height="7" rx="1.5" />
      <path d="M8 9v2.2M11 9v3M14 9v2.2M17 9v3" />
    </svg>
  );
}

function PaletteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" {...props}>
      <path d="M12 4a8 8 0 1 0 3.5 15.2c1-.45 1.2-1.75.4-2.5a1.3 1.3 0 0 1 .9-2.2h1.7A2.5 2.5 0 0 0 21 12 8 8 0 0 0 12 4Z" />
      <circle cx="8.3" cy="10.3" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.3" cy="14.3" r="1" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ThreadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" {...props}>
      <path d="M8 5.5h8v3a4 4 0 0 1-8 0v-3ZM8 18.5h8v-3a4 4 0 0 0-8 0v3Z" />
      <path d="M9 8.2c1 .6 1.9.6 3 0M9 15.8c1-.6 1.9-.6 3 0" />
    </svg>
  );
}

function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" {...props}>
      <path d="M12 3.5c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" />
      <path d="M18.5 15c.25 1.4.95 2.1 2.35 2.35-1.4.25-2.1.95-2.35 2.35-.25-1.4-.95-2.1-2.35-2.35 1.4-.25 2.1-.95 2.35-2.35Z" />
    </svg>
  );
}

const icons: Record<ProcessIcon, (props: IconProps) => React.JSX.Element> = {
  chat: ChatIcon,
  measure: MeasureIcon,
  palette: PaletteIcon,
  thread: ThreadIcon,
  sparkle: SparkleIcon,
};

export function ProcessStepIcon({
  icon,
  ...props
}: { icon: ProcessIcon } & IconProps) {
  const Icon = icons[icon];
  return <Icon {...props} />;
}