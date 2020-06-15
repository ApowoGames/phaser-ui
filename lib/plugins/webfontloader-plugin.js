import LoaderCallback from './loader/webfontloader/WebFontLoaderCallback.js';

class WebFontLoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('TooqingWebFont', LoaderCallback);
    }

    addToScene(scene) {
        scene.sys.load['TooqingWebFont'] = LoaderCallback;
    }
}

export default WebFontLoaderPlugin;