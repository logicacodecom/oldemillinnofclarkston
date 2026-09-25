// Run: node lib/i18n.check.mjs — self-check for the path helpers (mirrors lib/i18n.ts).
import assert from "node:assert/strict";
const localePath = (lang, path) => (lang === "en" ? path : path === "/" ? "/es" : `/es${path}`);
const basePath = (p) => p.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
const switchPath = (p, to) => localePath(to, basePath(p));
assert.equal(switchPath("/room", "es"), "/es/room");
assert.equal(switchPath("/en/room", "es"), "/es/room"); // prerender sees the internal path
assert.equal(switchPath("/en", "es"), "/es");
assert.equal(switchPath("/", "es"), "/es");
assert.equal(switchPath("/es/room", "en"), "/room");
assert.equal(switchPath("/es", "en"), "/");
assert.equal(switchPath("/estate", "es"), "/es/estate"); // "/es" prefix must be a whole segment
console.log("i18n path helpers ok");
