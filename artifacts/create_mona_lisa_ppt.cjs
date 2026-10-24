const pptxgen = require("/tmp/pptxgen/node_modules/pptxgenjs");
const fs = require("fs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "History Project";
pptx.subject = "Mona Lisa — The Painting That Became a Mystery";
pptx.title = "Mona Lisa — The Painting That Became a Mystery";
pptx.company = "School History Project";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Georgia",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineSlideMaster({
  title: "MASTER",
  background: { color: "F5F0E4" },
  objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.11, fill: { color: "B48A42" }, line: { color: "B48A42" } } },
    { text: { text: "MONA LISA  •  HISTORY PROJECT", options: { x: 0.65, y: 7.13, w: 5.5, h: 0.18, fontFace: "Aptos", fontSize: 8, color: "6E6A60", charSpacing: 1.4, margin: 0 } } },
    { text: { text: "© Public-domain artwork imagery • Wikimedia Commons", options: { x: 8.05, y: 7.13, w: 4.6, h: 0.18, fontFace: "Aptos", fontSize: 7.5, color: "8B867A", align: "right", margin: 0 } } },
  ],
  slideNumber: { x: 12.72, y: 7.1, w: 0.22, h: 0.2, color: "6E6A60", fontFace: "Aptos", fontSize: 8, align: "right" },
});

const C = { ink: "1C2922", green: "263B31", sage: "819276", gold: "B48A42", cream: "F5F0E4", paper: "FFFDF8", rust: "8D493A", muted: "6E6A60", pale: "E8E1D2" };
const ML = "artifacts/ppt-assets/mona-lisa.jpg";
const LEO = "artifacts/ppt-assets/leonardo.jpg";
const S = pptx.ShapeType;

