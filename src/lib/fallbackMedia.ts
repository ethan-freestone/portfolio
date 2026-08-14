import type { ProjectMedia } from "#/data/projects.ts";

type GetFallbackMediaProps = {
  title: string,
  bgColor?: string,
  textColor?: string,
  size?: string
}

const COLOR_PALETTES = [
  { bg: '0F172A', text: '38BDF8' }, // Slate / Sky Blue
  { bg: '1B4332', text: 'D8F3DC' }, // Deep Forest / Soft Mint
  { bg: '4A044E', text: 'FBCFE8' }, // Deep Plum / Soft Pink
  { bg: '7F1D1D', text: 'FEF3C7' }, // Rust Red / Warm Cream
  { bg: '0C4A6E', text: 'BAE6FD' }, // Ocean Blue / Pale Sky
  { bg: '18181B', text: 'FCD34D' }, // Charcoal / Gold
  { bg: '3B0764', text: 'E9D5FF' }, // Eggplant / Lavender
  { bg: '3F3F46', text: 'A7F3D0' }, // Zinc / Emerald
];

const getTitleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export const getFallbackMedia = ({ title, bgColor, textColor, size }: GetFallbackMediaProps): ProjectMedia => {

  const mediaSize = size ?? '800x450';

  const safeTitle = title.replace(/\s+/g, "+");

  // Pick a deterministic palette based on the title
  const paletteIndex = getTitleHash(title) % COLOR_PALETTES.length;
  const defaultPalette = COLOR_PALETTES[paletteIndex];

  const finalBg = (bgColor || defaultPalette.bg).replace('#', '');
  const finalText = (textColor || defaultPalette.text).replace('#', '');

  return {
    alt: `No media available for ${title}`,
    url: `https://placehold.co/${mediaSize}/${finalBg}/${finalText}?text=${safeTitle}`
  };
};

