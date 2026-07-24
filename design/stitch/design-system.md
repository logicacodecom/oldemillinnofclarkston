# Lakeside Heritage — Design System

Stitch asset: `assets/e0c1558c996a4977bd7c93f81990a631`  ·  version: 1

Fonts: headline **PLAYFAIR_DISPLAY**, body **INTER**, label **INTER**  ·  roundness ROUND_EIGHT  ·  mode LIGHT  ·  brand #1b365d

---

## Brand & Style

This design system is built to evoke the serene, scenic atmosphere of a premium independent lakefront inn. It moves away from the generic corporate hospitality aesthetic toward an "Elevated Heritage" style—blending the timeless trust of a historic establishment with the clean, airy functionality of modern minimalism.

The visual direction centers on **Modern Minimalism with a Scenic Soul**. It utilizes generous whitespace to mimic the openness of a lakefront, high-quality typography to signal professionalism, and a sophisticated color palette that feels organic rather than synthetic. The emotional response should be one of immediate relaxation, authenticity, and refined comfort.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, centered with a maximum width of 1280px to prevent lines of text from becoming too long for comfortable reading. 

- **Grid:** A 12-column system is used for desktop, transitioning to a 4-column system for mobile.
- **Rhythm:** A base 8px unit dictates all padding and margins. 
- **Whitespace:** Emphasize generous vertical spacing between sections (80px+) to create a "breathable" and calm user experience. 
- **Reflow:** On tablet and mobile, complex horizontal layouts (like room feature grids) should reflow into vertical stacks to maintain legibility.

## Elevation & Depth

To maintain a calm and organic feel, this design system avoids heavy shadows and floating effects. Depth is communicated through **Tonal Layers** and **Ambient Shadows**:

- **Surface Tiers:** The base layer is `soft warm white`. Elevated components like cards or booking modals use `surface-white` (#FFFFFF).
- **Shadow Character:** When used (primarily for room cards and dropdowns), shadows must be extremely diffused and low-opacity, using a slight tint of the `primary-blue` or `natural-sand` to ensure they feel like they belong to the environment rather than being generic gray.
- **Depth Hierarchy:** 
  - Level 0: Main background.
  - Level 1: Room cards, booking widgets (Subtle 15% blur shadow).
  - Level 2: Modals and Navigation Overlays (30% blur shadow with a slight backdrop blur).

## Components

### Buttons
- **Primary:** Solid `Deep Lake Blue` with white text. High contrast for "Book Now."
- **Secondary:** Outlined in `Natural Sand` or `Deep Lake Blue` with matching text. Used for "View Details" or "Learn More."
- **Ghost:** No background, just text with an icon, used for less critical navigation.

### Room Cards
Cards should feature high-resolution imagery with a `surface-white` container. Pricing should be clearly displayed using `Playfair Display` to feel premium. Include "Softly Rounded" (16px) corners and a subtle ambient shadow.

### Booking Forms
The booking bar should be a persistent or highly accessible element. It uses a horizontal layout on desktop with clearly partitioned segments (Check-in, Check-out, Guests) using `Natural Sand` vertical dividers.

### Input Fields
Inputs use a `surface-white` background with a 1px border of `Natural Sand`. Upon focus, the border transitions to `Deep Lake Blue`. Labels should be persistent and use the `label-md` typography style.

### Navigation
The navigation bar is clean and spacious. The logo is centered or left-aligned, with links using `label-lg` for clear, readable pathways. A "Book Now" CTA should be permanently visible in the top right corner as a primary button.
