import Factory from './gameobjects/canvas/Factory.js';
import Creator from './gameobjects/canvas/Creator.js';
import Canvas from './gameobjects/canvas/Canvas.js';
import SetValue from './utils/object/SetValue.js';

class CanvasPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('TooqingCanvas', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'TooqingPlugins.GameObjects.Canvas', Canvas);

export default CanvasPlugin;