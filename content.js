/* ==========================================================================
   JUZY — EDITABLE CONTENT
   Everything that is likely to change lives in this file.
   Edit values here; the website updates itself. No other file needs touching.
   ========================================================================== */
window.JUZY_CONTENT = {

  /* ---- SOCIAL MEDIA --------------------------------------------------------
     Paste the real page address into `url` (keep the quotes).
     While `url` is empty the button shows "Link coming soon".
     To add a platform: copy one block, give it a new `id` and add a matching
     icon in script.js (ICONS). Unknown ids fall back to a generic link icon. */
  socials: [
    { id: "facebook",  label: "Facebook",  url: "", blurb: "Announcements, explainer videos and community updates." },
    { id: "instagram", label: "Instagram", url: "", blurb: "Product photos, reels and flavor polls." },
    { id: "youtube",   label: "YouTube",   url: "", blurb: "How-it-works videos and the full product film." },
    { id: "tiktok",    label: "TikTok",    url: "", blurb: "Quick push-and-shake demonstrations." }
  ],

  /* ---- CONTACT ------------------------------------------------------------
     Leave a value empty ("") to show "Coming soon". */
  contact: {
    email: "",
    phone: "",
    location: ""
  },

  /* ---- FLAVORS (product versions) -----------------------------------------
     status: "initial"     -> planned for the first release
             "considering" -> under consideration
     `color` / `color2` tint the bottle animation (top / bottom of the liquid).
     Add `image: "assets/your-photo.png"` to show a real product photo on the card. */
  flavors: [
    { id: "strawberry", name: "Strawberry", bn: "স্ট্রবেরি", emoji: "🍓", status: "initial",     color: "#F0476A", color2: "#D81E4C" },
    { id: "mango",      name: "Mango",      bn: "আম",        emoji: "🥭", status: "initial",     color: "#FFC83A", color2: "#F5A00B" },
    { id: "orange",     name: "Orange",     bn: "কমলা",      emoji: "🍊", status: "initial",     color: "#FF9A3D", color2: "#F26B00" },
    { id: "grape",      name: "Grape",      bn: "আঙুর",      emoji: "🍇", status: "initial",     color: "#9A5BD0", color2: "#6A2FA8" },
    { id: "lemon-mint", name: "Lemon-Mint", bn: "লেবু-পুদিনা", emoji: "🍋", status: "considering", color: "#C5E85A", color2: "#8FCB3A" }
  ],

  /* ---- FUTURE IDEAS (not confirmed) --------------------------------------- */
  future: [
    { title: "Local flavors",            text: "Litchi, jamun and tamarind." },
    { title: "Sugar-free version",       text: "A sugar-free option." },
    { title: "Vitamin-C / electrolyte",  text: "A version for summer and sport." },
    { title: "Seasonal Ramadan packs",   text: "Packs designed for the season." },
    { title: "Larger cap",               text: "A cap for one-litre bottles." }
  ],

  /* ---- PACK SIZES (planned) ----------------------------------------------- */
  packs: [
    { name: "Single cap",    caps: 1,  text: "One cap flavors about 500 ml of water." },
    { name: "6-pack",        caps: 6,  text: "A multi-pack of six caps." },
    { name: "12-pack",       caps: 12, text: "A multi-pack of twelve caps." }
  ],

  /* ---- AT-A-GLANCE SPECIFICATIONS (planning figures, subject to testing) -- */
  specs: [
    { label: "Serving",          value: "One cap flavors about 500 ml" },
    { label: "Powder per cap",   value: "About 8 to 10 g" },
    { label: "Bottle fit",       value: "Standard 28 mm PET bottle neck" },
    { label: "Action",           value: "Press down, then shake" },
    { label: "Preparation time", value: "About 10 seconds" },
    { label: "Price",            value: "To be announced" },
    { label: "Where to buy",     value: "To be announced" }
  ],
  specsNote: "Planning specifications. Final details will be confirmed after prototype testing."
};
