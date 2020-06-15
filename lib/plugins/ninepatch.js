import Factory from './gameobjects/ninepatch/Factory.js';
import Creator from './gameobjects/ninepatch/Creator.js';
import NinePatch from './gameobjects/ninepatch/NinePatch.js';

Phaser.GameObjects.GameObjectFactory.register('TooqingNinePatch', Factory);
Phaser.GameObjects.GameObjectCreator.register('TooqingNinePatch', Creator);

export default NinePatch;