function addTitle(slide, kicker, title, sub) {
  slide.addText(kicker.toUpperCase(), { x: 0.72, y: 0.43, w: 5.6, h: 0.22, fontFace: "Aptos", fontSize: 9, bold: true, color: C.gold, charSpacing: 2.2, margin: 0 });
  slide.addText(title, { x: 0.7, y: 0.72, w: 11.9, h: 0.63, fontFace: "Georgia", fontSize: 25, bold: false, color: C.ink, margin: 0, breakLine: false });
  if (sub) slide.addText(sub, { x: 0.72, y: 1.42, w: 11.7, h: 0.38, fontFace: "Aptos", fontSize: 12.5, color: C.muted, margin: 0 });
}
function pill(slide, text, x, y, w, color = C.green) {
  slide.addText(text, { x, y, w, h: 0.36, fontFace: "Aptos", fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "mid", margin: 0.03, fill: { color }, line: { color }, radius: 0.1 });
}
function card(slide, x, y, w, h, number, title, body, accent = C.gold) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.paper }, line: { color: "D9D0BF", width: 1 } });
  slide.addText(number, { x: x + 0.18, y: y + 0.16, w: 0.42, h: 0.32, fontFace: "Georgia", fontSize: 14, bold: true, color: accent, margin: 0 });
  slide.addText(title, { x: x + 0.7, y: y + 0.15, w: w - 0.88, h: 0.32, fontFace: "Aptos", fontSize: 13, bold: true, color: C.ink, margin: 0 });
  slide.addText(body, { x: x + 0.18, y: y + 0.62, w: w - 0.36, h: h - 0.78, fontFace: "Aptos", fontSize: 11, color: C.muted, breakLine: false, margin: 0.02, valign: "top" });
}
function quote(slide, text, x, y, w, h) {
  slide.addShape(S.rect, { x, y, w: 0.06, h, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText(text, { x: x + 0.25, y: y + 0.03, w: w - 0.3, h: h - 0.04, fontFace: "Georgia", italic: true, fontSize: 18, color: C.green, margin: 0.02, valign: "mid" });
}

// 1 — Cover
{
  const s = pptx.addSlide();
  s.background = { color: C.green };
  s.addShape(S.rect, { x: 0, y: 0, w: 7.6, h: 7.5, fill: { color: C.green, transparency: 2 }, line: { color: C.green } });
  s.addImage({ path: ML, x: 8.42, y: 0, w: 4.91, h: 7.5 });
  s.addShape(S.rect, { x: 7.2, y: 0, w: 2.0, h: 7.5, fill: { color: C.green, transparency: 18 }, line: { color: C.green, transparency: 100 } });
  s.addText("HISTORY PROJECT", { x: 0.75, y: 0.78, w: 4.2, h: 0.3, fontFace: "Aptos", fontSize: 11, bold: true, color: "D4B36D", charSpacing: 3, margin: 0 });
  s.addText("MONA LISA", { x: 0.72, y: 1.55, w: 7.25, h: 0.85, fontFace: "Georgia", fontSize: 39, color: "FFFFFF", margin: 0 });
  s.addText("THE PAINTING THAT\nBECAME A MYSTERY", { x: 0.76, y: 2.5, w: 6.7, h: 1.24, fontFace: "Aptos", fontSize: 25, bold: true, color: "E8DFC9", breakLine: false, margin: 0, breakLineOnOverflow: false });
  s.addShape(S.line, { x: 0.76, y: 4.12, w: 1.35, h: 0, line: { color: C.gold, width: 3 } });
  s.addText("Leonardo da Vinci • c. 1503–1519 • Louvre Museum", { x: 0.76, y: 4.38, w: 6.6, h: 0.38, fontFace: "Aptos", fontSize: 13, color: "D8D3C7", margin: 0 });
  s.addText("A portrait, a theft, and a smile that still keeps us guessing.", { x: 0.76, y: 5.08, w: 6.25, h: 0.65, fontFace: "Georgia", fontSize: 18, italic: true, color: "FFFFFF", margin: 0 });
}

// 2 — Contents
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "01 • Roadmap", "What makes one portrait unforgettable?", "Eleven questions guide our investigation.");
  const items = ["Introduction", "Leonardo da Vinci", "The real Mona Lisa", "Why paint her?", "How long did it take?", "The 1911 theft", "The mysterious smile", "Why is it famous?", "Interesting facts", "Reflection", "Conclusion"];
  items.forEach((t, i) => {
    const col = i < 6 ? 0 : 1, row = col === 0 ? i : i - 6;
    const x = col === 0 ? 0.85 : 6.9, y = 2.08 + row * 0.74;
    s.addText(String(i + 1).padStart(2, "0"), { x, y, w: 0.5, h: 0.3, fontFace: "Georgia", fontSize: 13, bold: true, color: C.gold, margin: 0 });
    s.addText(t, { x: x + 0.64, y: y - 0.01, w: 4.9, h: 0.35, fontFace: "Aptos", fontSize: 14, color: C.ink, margin: 0 });
    s.addShape(S.line, { x, y: y + 0.43, w: 5.15, h: 0, line: { color: "DED6C8", width: 0.8 } });
  });
}

// 3 — Introduction
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "02 • Introduction", "A quiet portrait with a global audience", "Small in size, immense in cultural influence.");
  s.addImage({ path: ML, x: 0.76, y: 2.02, w: 3.15, h: 4.7 });
  quote(s, "A seated woman. Folded hands. A distant landscape. One almost-smile.", 4.45, 2.18, 7.65, 1.08);
  card(s, 4.48, 3.72, 2.25, 1.78, "01", "Artist", "Leonardo da Vinci\nItalian Renaissance", C.gold);
  card(s, 6.95, 3.72, 2.25, 1.78, "02", "Medium", "Oil paint on a\npoplar wood panel", C.sage);
  card(s, 9.42, 3.72, 2.25, 1.78, "03", "Home", "Louvre Museum\nParis, France", C.rust);
  pill(s, "Painted c. 1503–1519", 5.35, 6.12, 2.5);
  pill(s, "Renaissance masterpiece", 8.15, 6.12, 2.65, C.rust);
}

