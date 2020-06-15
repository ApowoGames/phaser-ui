"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
require("phaser");
const Parser_1 = require("../src/Parser");
function publish(data, opts) {
    // remove undocumented stuff.
    data({ undocumented: true }).remove();
    // remove package data
    data({ kind: 'package' }).remove();
    // remove header comments
    data({ copyright: { isString: true } }).remove();
    // remove private members
    data({ access: 'private' }).remove();
    // remove ignored doclets
    data({ ignore: true }).remove();
    if (!fs.existsSync(opts.destination)) {
        fs.mkdirSync(opts.destination);
    }
    var out = new Parser_1.Parser(data().get()).emit();
    fs.writeFileSync(path.join(opts.destination, 'tooqingui.d.ts'), out);
}
exports.publish = publish;
;
