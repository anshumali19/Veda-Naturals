export default function PulseLine({ className = "" }: { className?: string }) {
  return (
    <svg className={`pulse-line ${className}`} viewBox="0 0 500 100" fill="none" aria-hidden="true">
      <path
        d="M0 50 C70 50 80 50 120 50 L150 50 L165 20 L180 80 L195 40 L210 50 C270 50 310 50 500 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
