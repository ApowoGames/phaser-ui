declare namespace tooqinui {
    /**
     * BaseMediator
     */
    class BaseMediator {
        protected mShow: boolean;

        mUIType: any;

        UIType: any;

        updateViewPos(): void;

        tweenExpand(show: boolean): void;

        getView(): void;

        hide(): void;

        isSceneUI(): boolean;

        isShow(): boolean;

        resize(width: number, height: number): void;

        show(param: any): void;

        update(param: any): void;

        setParam(param: any): void;

        getParam(): any;

        destroy(): void;

    }

    /**
     * BaseUI
     */
    class BaseUI {
        constructor(scene: Phaser.Scene, dpr: number, scale: number);


        destroy(): void;

    }

    function BBCodeText(scene: Phaser.Scene, x: number, y: number, text: Phaser.GameObjects.Text, style: any): any;

    enum ButtonState {
    }

    /**
     * Button
     */
    class Button {
        constructor(scene: Phaser.Scene, key: string, frame: string, downFrame: string, text: string);

        protected mDownTime: number;

        protected mPressDelay: number;

        protected mIsMove: boolean;

        /**
         * {width:number,height:number,configList:IPatchesConfig[](top:number,left?:number,right?:number,bottom?:number)}
         */
        protected ninePatchConfig: any;

        protected mKey: string;

        protected mFrame: string;

        protected mDownFrame: string;

        static background: Phaser.GameObjects.Image;

        static text: Phaser.GameObjects.Text;

        addListen(): void;

        removeListen(): void;

        mute(boo: boolean): void;

        changeNormal(): void;

        changeDown(): void;

        setFrame(frame: string | number): void;

        setText(val: string): void;

        setTextStyle(style: any): void;

        setFontStyle(val: string): void;

        setTextOffset(x: number, y: number): void;

        setTextColor(color: string): void;

        createBackground(): void;

        setBgFrame(frame: string | number): void;

        buttonStateChange(state: tooqinui.Button.ButtonState): void;

        onPointerMoveHandler(pointer: Phaser.Input.Pointer): void;

        onPointerUpHandler(pointer: Phaser.Input.Pointer): void;

        onPointerDownHandler(pointer: Phaser.Input.Pointer): void;

    }

    /**
     * NineSliceButton
     */
    class NineSliceButton {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame: string, text: string, dpr: number, scale: number, config: any, music: any, data: any);

        protected mLabel: Phaser.GameObjects.Text;

        addListen(): void;

        removeListen(): void;

        getBtnData(): any;

        setText(text: string): void;

        getText(): string;

        setTextStyle(style: any): void;

        setFontStyle(val: string): void;

        setTextOffset(x: number, y: number): void;

        setFrame(frame: string | number): void;

        destroy(): void;

        setFrameNormal(normal: string, down: string, over: string): void;

        changeNormal(): void;

        changeDown(): void;

        changeOver(): void;

        isExists(frame: string): void;

        onPointerDown(pointer: Phaser.Input.Pointer): void;

        onPointerUp(pointer: Phaser.Input.Pointer): void;

        label: any;

        initFrame(): void;

    }

    /**
     * SelectCallItem
     */
    class SelectCallItem {
        /**
         * 
         * @param selectCallUI {selectCall(data:ISelectCallItemdata)} {IselectCallItemdata(text:string,data:any,index:number)}
         */
        constructor(scene: Phaser.Scene, selectCallUI: any, wid: number, hei: number, music: any);

        protected mSelectCallUI: any;

        protected soundGroup: any;

        protected text: Phaser.GameObjects.Text;

        protected mSelectBG: Phaser.GameObjects.Graphics;

        setInteractive(): void;

        addListen(): void;

        removeListen(): void;

        itemData: any;

        destroy: any;

        selected: boolean;

        overHandler(): void;

        selectHandler(): void;

        outHandler(): void;

    }

    /**
     * ComboBox
     */
    class ComboBox {
        constructor(scene: Phaser.Scene, config: any);

        itemList: any;

        selectCall(itemData: any): void;

        addListen(): void;

        removeListen(): void;

        destroy(): void;

        init(): void;

        onLoadCompleteHandler(): void;

        openHandler(): void;

        showTween(open: boolean): void;

        showTweenItem(open: boolean): void;

        createTexture(): Phaser.GameObjects.Graphics;

    }

    /**
     * GameGridTable
     */
    class GameGridTable {
        /**
         * 
         * @param config (GridTableConfig,GridTableCoreConfig)
         */
        constructor(scene: Phaser.Scene, config: any);

        /**
         * 调整gridtable遮照范围
         */
        adjustMask(width: number, height: number, x: number, y: number): void;

        gridTable: any;

        childrenMap: any;

        table: any;

        /**
         * Only worked when scrollMode is 0
         */
        adjustCellHeight(hei: number): void;

        /**
         * Only worked when scrollMode is 1
         */
        adjusetCellWidth(wid: number): void;

        items: any;

        setItems(items: any): void;

        setColumnCount(cnt: number): void;

        getCells(): any;

        getCell(cellIdx: number): any;

        setT(value: number): void;

        addListen(): void;

        removeListen(): void;

        x: number;

        y: number;

        refresh(): void;

        layout(): void;

        refreshPos(x: number, y: number, conx: number, cony: number): void;

        destroy(): void;

        cellTapHandler(cell: any): void;

    }

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

    /**
     * NineSlicePatch
     */
    class NineSlicePatch {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number);

        resize(width: number, height: number): void;

        getConfig(): any;

        setConfig(config: any): void;

        setTexture(key: string, frame: string): void;

        setFrame(frame: string): void;

        setSize(width: number, height: number): void;

        setTint(tint: any): void;

        setTintFill(tint: any): void;

        tintFill: any;

        clearTine(): void;

        createPatches(): void;

        drawPatches(): void;

        createPatchFrame(patch: string, x: number, y: number, width: number, height: number): void;

        getPatchNameByIndex(index: number): void;

        calculScale(num0: number, num1: number): number;

    }

    enum ProgressBarEvent {
    }

}

declare namespace tooqinui.BaseSizer {
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

declare namespace FramesSkin {
    /**
     * 切换多帧对象frame
     */
    function changeFrame(frameState: any): void;

}

declare type InputTextEvent = string;

declare namespace tooqinui.CoreUI {
    enum MouseEvent {
    }

}

declare type SoundField = string;

declare class MessageBox {
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

declare namespace tooqinui.Utils {
    function GetParentSizer(gameObject: any): any;

    function GetTopmostSizer(gameObject: any): any;

}

declare module 'tooqinui' {
    export = tooqinui;

}

