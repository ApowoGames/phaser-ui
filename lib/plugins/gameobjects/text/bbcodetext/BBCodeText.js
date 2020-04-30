import Text from '../textbase/Text'
import parser from './Parser';

class BBCodeText extends Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'rexBBCodeText', parser);
    }
}

export default BBCodeText;