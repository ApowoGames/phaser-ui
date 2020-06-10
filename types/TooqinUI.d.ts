declare namespace TooqinUI.BaseMediator {
    /**
     * BaseMediator
     */
    class BaseMediator {
    }

    var mShow: boolean;

    var mUIType: any;

    var UIType: any;

    function updateViewPos(): void;

    function tweenExpand(show: boolean): void;

    function getView(): void;

    function hide(): void;

    function isSceneUI(): boolean;

    function isShow(): boolean;

    function resize(width: number, height: number): void;

    function show(param: any): void;

    function update(param: any): void;

    function setParam(param: any): void;

    function getParam(): any;

    function destroy(): void;

}

declare namespace TooqinUI.BaseUI {
    /**
     * BaseUI
     */
    class BaseUI {
        constructor(scene: Phaser.Scene, dpr: number, scale: number);

        protected silent: boolean;

        protected mInitialized: boolean;

        protected interactiveBoo: boolean;

        protected mShow: boolean;

        protected dpr: number;

        protected scale: number;

        soundMap: Map<string, Phaser.Sound.BaseSound>;

        setFollow(gameObject: any, froscene: Phaser.Scene, posFunc: Function): void;

        updatePos(): void;

        setInteractive(shape: any, callback: Phaser.Types.Input.HitAreaCallback, dropZone: boolean): void;

        disInteractive(): void;

        addListen(): void;

        removeListen(): void;

        playSound(config: any): void;

        /**
         * {key:string,field:TooqinUI.Interface.Sound.SoundField,soundConfig:Phaser.Types.sound.soundConfig}
         */
        startPlay(config: any): void;

        stopSound(): void;

        pauseSound(): void;

        resumeSound(): void;

        setSilent(boo: boolean): void;

        checkPointerDelection(pointer: Phaser.Input.Pointer): void;

    }

    function destroy(): void;

}

declare namespace TooqinUI.BaseSizer {
    function AddChildrenMap(key: any, gameObject: any): void;

    /**
     * Base
     */
    class Base {
        constructor(scene: Phaser.Scene, x: number, y: number, minWidth: number, minHeight: number, config: any);

        destroy(fromScene: boolean): void;

        setMinSize(minWidth: number, minHeight: number): void;

        setMinWidth(minWidth: number): void;

        setMinHeight(minHeight: number): void;

        left: any;

        alignLeft(value: number): void;

        right: any;

        alignRight(value: number): void;

        centerX: any;

        alignCenterX(value: number): void;

        top: any;

        alignTop(value: number): void;

        bottom: any;

        alignBottom(value: number): void;

        centerY: any;

        alignCenterY(value: number): void;

        pin(gameObject: any): void;

        addBackground(gameObject: any, childKey: any): void;

    }

    function DrawBounds(graphics: Phaser.GameObjects.Graphics, config: any): void;

    function DefaultCreateTextCallback(scene: Phaser.Scene, child: any, childBoundsRect: Phaser.Geom.Rectangle): Phaser.GameObjects.Text;

    function FadeMethods(duration: number, alpha: number): void;

    function fadeInPromoise(duration: number, alpha: number): Promise<any>;

    function fadeOutDestroy(duration: number, destroyMode: any): void;

    function fadeOutDestroyPromise(duration: number, destroyMode: any): Promise<any>;

    function fadeOut(duration: number): void;

    function fadeOutPromise(duration: number): Promise<any>;

    function GetAllChildrenSizers(out: any[]): any[];

    function GetChildrenHeight(): number;

    function GetChildrenSizers(out: any[]): any[];

    function GetChildrenWidth(): number;

    function GetElement(mapNameList: string[]): any;

    function GetElementByName(children: any, name: string): any;

    function TestName(gameObject: any, name: string): any;

    function IsInTouching(gameObject: any, pointer: Phaser.Input.Pointer): boolean;

