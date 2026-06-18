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

export const GLOBAL_SEARCH_QUERY = gql`
  query SearchAcrossCategories($search: String, $limit: Int, $page: Int) {
    boss(search: $search, limit: $limit, page: $page) {
      ...BossFields
    }
    weapon(search: $search, limit: $limit, page: $page) {
      ...WeaponFields
    }
    armor(search: $search, limit: $limit, page: $page) {
      ...ArmorFields
    }
    item(search: $search, limit: $limit, page: $page) {
      ...ItemFields
    }
    talisman(search: $search, limit: $limit, page: $page) {
      ...TalismanFields
    }
    class(search: $search, limit: $limit, page: $page) {
      ...ClassFields
    }
    spirit(search: $search, limit: $limit, page: $page) {
      ...SpiritFields
    }
    sorcery(search: $search, limit: $limit, page: $page) {
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
