export default function SiteWatermark() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-right concentric rings */}
      <span
        className="absolute rounded-full border border-plum/10"
        style={{ width: 640, height: 640, top: -320, right: -220 }}
      />
      <span
        className="absolute rounded-full border border-plum/[0.07]"
        style={{ width: 880, height: 880, top: -440, right: -340 }}
      />
      {/* Bottom-left concentric rings */}
      <span
        className="absolute rounded-full border border-coral/15"
        style={{ width: 720, height: 720, bottom: -420, left: -260 }}
      />
      <span
        className="absolute rounded-full border border-coral/10"
        style={{ width: 980, height: 980, bottom: -560, left: -400 }}
      />
      {/* Faint mid-page ring */}
      <span
        className="absolute rounded-full border border-mist/20"
        style={{ width: 460, height: 460, top: "42%", left: "-230px" }}
      />
    </div>
  );
}
