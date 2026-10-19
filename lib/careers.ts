// Careers page data. Position titles and descriptions live in the dictionaries
// (careers.positions); add or remove an id here to change what's listed.
export const positions = ["housekeeping", "frontDesk", "maintenance"] as const;
export type Position = (typeof positions)[number];

// Decorative icon per position (Material Symbols).
export const positionIcons: Record<Position, string> = {
  housekeeping: "cleaning_services",
  frontDesk: "concierge",
  maintenance: "handyman",
};

// Applications from both North and South go to this inbox.
export const careersEmail = "ClarkstonHotel@gmail.com";

// Résumé limits. Vercel caps a request body at 4.5 MB, so stay under it.
export const resumeMaxBytes = 4 * 1024 * 1024;
export const resumeExtensions = [".pdf", ".doc", ".docx"] as const;

export function isResumeFile(filename: string): boolean {
  const lower = filename.toLowerCase();
  return resumeExtensions.some((ext) => lower.endsWith(ext));
}
