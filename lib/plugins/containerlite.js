import Factory from './gameobjects/containerlite/Factory.js';
import Creator from './gameobjects/containerlite/Creator.js';
import ContainerLite from './gameobjects/containerlite/ContainerLite.js';

Phaser.GameObjects.GameObjectFactory.register('TooqingContainerLite', Factory);
Phaser.GameObjects.GameObjectCreator.register('TooqingContainerLite', Creator);

export default ContainerLite;