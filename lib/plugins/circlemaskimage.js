import Factory from './gameobjects/circlemaskimage/Factory.js';
import Creator from './gameobjects/circlemaskimage/Creator.js';
import CircleMaskImage from './gameobjects/circlemaskimage/CircleMaskImage.js';

Phaser.GameObjects.GameObjectFactory.register('TooqingCircleMaskImage', Factory);
Phaser.GameObjects.GameObjectCreator.register('TooqingCircleMaskImage', Creator);

export default CircleMaskImage;