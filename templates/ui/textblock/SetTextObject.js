import GetBoundsConfig from '../utils/GetBoundsConfig.js';
import IsTextGameObject from '../../../plugins/utils/text/IsTextGameObject.js';
import DefaultMask from '../../../plugins/utils/mask/DefaultMask.js';

const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

var SetTextObject = function (gameObject, paddingConfig, maskEnable) {
    if (maskEnable === undefined) {
        maskEnable = true;
    }

    this.add(gameObject);
    if (paddingConfig === undefined) {
        paddingConfig = 0;
    }

    var config = this.getSizerConfig(gameObject);
    config.parent = this;
    config.align = ALIGN_LEFTTOP;
    config.padding = GetBoundsConfig(paddingConfig);
    config.expand = true;
    this.textObject = gameObject;
    this.textObjectType = (IsTextGameObject(gameObject)) ? 0 : 1;
    // Add more variables
    config.preOffsetY = 0;
    config.offsetY = 0;

    // Create mask of text object
    if (maskEnable) {
        this.textMask = new DefaultMask(this.textObject);
        this.textObject.setMask(this.textMask.createGeometryMask());
        this.add(this.textMask);
    }
    return this;
}

export default SetTextObject;