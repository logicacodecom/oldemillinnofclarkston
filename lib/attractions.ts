// Nearby attractions (§15, §22). Distances are approximate and clearly labeled.
// No shuttle/partnership/discount/ticket claims are made.

export type Attraction = {
  name: string;
  category: "concerts" | "skiing" | "shopping" | "dining" | "local";
  description: string;
  approxMiles?: number;
  address?: string;
  note?: string;
};

export const attractions: Attraction[] = [
  {
    name: "Pine Knob Music Theatre",
    category: "concerts",
    approxMiles: 5,
    address: "33 Bob Seger Drive, Clarkston, MI 48348",
    description:
      "Michigan's landmark outdoor amphitheater. Make the inn your relaxed lakefront home base for concert nights.",
  },
  {
    name: "Pine Knob Ski and Snowboard Resort",
    category: "skiing",
    approxMiles: 5,
    description: "Downhill skiing, snowboarding and tubing just minutes from the inn.",
  },
  {
    name: "Alpine Valley Ski Resort",
    category: "skiing",
    approxMiles: 8,
    description: "A second nearby ski area with runs for a range of abilities.",
  },
  {
    name: "Mt. Holly Ski and Snowboard Resort",
    category: "skiing",
    approxMiles: 12,
    description: "Family-friendly slopes a short drive north.",
  },
  {
    name: "Great Lakes Crossing Outlets",
    category: "shopping",
    address: "4000 Baldwin Road, Auburn Hills, MI 48326",
    description: "Michigan's largest indoor outlet mall, with shopping, dining and entertainment.",
  },
  {
    name: "Downtown Clarkston",
    category: "local",
    description: "A walkable historic downtown with local dining, shops and community events.",
  },
  {
    name: "LA Cafe & Java",
    category: "dining",
    description: "A neighboring cafe, described on the current site as next door.",
    note: "Nearby business — hours and details are set independently by that business.",
  },
  {
    name: "Sportsmen's Great Northern Grill",
    category: "dining",
    description: "A grill and tavern described on the current site as across the street.",
    note: "Nearby business — hours and details are set independently by that business.",
  },
];

export const attractionsByCategory = {
  concerts: attractions.filter((a) => a.category === "concerts"),
  skiing: attractions.filter((a) => a.category === "skiing"),
  shopping: attractions.filter((a) => a.category === "shopping"),
  dining: attractions.filter((a) => a.category === "dining"),
  local: attractions.filter((a) => a.category === "local"),
};
