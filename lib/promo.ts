// Site-wide events banner. It sits inside the fixed header, so the header, the
// mobile menu and the page offset all grow by --promo-h (globals.css) while it
// shows. A visitor who closes it gets data-promo-off on <html> (set before paint
// by the inline script in the layout), which collapses --promo-h to 0.
export const PROMO_STORAGE_KEY = "promo-dismissed";
// Bump to show the banner again to visitors who closed an earlier one.
export const PROMO_VERSION = "celebrate-1";

// The banner points to these pages, so it isn't shown on them.
const HIDDEN_ON = ["/celebrate", "/book-a-tour"];

export function promoShownOn(path: string): boolean {
  return !HIDDEN_ON.includes(path);
}

export const promoInitScript = `try{if(localStorage.getItem(${JSON.stringify(PROMO_STORAGE_KEY)})===${JSON.stringify(PROMO_VERSION)})document.documentElement.setAttribute("data-promo-off","")}catch(e){}`;
