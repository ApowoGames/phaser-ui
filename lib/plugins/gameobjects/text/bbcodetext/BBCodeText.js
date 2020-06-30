import Text from '../textbase/Text'
import parser from './parser';

class BBCodeText extends Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style, 'TooqingBBCodeText', parser);
    }
}

export default BBCodeText;