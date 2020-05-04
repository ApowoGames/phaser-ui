import Factory from './gameobjects/text/bbcodetext/Factory';
import Creator from './gameobjects/text/bbcodetext/Creator';
import BBCodeText from './gameobjects/text/bbcodetext/BBCodeText';
import SetValue from './utils/object/SetValue';

class BBCodeTextPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexBBCodeText', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.BBCodeText', BBCodeText);

export default BBCodeTextPlugin;