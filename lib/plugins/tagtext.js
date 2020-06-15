import Factory from './gameobjects/text/tagtext/Factory.js';
import Creator from './gameobjects/text/tagtext/Creator.js';
import TagText from './gameobjects/text/tagtext/TagText.js';

Phaser.GameObjects.GameObjectFactory.register('TooqingTagText', Factory);
Phaser.GameObjects.GameObjectCreator.register('TooqingTagText', Creator);

export default TagText;