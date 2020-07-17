"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
// import 'phaser'; FATAL: Unable to load template: window is not defined 无法加载
const Parser_1 = require("./Parser");
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
    fs.writeFileSync(path.join(opts.destination, 'phaserui.d.ts'), out);
}
exports.publish = publish;
;
