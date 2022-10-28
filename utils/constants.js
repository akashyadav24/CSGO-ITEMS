export const BASE_URL = "https://bymykel.github.io/CSGO-API/api";

export const URL = {
  skins: "/api/skins",
  crates: "/api/crates",
  stickers: "/api/stickers",
  collections: "/api/collections",
  collectibles: "/api/collectibles",
  agents: "/api/agents",
  graffiti: "/api/graffiti",
  keys: "/api/keys",
  patches: "/api/patches",
  "music-kits": "/api/music_kits",
};

export const URL_SUBTYPE = {
  "crates/cases": "/api/crates/cases",
  "crates/capsules": "/api/crates/capsules",
  "crates/graffiti": "/api/crates/graffiti",
  "crates/music_kit_boxes": "/api/crates/music_kit_boxes",
  "crates/souvenir": "/api/crates/souvenir",
  "crates/other": "/api/crates/other",
  "collectibles/major": "/api/collectibles/major",
  "collectibles/operation": "/api/collectibles/operation",
  "collectibles/map_coins": "/api/collectibles/map_coins",
  "collectibles/pins": "/api/collectibles/pins",
  "collectibles/service_medals": "/api/collectibles/service_medals",
  "collectibles/other": "/api/collectibles/other",
};

export const NAVIGATION = {
  crates: [
    { name: "All", href: "/crates" },
    { name: "Cases", href: "/crates/cases" },
    { name: "Capsules", href: "/crates/capsules" },
    { name: "Graffiti", href: "/crates/graffiti" },
    { name: "Music kit", href: "/crates/music_kit_boxes" },
    { name: "Souvenir", href: "/crates/souvenir" },
    { name: "Other", href: "/crates/other" },
  ],
  collectibles: [
    { name: "All", href: "/collectibles" },
    { name: "Major", href: "/collectibles/major" },
    { name: "Operation", href: "/collectibles/operation" },
    { name: "Map coins", href: "/collectibles/map_coins" },
    { name: "Pins", href: "/collectibles/pins" },
    { name: "Service medals", href: "/collectibles/service_medals" },
    { name: "Other", href: "/collectibles/other" },
  ],
};

export const FILTER_OPTIONS_AVAILABLE = {
  skins: false,
  crates: true,
  stickers: false,
  collections: false,
  collectibles: true,
  agents: false,
  graffiti: false,
  keys: false,
  patches: false,
  "music-kits": false,
};

export const ALL_SUBTYPES = {
  "crates/cases": ["Case"],
  "crates/capsules": ["Sticker Capsule", "Pins", "Patch Capsule"],
  "crates/graffiti": ["Graffiti"],
  "crates/music_kit_boxes": ["Music Kit Box"],
  "crates/souvenir": ["Souvenir"],
  "crates/other": [null],
  "collectibles/major": [
    "Tournament Finalist Trophy",
    "Old Pick'Em Trophy",
    "Fantasy Trophy",
    "Pick'Em Coin",
  ],
  "collectibles/operation": ["Operation Coin", "Stars for Operation"],
  "collectibles/map_coins": ["Map Contributor Coin"],
  "collectibles/pins": ["Pin"],
  "collectibles/service_medals": ["Service Medal"],
  "collectibles/other": [null],
};
