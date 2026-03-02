import * as migration_20260226_150009 from './20260226_150009';
import * as migration_20260302_142324 from './20260302_142324';

export const migrations = [
  {
    up: migration_20260226_150009.up,
    down: migration_20260226_150009.down,
    name: '20260226_150009',
  },
  {
    up: migration_20260302_142324.up,
    down: migration_20260302_142324.down,
    name: '20260302_142324'
  },
];
