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

// List queries stay outside components so rendering logic never owns transport details.
export const CATEGORY_LIST_QUERIES = {
  bosses: gql`
    query GetBosses($search: String, $page: Int, $limit: Int) {
      boss(search: $search, page: $page, limit: $limit) {
        ...BossFields
      }
    }
    ${BOSS_FIELDS_FRAGMENT}
  `,
  weapons: gql`
    query GetWeapons($search: String, $page: Int, $limit: Int) {
      weapon(search: $search, page: $page, limit: $limit) {
        ...WeaponFields
      }
    }
    ${WEAPON_FIELDS_FRAGMENT}
  `,
  armor: gql`
    query GetArmor($search: String, $page: Int, $limit: Int) {
      armor(search: $search, page: $page, limit: $limit) {
        ...ArmorFields
      }
    }
    ${ARMOR_FIELDS_FRAGMENT}
  `,
  items: gql`
    query GetItems($search: String, $page: Int, $limit: Int) {
      item(search: $search, page: $page, limit: $limit) {
        ...ItemFields
      }
    }
    ${ITEM_FIELDS_FRAGMENT}
  `,
  talismans: gql`
    query GetTalismans($search: String, $page: Int, $limit: Int) {
      talisman(search: $search, page: $page, limit: $limit) {
        ...TalismanFields
      }
    }
    ${TALISMAN_FIELDS_FRAGMENT}
  `,
  classes: gql`
    query GetClasses($search: String, $page: Int, $limit: Int) {
      class(search: $search, page: $page, limit: $limit) {
        ...ClassFields
      }
    }
    ${CLASS_FIELDS_FRAGMENT}
  `,
  spirits: gql`
    query GetSpirits($search: String, $page: Int, $limit: Int) {
      spirit(search: $search, page: $page, limit: $limit) {
        ...SpiritFields
      }
    }
    ${SPIRIT_FIELDS_FRAGMENT}
  `,
  sorceries: gql`
    query GetSorceries($search: String, $page: Int, $limit: Int) {
      sorcery(search: $search, page: $page, limit: $limit) {
        ...SorceryFields
      }
    }
    ${SORCERY_FIELDS_FRAGMENT}
  `,
} as const;
