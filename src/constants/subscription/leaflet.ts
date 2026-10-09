export const SHOW_MAP_LEGEND = false;

export const LEAFLET_TILE_SIZE = 256;
export const LEAFLET_IMAGE_WIDTH = 21617;
export const LEAFLET_IMAGE_HEIGHT = 16785;

export const LEAFLET_Y_MAX = LEAFLET_IMAGE_HEIGHT / (LEAFLET_TILE_SIZE / 2);
export const LEAFLET_X_MAX = LEAFLET_IMAGE_WIDTH / (LEAFLET_TILE_SIZE / 2);

export const LEAFLET_DEFAULT_CENTER = {
  xCoordinate: LEAFLET_X_MAX / 2,
  yCoordinate: LEAFLET_Y_MAX / 2,
};

export const LEAFLET_BOUNDS = [
  [0, 0],
  [LEAFLET_Y_MAX, LEAFLET_X_MAX],
] as [[number, number], [number, number]];
