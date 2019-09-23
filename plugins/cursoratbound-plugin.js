import CursorAtBound from './cursoratbound.js';

class CursorAtBoundPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new CursorAtBound(scene, config);
    }

}

export default CursorAtBoundPlugin;