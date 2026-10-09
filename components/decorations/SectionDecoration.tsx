import BackgroundOrb from "./BackgroundOrb";
import PulseLine from "./PulseLine";
import MedicalPlus from "./MedicalPlus";

export default function SectionDecoration({
  variant = "default",
}: {
  variant?: "hero" | "default" | "minimal";
}) {
  return (
    <div className={`section-decoration section-decoration-${variant}`} aria-hidden="true">
      <div className="decoration-orb decoration-orb-a" />
      <div className="decoration-orb decoration-orb-b" />
      {variant !== "minimal" && <PulseLine />}
      {variant === "hero" && (
        <>
          <MedicalPlus size={36} className="plus-a" />
          <MedicalPlus size={28} className="plus-b" />
        </>
      )}
    </div>
  );
}

export { BackgroundOrb, PulseLine, MedicalPlus };
