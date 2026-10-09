type OrbColor = "plum" | "coral" | "blue";
type OrbSize = "lg" | "md" | "sm";

export default function BackgroundOrb({
  color = "plum",
  size = "lg",
  float = false,
  className = "",
}: {
  color?: OrbColor;
  size?: OrbSize;
  float?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`background-orb orb-${color} orb-${size}${float ? " floating-decoration" : ""} ${className}`}
    />
  );
}
