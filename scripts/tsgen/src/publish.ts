import * as fs from 'fs-extra';
import * as path from 'path';
// import 'phaser'; FATAL: Unable to load template: window is not defined 无法加载
import { Parser } from './Parser';

export function publish(data: any, opts: any) {
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

    var out = new Parser(data().get()).emit();

    fs.writeFileSync(path.join(opts.destination, 'phaserui.d.ts'), out);
};
