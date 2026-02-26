import * as migration_20260226_150009 from './20260226_150009';

export const migrations = [
  {
    up: migration_20260226_150009.up,
    down: migration_20260226_150009.down,
    name: '20260226_150009'
  },
];
