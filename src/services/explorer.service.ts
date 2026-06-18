import { CATEGORY_CONFIG, type CategoryKey } from '@/constants/categories';
import type {
  ExplorerDetail,
  ExplorerItem,
  FavoriteItem,
  StatEntry,
  StatGroup,
} from '@/types/domain';
import type {
  ArmorEntity,
  AttributeEntry,
  BossEntity,
  CategoryDetailDataMap,
  CategoryListDataMap,
  ClassEntity,
  ClassStats,
  EntityByCategory,
  GlobalSearchData,
  ItemEntity,
  ResolveDetailData,
  ScalingEntry,
  SorceryEntity,
  SpiritEntity,
  TalismanEntity,
  WeaponEntity,
} from '@/types/graphql';
import { safeText, shortText, toDisplayValue } from '@/utils/format';

type AnyEntity = EntityByCategory[CategoryKey];

const toAttributeStats = (entries?: AttributeEntry[] | null): StatEntry[] =>
  (entries ?? [])
    .filter((entry): entry is AttributeEntry => Boolean(entry.name))
    .map((entry) => ({
      label: safeText(entry.name),
      value: toDisplayValue(entry.amount),
    }));

const toScalingStats = (entries?: ScalingEntry[] | null): StatEntry[] =>
  (entries ?? [])
    .filter((entry): entry is ScalingEntry => Boolean(entry.name))
    .map((entry) => ({
      label: safeText(entry.name),
      value: toDisplayValue(entry.scaling),
    }));

const toClassStats = (stats?: ClassStats | null): StatEntry[] => {
  if (!stats) {
    return [];
  }

  const statPairs: [string, string | null | undefined][] = [
    ['Level', stats.level],
    ['Vigor', stats.vigor],
    ['Mind', stats.mind],
    ['Endurance', stats.endurance],
    ['Strength', stats.strenght],
    ['Dexterity', stats.dexterity],
    ['Intelligence', stats.inteligence],
    ['Faith', stats.faith],
    ['Arcane', stats.arcane],
  ];

  return statPairs
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => ({ label, value: safeText(value) }));
};

const createItem = (
  base: Omit<ExplorerItem, 'tags'>,
  tags: string[],
  subtitle?: string,
): ExplorerItem => ({
  ...base,
  ...(subtitle ? { subtitle } : {}),
  tags,
});

const buildBaseItem = (category: CategoryKey, entity: AnyEntity): ExplorerItem => {
  const config = CATEGORY_CONFIG[category];
  const shared = {
    category,
    categoryLabel: config.label,
    description: shortText(entity.description),
    id: entity.id,
    image: entity.image ?? null,
    name: safeText(entity.name),
  };

  switch (category) {
    case 'bosses': {
      const boss = entity as BossEntity;

      return createItem(
        shared,
        [safeText(boss.location, ''), safeText(boss.healthPoints, '')].filter(Boolean),
        boss.region ?? boss.location ?? undefined,
      );
    }
    case 'weapons': {
      const weapon = entity as WeaponEntity;

      return createItem(
        shared,
        [safeText(weapon.category, ''), `Weight ${toDisplayValue(weapon.weight)}`].filter(Boolean),
        weapon.category ?? undefined,
      );
    }
    case 'armor': {
      const armor = entity as ArmorEntity;

      return createItem(
        shared,
        [safeText(armor.category, ''), `Weight ${toDisplayValue(armor.weight)}`].filter(Boolean),
        armor.category ?? undefined,
      );
    }
    case 'items': {
      const item = entity as ItemEntity;

      return createItem(
        shared,
        [safeText(item.type, ''), safeText(item.effect, '')].filter(Boolean),
        item.type ?? undefined,
      );
    }
    case 'talismans': {
      const talisman = entity as TalismanEntity;

      return createItem(shared, [safeText(talisman.effect, '')].filter(Boolean), 'Mystic Relic');
    }
    case 'classes': {
      return createItem(shared, ['Origin archetype'], 'Starting Class');
    }
    case 'spirits': {
      const spirit = entity as SpiritEntity;

      return createItem(
        shared,
        [safeText(spirit.fpCost, ''), safeText(spirit.hpCost, '')].filter(Boolean),
        'Spirit Ash',
      );
    }
    case 'sorceries': {
      const sorcery = entity as SorceryEntity;

      return createItem(
        shared,
        [
          safeText(sorcery.type, ''),
          `Cost ${toDisplayValue(sorcery.cost)}`,
          `Slots ${toDisplayValue(sorcery.slots)}`,
        ].filter(Boolean),
        sorcery.type ?? undefined,
      );
    }
  }
};

