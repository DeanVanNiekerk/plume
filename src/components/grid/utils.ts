import { GridContext } from './types';

const defaultSpacing = 5; // 20px
const defaultMinChildWidth = 250;

export const gridContextWithDefaults = (c?: GridContext): GridContext => {
  const minChildWidth = c?.minChildWidth ?? defaultMinChildWidth;
  return {
    spacing: c?.spacing ?? defaultSpacing,
    minChildWidth,
    gridTemplateColumns: c?.gridTemplateColumns ?? `repeat(auto-fill, minmax(${minChildWidth}px, 1fr))`,
  };
};