// 4 — Leonardo
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "03 • The Artist", "Leonardo da Vinci: artist and investigator", "His study of nature, anatomy, light, and shadow made his paintings feel alive.");
  s.addImage({ path: LEO, x: 0.8, y: 1.95, w: 3.2, h: 4.85 });
  s.addShape(S.roundRect, { x: 4.5, y: 2.02, w: 7.7, h: 1.1, fill: { color: C.green }, line: { color: C.green } });
  s.addText("1452", { x: 4.8, y: 2.27, w: 1.2, h: 0.45, fontFace: "Georgia", fontSize: 24, color: "FFFFFF", margin: 0 });
  s.addText("Born near Vinci, Italy", { x: 6.05, y: 2.31, w: 3.6, h: 0.35, fontFace: "Aptos", fontSize: 15, color: "FFFFFF", margin: 0 });
  const roles = [["PAINTER", "Mona Lisa • The Last Supper"], ["SCIENTIST", "Anatomy • optics • nature"], ["INVENTOR", "Machines • flight • engineering"]];
  roles.forEach((r, i) => card(s, 4.5 + i * 2.58, 3.52, 2.25, 1.78, `0${i + 1}`, r[0], r[1], [C.gold, C.sage, C.rust][i]));
  s.addText("1519", { x: 4.58, y: 6.0, w: 0.95, h: 0.35, fontFace: "Georgia", fontSize: 17, bold: true, color: C.gold, margin: 0 });
  s.addText("Died in France, leaving notebooks and artworks that still inspire discovery.", { x: 5.65, y: 6.02, w: 6.35, h: 0.45, fontFace: "Aptos", fontSize: 12, color: C.muted, margin: 0 });
}

// 5 — Lisa
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "04 • The Sitter", "Who was the real Mona Lisa?", "Most historians identify her as Lisa Gherardini of Florence.");
  s.addShape(S.ellipse, { x: 0.9, y: 2.05, w: 3.55, h: 3.55, fill: { color: C.pale }, line: { color: C.gold, width: 2 } });
  s.addImage({ path: ML, x: 1.3, y: 2.08, w: 2.73, h: 4.07, transparency: 0 });
  const facts = [
    ["1479", "Born in Florence, Italy"],
    ["Lisa Gherardini", "The widely accepted identity"],
    ["Francesco del Giocondo", "Her husband, a wealthy silk merchant"],
    ["La Gioconda / La Joconde", "The painting’s Italian / French names"],
  ];
  facts.forEach((f, i) => {
    const y = 2.05 + i * 1.06;
    s.addShape(S.ellipse, { x: 5.1, y: y + 0.06, w: 0.26, h: 0.26, fill: { color: i === 0 ? C.rust : C.gold }, line: { color: i === 0 ? C.rust : C.gold } });
    s.addText(f[0], { x: 5.55, y, w: 2.6, h: 0.36, fontFace: "Georgia", fontSize: 15, bold: true, color: C.ink, margin: 0 });
    s.addText(f[1], { x: 8.25, y: y + 0.02, w: 3.85, h: 0.4, fontFace: "Aptos", fontSize: 12, color: C.muted, margin: 0 });
    if (i < 3) s.addShape(S.line, { x: 5.1, y: y + 0.65, w: 7, h: 0, line: { color: "DCD4C5", width: 0.8 } });
  });
  quote(s, "Her identity is likely known; her inner thoughts remain a mystery.", 5.1, 6.17, 6.85, 0.56);
}

