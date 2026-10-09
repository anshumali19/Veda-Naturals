export default function MedicalPlus({
  size = 32,
  dark = false,
  className = "",
}: {
  size?: number;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`medical-plus${dark ? " on-dark" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      +
    </span>
  );
}
