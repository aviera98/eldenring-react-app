import { gql } from '@apollo/client';

import {
  ATTRIBUTE_ENTRY_FRAGMENT,
  CLASS_STATS_FRAGMENT,
  SCALING_ENTRY_FRAGMENT,
} from '@/graphql/fragments/common.fragments';

// These fragments act as the contract between GraphQL responses and the UI/domain layer.
// Keeping them centralized prevents query drift across pages and hooks.
export const BOSS_FIELDS_FRAGMENT = gql`
  fragment BossFields on Boss {
    id
    name
    image
    description
    location
    region
    drops
    healthPoints
  }
`;

export const WEAPON_FIELDS_FRAGMENT = gql`
  fragment WeaponFields on Weapon {
    id
    name
    image
    description
    category
    weight
    attack {
      ...AttributeEntryFields
    }
    defence {
      ...AttributeEntryFields
    }
    requiredAttributes {
      ...AttributeEntryFields
    }
    scalesWith {
      ...ScalingEntryFields
    }
  }
  ${ATTRIBUTE_ENTRY_FRAGMENT}
  ${SCALING_ENTRY_FRAGMENT}
`;

export const ARMOR_FIELDS_FRAGMENT = gql`
  fragment ArmorFields on Armor {
    id
    name
    image
    description
    category
    weight
    dmgNegation {
      ...AttributeEntryFields
    }
    resistance {
      ...AttributeEntryFields
    }
  }
  ${ATTRIBUTE_ENTRY_FRAGMENT}
`;

export const ITEM_FIELDS_FRAGMENT = gql`
  fragment ItemFields on Item {
    id
    name
    image
    description
    effect
    type
  }
`;

export const TALISMAN_FIELDS_FRAGMENT = gql`
  fragment TalismanFields on Talisman {
    id
    name
    image
    description
    effect
  }
`;

export const CLASS_FIELDS_FRAGMENT = gql`
  fragment ClassFields on Class {
    id
    name
    image
    description
    stats {
      ...ClassStatsFields
    }
  }
  ${CLASS_STATS_FRAGMENT}
`;

export const SPIRIT_FIELDS_FRAGMENT = gql`
  fragment SpiritFields on Spirit {
    id
    name
    image
    description
    fpCost
    hpCost
    effect
  }
`;

export const SORCERY_FIELDS_FRAGMENT = gql`
  fragment SorceryFields on Sorcery {
    id
    name
    image
    description
    type
    cost
    slots
    effects
    requires {
      ...AttributeEntryFields
    }
  }
  ${ATTRIBUTE_ENTRY_FRAGMENT}
`;
