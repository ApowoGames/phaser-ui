import Sizer from './Sizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../plugins/utils/object/SetValue.js';

ObjectFactory.register('sizer', function (x, y, minWidth, minHeight, orientation, config) {
    var gameObject = new Sizer(this.scene, x, y, minWidth, minHeight, orientation, config);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'TooqingPlugins.UI.Sizer', Sizer);

export default Sizer;