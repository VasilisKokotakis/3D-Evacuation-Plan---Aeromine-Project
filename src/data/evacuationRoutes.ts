export const LOCATIONS: Record<string, [number, number, number]> = {
  'OTE Building': [-40,   1,  25],
  'Building 2':   [-43,   1,  18],
  'Building 3':   [ -7,   1, -30],
  'Building 4':   [ 15,   1, -15],
  'Building 5':   [-29.8, 1,  14],
  'Building 6':   [-15,   1,  20],
  'Building 7':   [  0,   1,  25],
  'Building 8':   [ 18.5, 1,  12],
  'Building 9':   [  1,   1,   2],
  'Building 10':  [ 15,   1, -15],
};

export interface EvacuationRoute {
  id: string;
  start: string;
  safeSpot: string;
  waypoints: string[];
  color: string;
}

export const ROUTES: EvacuationRoute[] = [
  {
    id: 'ote-to-oaka-1',
    start: 'OTE Building',
    safeSpot: 'Building 4',
    waypoints: ['OTE Building', 'Building 2', 'Building 3', 'Building 4'],
    color: 'yellow',
  },
  {
    id: 'ote-to-oaka-2',
    start: 'OTE Building',
    safeSpot: 'Building 10',
    waypoints: ['OTE Building', 'Building 5', 'Building 6', 'Building 7', 'Building 8', 'Building 9', 'Building 10'],
    color: 'lime',
  },
];