// 6 — Why painted
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "05 • The Commission", "Why did Leonardo paint her?", "A private family portrait became a universal image.");
  const steps = [
    ["COMMISSION", "Francesco del Giocondo likely requested a portrait of his wife."],
    ["PURPOSE", "Portraits preserved family memory and reflected social standing."],
    ["AMBITION", "Leonardo aimed to capture natural expression—not just appearance."],
    ["METHOD", "Light, shadow, colour, and observation created a lifelike presence."],
  ];
  steps.forEach((v, i) => {
    const x = 0.82 + i * 3.08;
    s.addText(String(i + 1), { x: x + 0.87, y: 2.18, w: 0.7, h: 0.7, fontFace: "Georgia", fontSize: 25, bold: true, color: "FFFFFF", align: "center", valign: "mid", margin: 0, fill: { color: [C.gold, C.sage, C.rust, C.green][i] }, line: { color: [C.gold, C.sage, C.rust, C.green][i] }, shape: S.ellipse });
    if (i < 3) s.addShape(S.chevron, { x: x + 2.48, y: 2.37, w: 0.42, h: 0.31, fill: { color: "CDC4B4" }, line: { color: "CDC4B4" } });
    s.addText(v[0], { x, y: 3.25, w: 2.45, h: 0.3, fontFace: "Aptos", fontSize: 11, bold: true, color: C.gold, align: "center", charSpacing: 1.3, margin: 0 });
    s.addText(v[1], { x, y: 3.8, w: 2.45, h: 1.35, fontFace: "Aptos", fontSize: 12.5, color: C.ink, align: "center", valign: "top", margin: 0.03 });
  });
  quote(s, "The exact reason—and every artistic choice—cannot be proved with certainty.", 2.15, 5.82, 9.05, 0.72);
}

// 7 — Time and sfumato
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "06 • Time & Technique", "A masterpiece refined across years", "Leonardo worked intermittently, revisiting details rather than painting continuously.");
  s.addShape(S.line, { x: 1.02, y: 3.0, w: 10.95, h: 0, line: { color: C.gold, width: 3 } });
  [["1503", "Work begins"], ["c. 1506", "Major portrait forms"], ["1517", "Still in Leonardo’s care"], ["1519", "Possible final refinements"]].forEach((v, i) => {
    const x = 1.02 + i * 3.65;
    s.addShape(S.ellipse, { x: x - 0.12, y: 2.83, w: 0.34, h: 0.34, fill: { color: i === 3 ? C.rust : C.green }, line: { color: C.cream, width: 2 } });
    s.addText(v[0], { x: x - 0.15, y: 2.25, w: 1.3, h: 0.35, fontFace: "Georgia", fontSize: 16, bold: true, color: C.ink, margin: 0 });
    s.addText(v[1], { x: x - 0.15, y: 3.35, w: 2.35, h: 0.55, fontFace: "Aptos", fontSize: 11.5, color: C.muted, margin: 0 });
  });
  s.addShape(S.roundRect, { x: 1.05, y: 4.72, w: 11.15, h: 1.34, fill: { color: C.green }, line: { color: C.green } });
  s.addText("SFUMATO", { x: 1.4, y: 5.04, w: 2.0, h: 0.45, fontFace: "Georgia", fontSize: 21, color: "FFFFFF", margin: 0 });
  s.addText("Soft, smoky transitions between colours and shadows—without harsh outlines—make the face feel alive.", { x: 3.55, y: 4.99, w: 8.05, h: 0.55, fontFace: "Aptos", fontSize: 14, color: "E9E4D9", margin: 0 });
}

// 8 — Theft
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "07 • The Theft", "The day the Mona Lisa disappeared", "A two-year mystery transformed an admired painting into worldwide news.");
  const events = [
    ["21 AUG 1911", "STOLEN", "Former Louvre worker Vincenzo Peruggia removes the painting."],
    ["1911–1913", "HIDDEN", "He keeps it concealed for more than two years."],
    ["DEC 1913", "OFFERED", "He approaches an art dealer in Florence."],
    ["1913", "RECOVERED", "Authorities recover the work; Peruggia is arrested."],
  ];
  events.forEach((e, i) => {
    const x = 0.82 + i * 3.08;
    s.addShape(S.roundRect, { x, y: 2.18, w: 2.55, h: 3.15, fill: { color: i === 0 ? C.rust : C.paper }, line: { color: i === 0 ? C.rust : "D7CEBE", width: 1 } });
    s.addText(e[0], { x: x + 0.2, y: 2.45, w: 2.15, h: 0.3, fontFace: "Aptos", fontSize: 10, bold: true, color: i === 0 ? "F0DDB8" : C.gold, charSpacing: 1.2, margin: 0 });
    s.addText(e[1], { x: x + 0.2, y: 3.06, w: 2.15, h: 0.42, fontFace: "Georgia", fontSize: 18, color: i === 0 ? "FFFFFF" : C.ink, margin: 0 });
    s.addText(e[2], { x: x + 0.2, y: 3.78, w: 2.12, h: 1.08, fontFace: "Aptos", fontSize: 11.5, color: i === 0 ? "F8EFE2" : C.muted, margin: 0.02 });
  });
  quote(s, "The theft did not create the masterpiece—but it created a media phenomenon.", 1.3, 5.86, 10.4, 0.64);
}

