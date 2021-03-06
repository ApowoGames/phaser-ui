import Factory from './gameobjects/shape/roundrectangle/Factory.js';
import Creator from './gameobjects/shape/roundrectangle/Creator.js';
import RoundRectangle from './gameobjects/shape/roundrectangle/RoundRectangle.js';

Phaser.GameObjects.GameObjectFactory.register('TooqingRoundRectangle', Factory);
Phaser.GameObjects.GameObjectCreator.register('TooqingRoundRectangle', Creator);

export default RoundRectangle;