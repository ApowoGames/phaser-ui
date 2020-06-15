import Factory from './gameobjects/gridtable/Factory.js';
import Creator from './gameobjects/gridtable/Creator.js';
import GridTable from './gameobjects/gridtable/GridTable.js';

Phaser.GameObjects.GameObjectFactory.register('TooqingGridTable', Factory);
Phaser.GameObjects.GameObjectCreator.register('TooqingGridTable', Creator);

export default GridTable;