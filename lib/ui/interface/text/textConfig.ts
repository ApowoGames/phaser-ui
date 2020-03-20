export interface TextConfig {
    x: number;
    y: number;
    width: number;
    height: number;

    backgroundColor: string; // ['backgroundColor', null];

    // font
    fontFamily: string; // ['fontFamily', 'Courier'];
    fontSize: string; // ['fontSize', '16px'];
    fontStyle: string; // ['fontStyle', ''];
    color: string; // ['color', '#fff'];
    stroke: string; // ['stroke', '#fff'];
    strokeThickness: number; // ['strokeThickness', 0];
    shadow: {
        shadowOffsetX: number; // ['shadow.offsetX', 0],
        shadowOffsetY: number; // ['shadow.offsetY', 0],
        shadowColor: string; // ['shadow.color', '#000'],
        shadowBlur: number; // ['shadow.blur', 0],
        shadowStroke: boolean; // ['shadow.stroke', false],
        shadowFill: boolean; // ['shadow.fill', false],
    };
    // underline
    underlineColor: string; // ['underline.color', '#000'];
    underlineThickness: number; // ['underline.thickness', 0];
    underlineOffset: number; // ['underline.offset', 0];

    // align
    halign: number; // ['halign', 0];
    valign: number; // ['valign', 0];

    // size
    maxLines: number; // ['maxLines', 0];
    fixedWidth: number; // ['fixedWidth', 0];
    fixedHeight: number; // ['fixedHeight', 0];
    resolution: number; // ['resolution', 0];
    lineSpacing: number; // ['lineSpacing', 0];

    rtl: string; // ['rtl', false]; // 左到右，右到左
    baselineX: number; // ['baselineX', 1.2];
    baselineY: number; // ['baselineY', 1.4];

    // wrap
    wrapMode: number; // ['wrap.mode', 1];
    wrapWidth: number; // ['wrap.width', 0];
}