    function Layout(parent: any, newWidth: number, newHeight: number): any;

    function LayoutBackgrounds(): void;

    function PostLayout(parent: any, newWidth: number, newHeight: number): void;

    function PreLayout(parent: any): void;

    function PushIntoBounds(bounds: Phaser.Geom.Rectangle): void;

    function popUp(duration: number, orientation: number, ease: any): void;

    function popUpPromise(duration: number, orientation: number, ease: any): Promise<any>;

    function scaleDownDestroy(duration: number, orientation: number, ease: any, destroyMode: any): void;

    function scaleDownDestroyPromise(duration: number, orientation: number, ease: any, destroyMode: any): Promise<any>;

    function scaleDown(duration: number, orientation: number, ease: any): void;

    function scaleDownPromise(duration: number, orientation: number, ease: any): Promise<any>;

    function SetAnchor(config: any): void;

    function SetDraggable(senser: any, draggable: boolean): void;

    function onDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number): void;

}

declare namespace Base {
    var isRexSizer: boolean;

    var rexSizer: any;

    var backgroundChildren: any;

    var childrenWidth: number;

    var childrenHeight: number;

    var left: number;

    var right: number;

    var centerX: number;

    var top: number;

    var bottom: number;

    var centerY: number;

}

declare namespace TooqinUI.BBCodeText {
    function BBCodeText(scene: Phaser.Scene, x: number, y: number, text: Phaser.GameObjects.Text, style: any): any;

}

declare namespace TooqinUI.Button {
    enum ButtonState {
    }

    /**
     * Button
     */
    class Button {
        constructor(scene: Phaser.Scene, key: string, frame: string, downFrame: string, text: string);

    }

    var mDownTime: number;

    var mPressDelay: number;

    var mIsMove: boolean;

    /**
     * {width:number,height:number,configList:IPatchesConfig[](top:number,left?:number,right?:number,bottom?:number)}
     */
    var ninePatchConfig: any;

    var mKey: string;

    var mFrame: string;

    var mDownFrame: string;

    var background: Phaser.GameObjects.Image;

    var text: Phaser.GameObjects.Text;

    function addListen(): void;

    function removeListen(): void;

    function mute(boo: boolean): void;

    function changeNormal(): void;

    function changeDown(): void;

    function setFrame(frame: string | number): void;

    function setText(val: string): void;

    function setTextStyle(style: any): void;

    function setFontStyle(val: string): void;

    function setTextOffset(x: number, y: number): void;

    function setTextColor(color: string): void;

    function createBackground(): void;

    function setBgFrame(frame: string | number): void;

    function buttonStateChange(state: TooqinUI.Button.ButtonState): void;

    function onPointerMoveHandler(pointer: Phaser.Input.Pointer): void;

    function onPointerUpHandler(pointer: Phaser.Input.Pointer): void;

    function onPointerDownHandler(pointer: Phaser.Input.Pointer): void;

}

declare namespace TooqinUI.NineSliceButton {
    /**
     * NineSliceButton
     */
    class NineSliceButton {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame: string, text: string, dpr: number, scale: number, config: any, music: any, data: any);

    }

    var mLabel: Phaser.GameObjects.Text;

    function addListen(): void;

    function removeListen(): void;

    function getBtnData(): any;

    function setText(text: string): void;

    function getText(): string;

    function setTextStyle(style: any): void;

    function setFontStyle(val: string): void;

    function setTextOffset(x: number, y: number): void;

    function setFrame(frame: string | number): void;

    function destroy(): void;

    function setFrameNormal(normal: string, down: string, over: string): void;

    function changeNormal(): void;

    function changeDown(): void;

    function changeOver(): void;

    function isExists(frame: string): void;

    function onPointerDown(pointer: Phaser.Input.Pointer): void;

    function onPointerUp(pointer: Phaser.Input.Pointer): void;

    var label: any;

    function initFrame(): void;

}

