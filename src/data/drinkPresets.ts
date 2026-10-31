import { menuItems } from './menu';

/**
 * Visual presets for the interactive 3D hero cup.
 * Each preset references an existing menu item so names/prices stay centralized.
 */
export interface DrinkPreset {
  id: string;
  shortName: string;
  /** Lower liquid layer color */
  base: string;
  /** Upper liquid layer color */
  top: string;
  /** Foam / cream cap color */
  foam: string;
  /** Accent glow used for UI + lights */
  glow: string;
}

const presets: DrinkPreset[] = [
  {
    id: 'jolt-signature-coldbrew',
    shortName: 'Cold Brew',
    base: '#1C0B04',
    top: '#3A1A0B',
    foam: '#F3E9DA',
    glow: '#C49A72',
  },
  {
    id: 'electric-blue-velvet',
    shortName: 'Blue Velvet',
    base: '#1B5FD1',
    top: '#CFE6FF',
    foam: '#F7FBFF',
    glow: '#36B9E8',
  },
  {
    id: 'spanish-latte',
    shortName: 'Spanish Latte',
    base: '#E9D9C2',
    top: '#7A4A26',
    foam: '#FBF4EA',
    glow: '#E0A96D',
  },
];

export const drinkPresets = presets.map((preset) => {
  const item = menuItems.find((m) => m.id === preset.id);
  return {
    ...preset,
    name: item?.name ?? preset.shortName,
    formattedPrice: item?.formattedPrice ?? '',
    item,
  };
});

export type HeroDrink = (typeof drinkPresets)[number];
