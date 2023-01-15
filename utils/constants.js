export const BASE_URL = "https://bymykel.github.io/CSGO-API/api";

export const URL = {
  skins: "/api/type/skins",
  crates: "/api/type/crates",
  stickers: "/api/type/stickers",
  collections: "/api/type/collections",
  collectibles: "/api/type/collectibles",
  agents: "/api/type/agents",
  graffiti: "/api/type/graffiti",
  keys: "/api/ktype/eys",
  patches: "/api/type/patches",
  "music-kits": "/api/type/music_kits",
};

export const URL_SUBTYPE = {
  "crates/cases": "/api/type/crates/cases",
  "crates/capsules": "/api/type/crates/capsules",
  "crates/graffiti": "/api/type/crates/graffiti",
  "crates/music_kit_boxes": "/api/type/crates/music_kit_boxes",
  "crates/souvenir": "/api/type/crates/souvenir",
  "crates/other": "/api/type/crates/other",
  "collectibles/major": "/api/type/collectibles/major",
  "collectibles/operation": "/api/type/collectibles/operation",
  "collectibles/map_coins": "/api/type/collectibles/map_coins",
  "collectibles/pins": "/api/type/collectibles/pins",
  "collectibles/service_medals": "/api/type/collectibles/service_medals",
  "collectibles/other": "/api/type/collectibles/other",
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