// 9 — Smile
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "08 • The Smile", "Why does her expression seem to change?", "Our eyes, Leonardo’s technique, and our own interpretation all play a part.");
  s.addImage({ path: ML, x: 0.78, y: 1.96, w: 4.0, h: 4.72, sizing: "crop" });
  const ys = [2.08, 3.45, 4.82];
  [["SOFT EDGES", "Sfumato blurs transitions around the mouth and cheeks."], ["PERIPHERAL VISION", "The smile can seem stronger when we look slightly away."], ["INTERPRETATION", "Viewers read happiness, seriousness, or thoughtfulness."]].forEach((v, i) => {
    s.addShape(S.roundRect, { x: 5.35, y: ys[i], w: 6.75, h: 1.04, fill: { color: i === 1 ? "E7EBDD" : C.paper }, line: { color: i === 1 ? C.sage : "D8D0C0" } });
    s.addText(`0${i + 1}`, { x: 5.65, y: ys[i] + 0.27, w: 0.45, h: 0.3, fontFace: "Georgia", fontSize: 15, bold: true, color: [C.gold, C.sage, C.rust][i], margin: 0 });
    s.addText(v[0], { x: 6.3, y: ys[i] + 0.15, w: 1.8, h: 0.3, fontFace: "Aptos", fontSize: 11, bold: true, color: C.ink, margin: 0 });
    s.addText(v[1], { x: 8.1, y: ys[i] + 0.13, w: 3.7, h: 0.55, fontFace: "Aptos", fontSize: 11, color: C.muted, margin: 0.02 });
  });
  s.addText("No confirmed explanation tells us what Lisa was thinking.", { x: 5.38, y: 6.25, w: 6.7, h: 0.35, fontFace: "Georgia", fontSize: 15, italic: true, color: C.green, align: "center", margin: 0 });
}

// 10 — Fame
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "09 • Fame", "Seven reasons the Mona Lisa became an icon", "Artistry, mystery, history, and mass attention reinforced one another.");
  const reasons = [["01", "LEONARDO", "A celebrated Renaissance genius"], ["02", "THE SMILE", "An expression without one answer"], ["03", "TECHNIQUE", "Subtle light, shadow, and sfumato"], ["04", "THE THEFT", "Worldwide headlines after 1911"], ["05", "HISTORY", "A key example of Renaissance portraiture"], ["06", "THE LOUVRE", "Seen by millions of visitors"], ["07", "POPULAR CULTURE", "Reproduced, parodied, and discussed"]];
  reasons.forEach((r, i) => {
    const top = i < 4, col = top ? i : i - 4;
    const x = top ? 0.75 + col * 3.08 : 2.25 + col * 3.08;
    const y = top ? 2.05 : 4.32;
    card(s, x, y, 2.55, 1.72, r[0], r[1], r[2], [C.gold, C.sage, C.rust, C.green][i % 4]);
  });
}

