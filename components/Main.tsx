"use client";

import { usePathname } from "next/navigation";

// Homepage hero sits under the transparent fixed header (no offset). Every other
// route gets a top offset equal to the header height, plus bottom room for the
// mobile action bar so nothing is hidden beneath fixed controls (§26).
export function Main({ children }: { children: React.ReactNode }) {
  const home = usePathname() === "/";
  return (
    <main id="main" className={`min-h-screen pb-24 md:pb-0 ${home ? "" : "pt-20"}`}>
      {children}
    </main>
  );
}