declare namespace TooqinUI.SelectCallItem {
    /**
     * SelectCallItem
     */
    class SelectCallItem {
        /**
         * 
         * @param selectCallUI {selectCall(data:ISelectCallItemdata)} {IselectCallItemdata(text:string,data:any,index:number)}
         */
        constructor(scene: Phaser.Scene, selectCallUI: any, wid: number, hei: number, music: any);

    }

    var mSelectCallUI: any;

    var soundGroup: any;

    var text: Phaser.GameObjects.Text;

    var mSelectBG: Phaser.GameObjects.Graphics;

    function setInteractive(): void;

    function addListen(): void;

    function removeListen(): void;

    var itemData: any;

    var destroy: any;

    var selected: boolean;

    function overHandler(): void;

    function selectHandler(): void;

    function outHandler(): void;

}

declare namespace TooqinUI.ComboBox {
    /**
     * ComboBox
     */
    class ComboBox {
        constructor(scene: Phaser.Scene, config: any);

    }

    var itemList: any;

    function selectCall(itemData: any): void;

    function addListen(): void;

    function removeListen(): void;

    function destroy(): void;

    function init(): void;

    function onLoadCompleteHandler(): void;

    function openHandler(): void;

    function showTween(open: boolean): void;

    function showTweenItem(open: boolean): void;

    function createTexture(): Phaser.GameObjects.Graphics;

}

declare namespace TooqinUI.GameGridTable {
    /**
     * GameGridTable
     */
    class GameGridTable {
        /**
         * 
         * @param config (GridTableConfig,GridTableCoreConfig)
         */
        constructor(scene: Phaser.Scene, config: any);

    }

    /**
     * 调整gridtable遮照范围
     */
    function adjustMask(width: number, height: number, x: number, y: number): void;

    var gridTable: any;

    var childrenMap: any;

    var table: any;

    /**
     * Only worked when scrollMode is 0
     */
    function adjustCellHeight(hei: number): void;

    /**
     * Only worked when scrollMode is 1
     */
    function adjusetCellWidth(wid: number): void;

    var items: any;

    function setItems(items: any): void;

    function setColumnCount(cnt: number): void;

    function getCells(): any;

    function getCell(cellIdx: number): any;

    function setT(value: number): void;

    function addListen(): void;

    function removeListen(): void;

    var x: number;

    var y: number;

    function refresh(): void;

    function layout(): void;

    function refreshPos(x: number, y: number, conx: number, cony: number): void;

    function destroy(): void;

    function cellTapHandler(cell: any): void;

}

declare namespace FramesSkin {
    /**
     * 切换多帧对象frame
     */
    function changeFrame(frameState: any): void;

}

declare type InputTextEvent = string;

declare namespace TooqinUI {
    enum InputTextEvent {
        Change,
        Click,
        DBClick,
        Focus,
        Blur,
    }

    enum SoundField {
        Background,
        Element,
        Effect,
    }

    var NineSlicePatch: any;

    enum ProgressBarEvent {
    }

}

declare namespace TooqinUI.CoreUI {
    enum MouseEvent {
    }

}

declare type SoundField = string;

declare class MessageBox {
}

declare namespace TooqinUI.NinePatch {
    /**
     * NineSlicePatch
     */
    class NineSlicePatch {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number);

    }

}

declare namespace Panel {
    /**
     * 是否正在加载中，加载中的ui不走show流程
     */
    var mPreLoad: any;

}

declare namespace GameScroller {
    /**
     * 是否在移动中
     */
    var mMoveing: any;

    /**
     * 
     * @param align 2 居左 1居中 0居右 默认居左 Default 2.
     */
    function setAlign(align: any): void;

}

declare namespace TooqinUI.Utils {
    function GetParentSizer(gameObject: any): any;

    function GetTopmostSizer(gameObject: any): any;

}

declare module 'tooqinUI' {
    export = TooqinUI;

}