const buildStatGroups = (category: CategoryKey, entity: AnyEntity): StatGroup[] => {
  switch (category) {
    case 'bosses': {
      const boss = entity as BossEntity;

      return [
        {
          title: 'Encounter',
          entries: [
            { label: 'Region', value: safeText(boss.region) },
            { label: 'Location', value: safeText(boss.location) },
            { label: 'Health', value: safeText(boss.healthPoints) },
          ],
        },
        {
          title: 'Drops',
          entries: (boss.drops ?? []).filter(Boolean).map((drop, index) => ({
            label: `Drop ${index + 1}`,
            value: safeText(drop),
          })),
        },
      ].filter((group) => group.entries.length > 0);
    }
    case 'weapons': {
      const weapon = entity as WeaponEntity;

      return [
        {
          title: 'Overview',
          entries: [
            { label: 'Category', value: safeText(weapon.category) },
            { label: 'Weight', value: toDisplayValue(weapon.weight) },
          ],
        },
        { title: 'Attack', entries: toAttributeStats(weapon.attack) },
        { title: 'Defence', entries: toAttributeStats(weapon.defence) },
        { title: 'Required Attributes', entries: toAttributeStats(weapon.requiredAttributes) },
        { title: 'Scaling', entries: toScalingStats(weapon.scalesWith) },
      ].filter((group) => group.entries.length > 0);
    }
    case 'armor': {
      const armor = entity as ArmorEntity;

      return [
        {
          title: 'Overview',
          entries: [
            { label: 'Category', value: safeText(armor.category) },
            { label: 'Weight', value: toDisplayValue(armor.weight) },
          ],
        },
        { title: 'Damage Negation', entries: toAttributeStats(armor.dmgNegation) },
        { title: 'Resistance', entries: toAttributeStats(armor.resistance) },
      ].filter((group) => group.entries.length > 0);
    }
    case 'items': {
      const item = entity as ItemEntity;

      return [
        {
          title: 'Properties',
          entries: [
            { label: 'Type', value: safeText(item.type) },
            { label: 'Effect', value: safeText(item.effect) },
          ],
        },
      ].filter((group) => group.entries.length > 0);
    }
    case 'talismans': {
      const talisman = entity as TalismanEntity;

      return [
        {
          title: 'Effect',
          entries: [{ label: 'Blessing', value: safeText(talisman.effect) }],
        },
      ];
    }
    case 'classes': {
      const classEntity = entity as ClassEntity;

      return [{ title: 'Starting Stats', entries: toClassStats(classEntity.stats) }].filter(
        (group) => group.entries.length > 0,
      );
    }
    case 'spirits': {
      const spirit = entity as SpiritEntity;

      return [
        {
          title: 'Summon Cost',
          entries: [
            { label: 'FP Cost', value: safeText(spirit.fpCost) },
            { label: 'HP Cost', value: safeText(spirit.hpCost) },
          ],
        },
        {
          title: 'Effect',
          entries: [{ label: 'Support', value: safeText(spirit.effect) }],
        },
      ].filter((group) => group.entries.length > 0);
    }
    case 'sorceries': {
      const sorcery = entity as SorceryEntity;

      return [
        {
          title: 'Spell Data',
          entries: [
            { label: 'Type', value: safeText(sorcery.type) },
            { label: 'Cost', value: toDisplayValue(sorcery.cost) },
            { label: 'Slots', value: toDisplayValue(sorcery.slots) },
            { label: 'Effects', value: safeText(sorcery.effects) },
          ],
        },
        { title: 'Requirements', entries: toAttributeStats(sorcery.requires) },
      ].filter((group) => group.entries.length > 0);
    }
  }
};

export const toFavoriteItem = (item: ExplorerItem): FavoriteItem => ({
  category: item.category,
  categoryLabel: item.categoryLabel,
  id: item.id,
  image: item.image,
  name: item.name,
});

const mapEntities = (category: CategoryKey, entities?: AnyEntity[] | null): ExplorerItem[] =>
  (entities ?? []).map((entity) => buildBaseItem(category, entity));

