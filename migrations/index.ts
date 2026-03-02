import * as migration_20260226_150009 from './20260226_150009';
import * as migration_20260302_142324 from './20260302_142324';
import * as migration_20260302_145038 from './20260302_145038';
import * as migration_20260302_184730 from './20260302_184730';
import * as migration_20260302_200557 from './20260302_200557';

export const migrations = [
  {
    up: migration_20260226_150009.up,
    down: migration_20260226_150009.down,
    name: '20260226_150009',
  },
  {
    up: migration_20260302_142324.up,
    down: migration_20260302_142324.down,
    name: '20260302_142324',
  },
  {
    up: migration_20260302_145038.up,
    down: migration_20260302_145038.down,
    name: '20260302_145038',
  },
  {
    up: migration_20260302_184730.up,
    down: migration_20260302_184730.down,
    name: '20260302_184730',
  },
  {
    up: migration_20260302_200557.up,
    down: migration_20260302_200557.down,
    name: '20260302_200557'
  },
];
