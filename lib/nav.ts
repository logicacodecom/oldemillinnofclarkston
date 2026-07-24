export type NavLink = { label: string; href: string };

// Primary navigation (§16, §27).
export const mainNav: NavLink[] = [
  { label: "Rooms", href: "/rooms" },
  { label: "Lakefront Experience", href: "/lakefront-experience" },
  { label: "Pine Knob", href: "/pine-knob" },
  { label: "Things to Do", href: "/things-to-do" },
  { label: "Gallery", href: "/gallery" },
  { label: "Plan Your Stay", href: "/plan-your-stay" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
];
