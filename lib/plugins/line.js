import Factory from './gameobjects/line/Factory.js';
import Creator from './gameobjects/line/Creator.js';
import Line from './gameobjects/line/Line.js';

Phaser.GameObjects.GameObjectFactory.register('TooqingLine', Factory);
Phaser.GameObjects.GameObjectCreator.register('TooqingLine', Creator);

export default Line;