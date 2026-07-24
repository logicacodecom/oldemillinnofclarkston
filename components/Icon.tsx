// Decorative Material Symbols icon. Always paired with a visible text label,
// so it is hidden from assistive tech (§31 — no meaning conveyed by icon alone).
export function Icon({
  name,
  className = "",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined${filled ? " fill" : ""} ${className}`.trim()}>
      {name}
    </span>
  );
}