export const normalizeEntityList = (
  category: CategoryKey,
  data?: CategoryListDataMap[CategoryKey],
): ExplorerItem[] => {
  switch (category) {
    case 'bosses':
      return mapEntities(category, (data as CategoryListDataMap['bosses'] | undefined)?.boss);
    case 'weapons':
      return mapEntities(category, (data as CategoryListDataMap['weapons'] | undefined)?.weapon);
    case 'armor':
      return mapEntities(category, (data as CategoryListDataMap['armor'] | undefined)?.armor);
    case 'items':
      return mapEntities(category, (data as CategoryListDataMap['items'] | undefined)?.item);
    case 'talismans':
      return mapEntities(
        category,
        (data as CategoryListDataMap['talismans'] | undefined)?.talisman,
      );
    case 'classes':
      return mapEntities(category, (data as CategoryListDataMap['classes'] | undefined)?.class);
    case 'spirits':
      return mapEntities(category, (data as CategoryListDataMap['spirits'] | undefined)?.spirit);
    case 'sorceries':
      return mapEntities(category, (data as CategoryListDataMap['sorceries'] | undefined)?.sorcery);
  }
};

export const normalizeEntityDetail = (
  category: CategoryKey,
  data?: CategoryDetailDataMap[CategoryKey],
): ExplorerDetail | null => {
  let entity: AnyEntity | null | undefined;

  switch (category) {
    case 'bosses':
      entity = (data as CategoryDetailDataMap['bosses'] | undefined)?.getBoss;
      break;
    case 'weapons':
      entity = (data as CategoryDetailDataMap['weapons'] | undefined)?.getWeapon;
      break;
    case 'armor':
      entity = (data as CategoryDetailDataMap['armor'] | undefined)?.getArmor;
      break;
    case 'items':
      entity = (data as CategoryDetailDataMap['items'] | undefined)?.getItem;
      break;
    case 'talismans':
      entity = (data as CategoryDetailDataMap['talismans'] | undefined)?.getTalisman;
      break;
    case 'classes':
      entity = (data as CategoryDetailDataMap['classes'] | undefined)?.getClass;
      break;
    case 'spirits':
      entity = (data as CategoryDetailDataMap['spirits'] | undefined)?.getSpirit;
      break;
    case 'sorceries':
      entity = (data as CategoryDetailDataMap['sorceries'] | undefined)?.getSorcery;
      break;
  }

  if (!entity) {
    return null;
  }

  return {
    ...buildBaseItem(category, entity),
    statGroups: buildStatGroups(category, entity),
  };
};

export const normalizeGlobalSearch = (data?: GlobalSearchData): ExplorerItem[] => [
  ...normalizeEntityList('bosses', { boss: data?.boss ?? [] }),
  ...normalizeEntityList('weapons', { weapon: data?.weapon ?? [] }),
  ...normalizeEntityList('armor', { armor: data?.armor ?? [] }),
  ...normalizeEntityList('items', { item: data?.item ?? [] }),
  ...normalizeEntityList('talismans', { talisman: data?.talisman ?? [] }),
  ...normalizeEntityList('classes', { class: data?.class ?? [] }),
  ...normalizeEntityList('spirits', { spirit: data?.spirit ?? [] }),
  ...normalizeEntityList('sorceries', { sorcery: data?.sorcery ?? [] }),
];

// The detail route only receives an id, so this fallback probes every category using safe list queries.
export const resolveEntityDetail = (data?: ResolveDetailData): ExplorerDetail | null => {
  if (!data) {
    return null;
  }

  const resolved: { category: CategoryKey; entity: AnyEntity } | null = data.boss?.[0]
    ? { category: 'bosses' as const, entity: data.boss[0] }
    : data.weapon?.[0]
      ? { category: 'weapons' as const, entity: data.weapon[0] }
      : data.armor?.[0]
        ? { category: 'armor' as const, entity: data.armor[0] }
        : data.item?.[0]
          ? { category: 'items' as const, entity: data.item[0] }
          : data.talisman?.[0]
            ? { category: 'talismans' as const, entity: data.talisman[0] }
            : data.class?.[0]
              ? { category: 'classes' as const, entity: data.class[0] }
              : data.spirit?.[0]
                ? { category: 'spirits' as const, entity: data.spirit[0] }
                : data.sorcery?.[0]
                  ? { category: 'sorceries' as const, entity: data.sorcery[0] }
                  : null;

  if (resolved) {
    return {
      ...buildBaseItem(resolved.category, resolved.entity),
      statGroups: buildStatGroups(resolved.category, resolved.entity),
    };
  }

  return null;
};
