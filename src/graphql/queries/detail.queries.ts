import { gql } from '@apollo/client';

import {
  ARMOR_FIELDS_FRAGMENT,
  BOSS_FIELDS_FRAGMENT,
  CLASS_FIELDS_FRAGMENT,
  ITEM_FIELDS_FRAGMENT,
  SORCERY_FIELDS_FRAGMENT,
  SPIRIT_FIELDS_FRAGMENT,
  TALISMAN_FIELDS_FRAGMENT,
  WEAPON_FIELDS_FRAGMENT,
} from '@/graphql/fragments/entity.fragments';

export const CATEGORY_DETAIL_QUERIES = {
  bosses: gql`
    query GetBossDetail($id: String!) {
      getBoss(id: $id) {
        ...BossFields
      }
    }
    ${BOSS_FIELDS_FRAGMENT}
  `,
  weapons: gql`
    query GetWeaponDetail($id: String!) {
      getWeapon(id: $id) {
        ...WeaponFields
      }
    }
    ${WEAPON_FIELDS_FRAGMENT}
  `,
  armor: gql`
    query GetArmorDetail($id: String!) {
      getArmor(id: $id) {
        ...ArmorFields
      }
    }
    ${ARMOR_FIELDS_FRAGMENT}
  `,
  items: gql`
    query GetItemDetail($id: String!) {
      getItem(id: $id) {
        ...ItemFields
      }
    }
    ${ITEM_FIELDS_FRAGMENT}
  `,
  talismans: gql`
    query GetTalismanDetail($id: String!) {
      getTalisman(id: $id) {
        ...TalismanFields
      }
    }
    ${TALISMAN_FIELDS_FRAGMENT}
  `,
  classes: gql`
    query GetClassDetail($id: String!) {
      getClass(id: $id) {
        ...ClassFields
      }
    }
    ${CLASS_FIELDS_FRAGMENT}
  `,
  spirits: gql`
    query GetSpiritDetail($id: String!) {
      getSpirit(id: $id) {
        ...SpiritFields
      }
    }
    ${SPIRIT_FIELDS_FRAGMENT}
  `,
  sorceries: gql`
    query GetSorceryDetail($id: String!) {
      getSorcery(id: $id) {
        ...SorceryFields
      }
    }
    ${SORCERY_FIELDS_FRAGMENT}
  `,
} as const;

export const RESOLVE_DETAIL_QUERY = gql`
  query ResolveDetailById($id: ID!) {
    boss(id: $id) {
      ...BossFields
    }
    weapon(id: $id) {
      ...WeaponFields
    }
    armor(id: $id) {
      ...ArmorFields
    }
    item(id: $id) {
      ...ItemFields
    }
    talisman(id: $id) {
      ...TalismanFields
    }
    class(id: $id) {
      ...ClassFields
    }
    spirit(id: $id) {
      ...SpiritFields
    }
    sorcery(id: $id) {
      ...SorceryFields
    }
  }
  ${BOSS_FIELDS_FRAGMENT}
  ${WEAPON_FIELDS_FRAGMENT}
  ${ARMOR_FIELDS_FRAGMENT}
  ${ITEM_FIELDS_FRAGMENT}
  ${TALISMAN_FIELDS_FRAGMENT}
  ${CLASS_FIELDS_FRAGMENT}
  ${SPIRIT_FIELDS_FRAGMENT}
  ${SORCERY_FIELDS_FRAGMENT}
`;