// 11 — Facts
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "10 • Quick Facts", "Eight details worth remembering", "A rapid review before the conclusion.");
  const facts = [
    ["WOOD, NOT CANVAS", "Painted on a poplar panel."],
    ["LIKELY LISA", "Most scholars identify Lisa Gherardini."],
    ["BEGAN c. 1503", "Leonardo revisited it over many years."],
    ["STOLEN IN 1911", "Missing for more than two years."],
    ["LIVES IN PARIS", "Displayed at the Louvre Museum."],
    ["SFUMATO", "Soft transitions create lifelike depth."],
    ["500+ YEARS OLD", "A survivor of centuries of change."],
    ["PROTECTED", "Kept behind climate-controlled glass."],
  ];
  facts.forEach((f, i) => {
    const col = i % 4, row = Math.floor(i / 4), x = 0.72 + col * 3.1, y = 1.95 + row * 2.35;
    s.addShape(S.roundRect, { x, y, w: 2.6, h: 1.85, fill: { color: i % 2 ? "E9EDE3" : C.paper }, line: { color: i % 2 ? C.sage : "D8D0C0" } });
    s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.2, y: y + 0.18, w: 0.55, h: 0.33, fontFace: "Georgia", fontSize: 15, bold: true, color: i % 2 ? C.sage : C.gold, margin: 0 });
    s.addText(f[0], { x: x + 0.2, y: y + 0.67, w: 2.2, h: 0.3, fontFace: "Aptos", fontSize: 11, bold: true, color: C.ink, margin: 0 });
    s.addText(f[1], { x: x + 0.2, y: y + 1.1, w: 2.2, h: 0.48, fontFace: "Aptos", fontSize: 10.5, color: C.muted, margin: 0 });
  });
}

// 12 — Reflection
{
  const s = pptx.addSlide("MASTER"); addTitle(s, "11 • Reflection", "What this project taught me", "Researching one artwork revealed connections between art, science, history, and preservation.");
  const learn = [
    ["IDENTITY", "Lisa Gherardini is the most likely sitter."],
    ["PATIENCE", "Leonardo refined the portrait over many years."],
    ["SURPRISE", "The 1911 theft dramatically increased public attention."],
    ["TECHNIQUE", "Light, shadow, and sfumato shape what we perceive."],
  ];
  learn.forEach((v, i) => card(s, 0.82 + (i % 2) * 6.05, 2.02 + Math.floor(i / 2) * 1.72, 5.45, 1.38, `0${i + 1}`, v[0], v[1], [C.gold, C.sage, C.rust, C.green][i]));
  s.addShape(S.roundRect, { x: 1.55, y: 5.65, w: 10.25, h: 0.82, fill: { color: C.green }, line: { color: C.green } });
  s.addText("Historical artworks connect us with the past—protecting them protects shared human memory.", { x: 1.92, y: 5.91, w: 9.5, h: 0.32, fontFace: "Georgia", fontSize: 15, italic: true, color: "FFFFFF", align: "center", margin: 0 });
}

// 13 — Conclusion
{
  const s = pptx.addSlide();
  s.background = { color: C.green };
  s.addImage({ path: ML, x: 8.9, y: 0, w: 4.43, h: 7.5 });
  s.addShape(S.rect, { x: 7.45, y: 0, w: 2.1, h: 7.5, fill: { color: C.green, transparency: 12 }, line: { color: C.green, transparency: 100 } });
  s.addText("CONCLUSION", { x: 0.8, y: 0.82, w: 3.3, h: 0.28, fontFace: "Aptos", fontSize: 10, bold: true, color: "D4B36D", charSpacing: 2.4, margin: 0 });
  s.addText("More than\na famous painting.", { x: 0.76, y: 1.52, w: 7.45, h: 1.5, fontFace: "Georgia", fontSize: 34, color: "FFFFFF", margin: 0 });
  s.addText("The Mona Lisa unites artistic skill, Renaissance curiosity, human mystery, and an extraordinary history.", { x: 0.8, y: 3.38, w: 6.9, h: 0.95, fontFace: "Aptos", fontSize: 17, color: "DED8CC", margin: 0 });
  s.addShape(S.line, { x: 0.8, y: 4.75, w: 1.3, h: 0, line: { color: C.gold, width: 3 } });
  s.addText("Five centuries later, her gaze still asks us to look again.", { x: 0.8, y: 5.08, w: 6.65, h: 0.65, fontFace: "Georgia", fontSize: 19, italic: true, color: "FFFFFF", margin: 0 });
  s.addText("THANK YOU", { x: 0.8, y: 6.45, w: 2.4, h: 0.3, fontFace: "Aptos", fontSize: 11, bold: true, color: "D4B36D", charSpacing: 2.2, margin: 0 });
}

pptx.writeFile({ fileName: "artifacts/Mona_Lisa_Animated_History_Project.pptx" });
