import type { CategoryKey } from '@/constants/categories';

export interface AttributeEntry {
  amount?: number | null;
  name?: string | null;
}

export interface ScalingEntry {
  name?: string | null;
  scaling?: string | null;
}

export interface ClassStats {
  arcane?: string | null;
  dexterity?: string | null;
  endurance?: string | null;
  faith?: string | null;
  inteligence?: string | null;
  level?: string | null;
  mind?: string | null;
  strenght?: string | null;
  vigor?: string | null;
}

export interface BossEntity {
  description?: string | null;
  drops?: (string | null)[] | null;
  healthPoints?: string | null;
  id: string;
  image?: string | null;
  location?: string | null;
  name?: string | null;
  region?: string | null;
}

export interface WeaponEntity {
  attack?: AttributeEntry[] | null;
  category?: string | null;
  defence?: AttributeEntry[] | null;
  description?: string | null;
  id: string;
  image?: string | null;
  name?: string | null;
  requiredAttributes?: AttributeEntry[] | null;
  scalesWith?: ScalingEntry[] | null;
  weight?: number | null;
}

export interface ArmorEntity {
  category?: string | null;
  description?: string | null;
  dmgNegation?: AttributeEntry[] | null;
  id: string;
  image?: string | null;
  name?: string | null;
  resistance?: AttributeEntry[] | null;
  weight?: number | null;
}

export interface ItemEntity {
  description?: string | null;
  effect?: string | null;
  id: string;
  image?: string | null;
  name?: string | null;
  type?: string | null;
}

export interface TalismanEntity {
  description?: string | null;
  effect?: string | null;
  id: string;
  image?: string | null;
  name?: string | null;
}

export interface ClassEntity {
  description?: string | null;
  id: string;
  image?: string | null;
  name?: string | null;
  stats?: ClassStats | null;
}

export interface SpiritEntity {
  description?: string | null;
  effect?: string | null;
  fpCost?: string | null;
  hpCost?: string | null;
  id: string;
  image?: string | null;
  name?: string | null;
}

export interface SorceryEntity {
  cost?: number | null;
  description?: string | null;
  effects?: string | null;
  id: string;
  image?: string | null;
  name?: string | null;
  requires?: AttributeEntry[] | null;
  slots?: number | null;
  type?: string | null;
}

export interface EntityByCategory {
  armor: ArmorEntity;
  bosses: BossEntity;
  classes: ClassEntity;
  items: ItemEntity;
  sorceries: SorceryEntity;
  spirits: SpiritEntity;
  talismans: TalismanEntity;
  weapons: WeaponEntity;
}

export interface CategoryListDataMap {
  armor: { armor?: ArmorEntity[] | null };
  bosses: { boss?: BossEntity[] | null };
  classes: { class?: ClassEntity[] | null };
  items: { item?: ItemEntity[] | null };
  sorceries: { sorcery?: SorceryEntity[] | null };
  spirits: { spirit?: SpiritEntity[] | null };
  talismans: { talisman?: TalismanEntity[] | null };
  weapons: { weapon?: WeaponEntity[] | null };
}

export interface CategoryDetailDataMap {
  armor: { getArmor?: ArmorEntity | null };
  bosses: { getBoss?: BossEntity | null };
  classes: { getClass?: ClassEntity | null };
  items: { getItem?: ItemEntity | null };
  sorceries: { getSorcery?: SorceryEntity | null };
  spirits: { getSpirit?: SpiritEntity | null };
  talismans: { getTalisman?: TalismanEntity | null };
  weapons: { getWeapon?: WeaponEntity | null };
}

export interface GlobalSearchData {
  armor?: ArmorEntity[] | null;
  boss?: BossEntity[] | null;
  class?: ClassEntity[] | null;
  item?: ItemEntity[] | null;
  sorcery?: SorceryEntity[] | null;
  spirit?: SpiritEntity[] | null;
  talisman?: TalismanEntity[] | null;
  weapon?: WeaponEntity[] | null;
}

export type ResolveDetailData = GlobalSearchData;

export interface EntityQueryVariables {
  id?: string;
  limit?: number;
  page?: number;
  search?: string;
}

export type CategoryEntity<K extends CategoryKey> = EntityByCategory[K];
