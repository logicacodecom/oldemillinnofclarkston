import { property } from "./property";

// Centralized FAQ content (§24). Wording follows verified/published policy.
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What time is check-in and check-out?",
    a: `Check-in begins at ${property.checkIn}, and check-out is by ${property.checkOut}. Guests planning a late arrival should contact the inn directly.`,
  },
  {
    q: "Are pets permitted?",
    a: "Pets are not permitted at the property.",
  },
  {
    q: "Are kayaks and pedal boats included?",
    a: "Registered guests may use the property's kayaks and pedal boats at no additional charge, subject to season, weather, safety conditions and availability.",
  },
  {
    q: "How far is the inn from Pine Knob?",
    a: "The inn is approximately five miles from Pine Knob Music Theatre and Pine Knob Ski and Snowboard Resort.",
  },
  {
    q: "Do rooms have microwaves and refrigerators?",
    a: "Rooms include a microwave and small refrigerator.",
  },
  {
    q: "Are kitchenettes available?",
    a: "Selected rooms offer kitchenettes. Guests should contact the inn or check room information for current details.",
  },
  {
    q: "Are coffee pots and cookware available?",
    a: "Coffee pots, flatware and cookware are available upon request.",
  },
  {
    q: "Is Wi-Fi available?",
    a: "Internet or Wi-Fi is available.",
  },
  {
    q: "Is parking available?",
    a: "Parking is available at the property.",
  },
  {
    q: "Can guests arrive late?",
    a: "Guests planning a late arrival should contact the inn directly for instructions.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellation terms may vary by reservation and selected rate. Guests should review the terms presented during booking or contact the inn directly.",
  },
  {
    q: "How can guests reserve a room?",
    a: `Guests can check availability through the secure Cloudbeds booking system or call the inn at ${property.phone.display}.`,
  },
];
