import { gql } from '@apollo/client';

export const ATTRIBUTE_ENTRY_FRAGMENT = gql`
  fragment AttributeEntryFields on AttributeEntry {
    name
    amount
  }
`;

export const SCALING_ENTRY_FRAGMENT = gql`
  fragment ScalingEntryFields on ScalingEntry {
    name
    scaling
  }
`;

export const CLASS_STATS_FRAGMENT = gql`
  fragment ClassStatsFields on ClassStats {
    level
    vigor
    mind
    endurance
    strenght
    dexterity
    inteligence
    faith
    arcane
  }
`;
