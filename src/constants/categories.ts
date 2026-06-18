export const CATEGORY_CONFIG = {
  bosses: {
    key: 'bosses',
    label: 'Bosses',
    description: 'Demigods, legends, and horrors that guard the path to grace.',
    route: '/category/bosses',
    heroTone: 'from-amber-400/30 to-red-900/20',
    icon: 'Crown',
    listField: 'boss',
    detailField: 'getBoss',
  },
  weapons: {
    key: 'weapons',
    label: 'Weapons',
    description: 'Blades, colossal hammers, and arcane armaments for every build.',
    route: '/category/weapons',
    heroTone: 'from-yellow-300/25 to-zinc-800/30',
    icon: 'Sword',
    listField: 'weapon',
    detailField: 'getWeapon',
  },
  armor: {
    key: 'armor',
    label: 'Armor',
    description: 'Helms, robes, and war gear forged for survival in the Lands Between.',
    route: '/category/armor',
    heroTone: 'from-orange-300/20 to-stone-900/30',
    icon: 'Shield',
    listField: 'armor',
    detailField: 'getArmor',
  },
  items: {
    key: 'items',
    label: 'Items',
    description: 'Consumables, keys, and relics that shape your journey.',
    route: '/category/items',
    heroTone: 'from-lime-300/20 to-stone-900/30',
    icon: 'Flask',
    listField: 'item',
    detailField: 'getItem',
  },
  talismans: {
    key: 'talismans',
    label: 'Talismans',
    description: 'Mystic charms that alter combat, defense, and exploration.',
    route: '/category/talismans',
    heroTone: 'from-yellow-300/25 to-amber-900/25',
    icon: 'Sigil',
    listField: 'talisman',
    detailField: 'getTalisman',
  },
  classes: {
    key: 'classes',
    label: 'Classes',
    description: 'Starting archetypes with distinct stat spreads and fantasy roles.',
    route: '/category/classes',
    heroTone: 'from-sky-300/20 to-slate-900/35',
    icon: 'Helm',
    listField: 'class',
    detailField: 'getClass',
  },
  spirits: {
    key: 'spirits',
    label: 'Spirits',
    description: 'Summonable allies that change the rhythm of battle.',
    route: '/category/spirits',
    heroTone: 'from-cyan-300/20 to-slate-900/35',
    icon: 'Ghost',
    listField: 'spirit',
    detailField: 'getSpirit',
  },
  sorceries: {
    key: 'sorceries',
    label: 'Sorceries',
    description: 'Glintstone arts, ranged magic, and scholarly devastation.',
    route: '/category/sorceries',
    heroTone: 'from-indigo-300/25 to-slate-900/35',
    icon: 'Rune',
    listField: 'sorcery',
    detailField: 'getSorcery',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORY_CONFIG;
export type SearchScope = CategoryKey | 'all';

export const CATEGORY_KEYS = Object.keys(CATEGORY_CONFIG) as CategoryKey[];
export const CATEGORIES = CATEGORY_KEYS.map((key) => CATEGORY_CONFIG[key]);

export const isCategoryKey = (value: string): value is CategoryKey => value in CATEGORY_CONFIG;
