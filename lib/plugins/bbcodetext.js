import Factory from './gameobjects/text/bbcodetext/Factory.js';
import Creator from './gameobjects/text/bbcodetext/Creator.js';
import BBCodeText from './gameobjects/text/bbcodetext/BBCodeText.js'

Phaser.GameObjects.GameObjectFactory.register('rexBBCodeText', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexBBCodeText', Creator);

export default BBCodeText;