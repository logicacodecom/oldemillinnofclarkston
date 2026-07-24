import Link from "next/link";
import { Icon } from "./Icon";

type Variant = "primary" | "outline" | "glass" | "ghost";
type Size = "md" | "lg" | "block";

const base =
  "inline-flex items-center justify-center gap-2 font-label-lg text-label-lg rounded-full transition-all disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5",
  lg: "px-10 py-4",
  block: "w-full px-6 py-3 rounded-lg",
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-container active:scale-95",
  outline: "border border-primary text-primary hover:bg-primary hover:text-on-primary",
  glass:
    "bg-surface-white/20 backdrop-blur-md border border-surface-white/30 text-surface-white hover:bg-surface-white/30",
  ghost: "text-primary hover:text-primary-container underline-offset-4 hover:underline",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  icon?: string;
  analyticsEvent?: string;
  className?: string;
  ariaLabel?: string;
};

// A link styled as a Neo button. Internal hrefs use next/link; external hrefs
// (Cloudbeds, tel:, sms:, maps) render a plain anchor. Analytics events are
// declarative via data-analytics-event (see AnalyticsListener).
export function CTA({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  icon,
  analyticsEvent,
  className = "",
  ariaLabel,
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();
  const inner = (
    <>
      {children}
      {icon ? <Icon name={icon} className="text-lg" /> : null}
    </>
  );
  const isExternalProtocol = /^(https?:|tel:|sms:|mailto:)/.test(href);
  if (external || isExternalProtocol) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        data-analytics-event={analyticsEvent}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel} data-analytics-event={analyticsEvent}>
      {inner}
    </Link>
  );
}
