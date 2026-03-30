export const LOCATIONS: Record<string, [number, number, number]> = {
  'OTE Building':  [-40,   1,  25],
  'Road Point 1':  [-43,   1,  18],
  'Road Point 2':  [ -7,   1, -30],
  'OAKA':          [ 15,   1, -15],
  'two':           [-29.8, 1,  14],
  'three':         [-15,   1,  20],
  'four':          [  0,   1,  25],
  'five':          [ 18.5, 1,  12],
  'six':           [  1,   1,   2],
  'seven':         [ 15,   1, -15],
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
    safeSpot: 'OAKA',
    waypoints: ['OTE Building', 'Road Point 1', 'Road Point 2', 'OAKA'],
    color: 'yellow',
  },
  {
    id: 'ote-to-oaka-2',
    start: 'OTE Building',
    safeSpot: 'OAKA',
    waypoints: ['OTE Building', 'two', 'three', 'four', 'five', 'six', 'seven'],
    color: 'lime',
  },
];
