declare namespace apowophaserui {
    /**
     * BaseMediator
     */
    class BaseMediator {
        protected mView: apowophaserui.Panel;

        mParam: any;

        protected mShow: boolean;

        protected mUIType: number;

        UIType: number;

        updateViewPos(): void;

        tweenExpand(show: boolean): void;

        getView(): apowophaserui.Panel;

        hide(): void;

        isSceneUI(): boolean;

        isShow(): boolean;

        resize(width?: number, height?: number): void;

        show(param?: any): void;

        update(param?: any): void;

        setParam(param: any): void;

        getParam(): any;

        destroy(): void;

    }

    /**
     * BaseUI
     */
    class BaseUI extends Phaser.GameObjects.Container {
        constructor(scene: Phaser.Scene, dpr?: number, scale?: number);

        protected silent: boolean;

        protected mInitialized: boolean;

        protected interactiveBoo: boolean;

        protected mShow: boolean;

        protected dpr: number;

        soundMap: Map<string, Phaser.Sound.BaseSound>;

        protected mTween: Phaser.Tweens.Tween;

        setFollow(gameObject: any, froscene: Phaser.Scene, posFunc: Function): void;

        updatePos(): void;

        setInteractive(shape?: Phaser.Types.Input.InputConfiguration | any, callback?: Phaser.Types.Input.HitAreaCallback, dropZone?: boolean): any;

        disInteractive(): void;

        addListen(): void;

        removeListen(): void;

        playSound(config: any): void;

        /**
         * {key:string,field:apowophaserui.Interface.Sound.SoundField,soundConfig:Phaser.Types.sound.soundConfig}
         */
        startPlay(config: any): void;

        stopSound(): void;

        pauseSound(): void;

        resumeSound(): void;

        setSilent(boo: boolean): void;

        destroy(): void;

        checkPointerDelection(pointer: Phaser.Input.Pointer): void;

    }

    /**
     * Base
     */
    class Base extends apowophaserui.Container {
        constructor(scene: Phaser.Scene, x?: number, y?: number, minWidth?: number, minHeight?: number, config?: any);

        static AddChildrenMap(key: any, gameObject: any): any;

        childrenMap: any;

        destroy(fromScene?: any): void;

        setMinSize(minWidth: number, minHeight: number): any;

        setMinWidth(minWidth: number): any;

        setMinHeight(minHeight: number): any;

        childrenWidth: any;

        childrenHeight: any;

        left: any;

        alignLeft(value: any): any;

        right: any;

        alignRight(value: any): any;

        centerX: any;

        alignCenterX(value: any): any;

        top: any;

        alignTop(value: any): any;

        bottom: any;

        alignBottom(value: any): any;

        centerY: any;

        alignCenterY(value: any): any;

        pin(gameObject: any): any;

        addBackground(gameObject: any, childKey: any): any;

        static GetElement(mapNameList: string[]): any;

        static GetElementByName(children: any, name: string): any;

        static TestName(gameObject: any, name: string): any;

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

    /**
     * BBCodeText
     */
    class BBCodeText extends apowophaserui.Text {
        constructor(scene: Phaser.Scene, x?: number, y?: number, text?: string, style?: any);

    }

    /**
     * Text
     */
    class Text extends Phaser.GameObjects.GameObject implements Phaser.GameObjects.Components.Origin {
        constructor(scene: Phaser.Scene, x: number, y: number, text: string, style: any, type: string, parser: apowophaserui.parser);

        displayWidth: number;

        displayHeight: number;

        width: number;

        height: number;

        x: number;

        y: number;

        originX: number;

        originY: number;

        displayOriginX: number;

        displayOriginY: number;

        text: any;

        setText(value: string): any;

        setFont(font: any): any;

        setFontFamily(family: any): any;

        setFontSize(size: number): any;

        setFontStyle(style: any): any;

        setFixedSize(width: number, height: number): any;

        setBackgroundColor(color: any): any;

        setFill(color: any): any;

        setColor(color: any): any;

        setStroke(color: any, thickness: number): any;

        setShadow(x: number, y: number, color: any, blur: any, shadowStroke: any, shadowFill: any): any;

        setShadowOffset(x: number, y: number): any;

        setShadowColor(color: any): any;

        setShadowBlur(blur: any): any;

        setShadowStroke(enabled: boolean): any;

        setShadowFill(enabled: false): any;

        setWrapMode(mode: any): any;

        setWrapWidth(width: number): any;

        setAlign(align: any): any;

        getText(text: string, start: number, end: number): string;

        setSize(width: number, height: number): any;

        resize(width: number, height: number): any;

        addImage(key: any, config: any): any;

        drawAreaBounds(graphics: any, color: any): any;

        setOrigin(x?: number, y?: number): any;

        setOriginFromFrame(): any;

        setDisplayOrigin(x: number, y: number): any;

        updateDisplayOrigin(): any;

    }

    class parser {
        splitText(text: string, mode: any): any[];

        tagTextToProp(text: string, prevProp: any): any;

    }

    enum ButtonState {
        Normal,
        Over,
        Select,
        Disable,
    }

    interface NinePatchConfig {
        width?: number;
        height?: number;
        configlist?: any;
    }

    interface ButtonConfig {
        key?: string;
        normalFrame?: string;
        downFrame?: string;
        text?: string;
        music?: apowophaserui.ISoundGroup;
        dpr?: number;
        scale?: number;
        nineConfig?: apowophaserui.NinePatchConfig;
        data?: any;
    }

    /**
     * Button
     */
    class Button extends apowophaserui.BaseUI {
        constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: any, dpr?: number, scale?: number, nineConfig?: any, tweenBoo?: boolean);

        protected mDownTime: number;

        protected mPressDelay: number;

        protected mIsMove: boolean;

        protected dpr: number;

        protected zoom: number;

        /**
         * {width:number,height:number,configList:IPatchesConfig[](top:number,left?:number,right?:number,bottom?:number)}
         */
        protected ninePatchConfig: any;

        protected mKey: string;

        protected mFrame: string;

        protected mDownFrame: string;

        protected mText: Phaser.GameObjects.Text;

        protected mBackground: Phaser.GameObjects.Image | apowophaserui.NineSlicePatch;

        tweenScale: number;

        background: Phaser.GameObjects.Image;

        text: Phaser.GameObjects.Text;

        addListen(): void;

        removeListen(): void;

        enable: boolean;

        tweenEnable: boolean;

        mute(boo: boolean): void;

        changeNormal(): void;

        changeDown(): void;

        setFrame(frame: string | number): void;

        setText(val: string): void;

        setTextStyle(style: any): void;

        setFontStyle(val: string): void;

        setTextOffset(x: number, y: number): void;

        setTextColor(color: string): void;

        setFrameNormal(color: string, down?: string, over?: string): void;

        protected createBackground(): void;

        protected setBgFrame(frame: string): void;

        protected buttonStateChange(state: number): void;

        protected onPointerMoveHandler(pointer?: Phaser.Input.Pointer): void;

        protected onPointerUpHandler(pointer?: Phaser.Input.Pointer): void;

        protected onPointerOutHandler(pointer: Phaser.Input.Pointer): void;

        protected onPointerDownHandler(pointer?: Phaser.Input.Pointer): void;

        protected onPointerDcheckPointerInBoundsownHandler(gameObject: any, pointerx: number, pointery: number): boolean;

        protected tween(show: boolean): void;

        protected tweenComplete(show: boolean): void;

    }

    /**
     * NineSliceButton
     */
    class NineSliceButton extends apowophaserui.Button {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame: string, text?: string, dpr?: number, scale?: number, config?: any, music?: any, data?: any);

        enable: boolean;

        getBtnData(): any;

        createBackground(): void;

        isExists(frame: string): void;

        initFrame(): void;

    }

    /**
     * CheckBox
     */
    class CheckBox extends apowophaserui.Button {
        constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: any, dpr?: number, scale?: number, nineConfig?: any);

        mSelected: boolean;

        selected: boolean;

        destroy(): void;

    }

    /**
     * SelectCallItem
     */
    class SelectCallItem extends apowophaserui.BaseUI {
        /**
         * 
         * @param selectCallUI {selectCall(data:ISelectCallItemdata)} {IselectCallItemdata(text:string,data:any,index:number)}
         */
        constructor(scene: Phaser.Scene, selectCallUI: any, wid: number, hei: number, music: any);

        protected mSelectCallUI: any;

        protected soundGroup: any;

        protected text: Phaser.GameObjects.Text;

        protected mSelectBG: Phaser.GameObjects.Graphics;

        addListen(): void;

        removeListen(): void;

        itemData: any;

        destroy: any;

        selected: boolean;

        interactive: boolean;

        overHandler(): void;

        selectHandler(): void;

        outHandler(): void;

    }

    /**
     * ComboBox
     */
    class ComboBox extends apowophaserui.BaseUI {
        constructor(scene: Phaser.Scene, config: any);

        itemList: any[];

        selectCall(itemData: any): void;

        addListen(): void;

        removeListen(): void;

        text: string[];

        destroy(): void;

        init(): void;

        onLoadCompleteHandler(): void;

        openHandler(): void;

        showTween(open: boolean): void;

        showTweenItem(open: boolean): void;

        createTexture(): Phaser.GameObjects.Graphics;

    }

    /**
     * Container
     */
    class Container extends Phaser.GameObjects.Zone {
        constructor(scene: Phaser.Scene, x?: number, y?: number, minWidth?: number, minHeight?: number, children?: any);

    }

    /**
     * GameGridTable
     */
    class GameGridTable extends Phaser.GameObjects.Container {
        constructor(scene: Phaser.Scene, config?: any);

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

        refresh(): void;

        resetMask(x?: number, y?: number, width?: number, height?: number): void;

        layout(): void;

        refreshPos(x: number, y: number, conx?: number, cony?: number): void;

        setSize(width: number, height: number): any;

        destroy(): void;

        cellTapHandler(cell: any): void;

        cellOutHandler(table: any, index: number): void;

        cellOverHandler(table: any, index: number): void;

        cellDownHandler(table: any, index: number): void;

    }

    /**
     * config.table.interacitve boolean||object{cellclick,celltap,cellover,cellpress,cellswipe}
     */
    class GridTable extends apowophaserui.Scrollable {
        constructor(scene: Phaser.Scene, config: any);

    }

    interface GridTableConfig {
        x?: number;
        y?: number;
        type?: string;
        scrollMode?: number;
        background?: any;
        table?: any;
        slider?: any;
        scroller?: any;
        clamplChildOY?: boolean;
        header?: any;
        footer?: any;
        child?: any;
        space?: any;
        expand?: any;
        align?: any;
        createCellContainerCallback?: Function;
        items?: any;
        name?: string;
    }

    interface GridTableCoreConfig {
        width?: number;
        height?: number;
        scrollMode?: number;
        cellWidth?: number;
        cellHeight?: number;
        cellsCount?: number;
        columns?: number;
        interactive?: boolean;
        reuseCellContainer?: boolean;
        tableOX?: number;
        tableOY?: number;
        cellVisibleCallback?: Function;
        cellVisibleCallbackScope?: any;
        cellInvisibleCallback?: Function;
        cellInvisibleCallbackScope?: any;
        cellOriginX?: number;
        cellOriginY?: number;
        cellPadX?: number;
        cellPadY?: number;
        zoom?: number;
        dpr?: number;
        clampTableOY?: boolean;
        mask?: any;
    }

    interface SliderConfig {
        background?: any;
        track?: any;
        thumb?: any;
        input?: Phaser.Input.InputPlugin;
    }

    interface ScrollerableConfig {
        threshold?: number;
        slidingDeceleration?: number;
        backDeceleration?: number;
    }

    interface IAbstractInteractiveObject {
        selected?: boolean;
        enabled?: boolean;
    }

    interface IAbstractItem extends apowophaserui.IAbstractInteractiveObject{
        index?: number;
    }

    interface IAbstractUI {
        id?: number;
        UIType?: apowophaserui.UIType;
    }

    interface ISetInteractive {
        setInteractive(): void;
        disInteractive(): void;
    }

    interface ISound {
        soundMap: any;
        playSound(config: Phaser.Sound.BaseSound): void;
        startPlay(config: Phaser.Sound.BaseSound): void;
        stopSound(): void;
        pauseSound(): void;
        resumeSound(): void;
        setSilent(boo: boolean): void;
    }

    interface IPatchesConfig {
        top: number;
        left?: number;
        right?: number;
        bottom?: number;
    }

    /**
     * Patches_config
     */
    class Patches_config {
        static normalizePatchesConfig(config: any): any;

        static resetPatchesConfig(config: any): any;

    }

    enum UIType {
        None,
        Scene,
        Normal,
        Pop,
        Tips,
        Monopoly,
        Activity,
    }

    interface IComboboxConfig {
        wid?: number;
        hei?: number;
        resKey?: string;
        resPng?: string;
        resJson?: string;
        resBg?: string;
        resArrow?: string;
        fontStyle?: any;
        up?: boolean;
        clickCallBack?: Function;
        boxMusic?: any;
        itemMusic?: any;
    }

    /**
     * ClickEvent
     */
    class ClickEvent {
        static Click: string;

        static Tap: string;

        static Up: string;

        static Down: string;

        static Over: string;

        static Out: string;

        static Hold: string;

        static Move: string;

        static DragStart: string;

        static DragStop: string;

        static Selected: string;

    }

    enum InputTextEvent {
        Change,
        Click,
        DBClick,
        Focus,
        Blur,
    }

    interface INinePatchConfig {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        key?: string;
        frame?: string;
        config?: any;
    }

    interface IAbstractPanel extends apowophaserui.IAbstractUI{
        isShow(): boolean;
        setFollow(gameObject: any, fromScene: Phaser.Scene, callBack?: Function): void;
        tweenExpand(show: boolean): void;
        resize(wid?: number, hei?: number): void;
        show(param?: any): void;
        update(param: any): void;
        hide(): void;
        destroy(): void;
    }

    enum AlignType {
        center,
        left,
        right,
    }

    interface ISoundConfig {
        key: string;
        field: number;
        soundConfig: Phaser.Types.Sound.SoundConfig;
    }

    interface ISoundGroup {
        open: apowophaserui.ISoundConfig;
        close: apowophaserui.ISoundConfig;
        click: apowophaserui.ISoundConfig;
        down: apowophaserui.ISoundConfig;
        up: apowophaserui.ISoundConfig;
        move: apowophaserui.ISoundConfig;
        disabled: apowophaserui.ISoundConfig;
        progress: apowophaserui.ISoundConfig;
        expand: apowophaserui.ISoundConfig;
    }

    enum SoundField {
        Background,
        Element,
        Effect,
    }

    class MessageBox extends apowophaserui.Panel {
        constructor(scene: Phaser.Scene, world: any, config?: any);

        show(config: any): void;

        preload(): void;

        setText(str: string): void;

        setTitle(str: string): void;

        setbtnNum(btnNum: number): void;

        addResources(key: string, resource: any): void;

        init(): void;

        onOkHandler(): void;

        onCancelHandler(): void;

    }

    /**
     * NinePatch
     */
    class NinePatch extends Phaser.GameObjects.RenderTexture {
        constructor(scene: Phaser.Scene, x?: any, y?: number, width?: number, height?: number, key?: string, baseFrame?: string, columns?: number, rows?: number, config?: any);

    }

    class NineSlicePatch extends apowophaserui.BaseUI {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame: string, config?: any, dpr?: number, scale?: number, correct?: number);

        resize(width: number, height: number): void;

        correctValue: number;

        getConfig(): any;

        setTexture(key: string, frame?: string): any;

        setFrame(frame: string): any;

        setSize(width: number, height: number): any;

        setTint(tint: number): any;

        setTintFill(tint: number): any;

        tintFill: boolean;

        tint: number;

        isTinted: any;

        clearTint(): void;

        destroy(): void;

        protected createPatches(): void;

        protected drawPatches(): void;

        protected createPatchFrame(patch: string, x: number, y: number, width: number, height: number): void;

        protected getPatchNameByIndex(index: number): string;

    }

    /**
     * Panel
     */
    class Panel extends apowophaserui.BaseUI {
        constructor(scene: Phaser.Scene, world: any, music?: any);

        protected mTweening: boolean;

        protected mTweenBoo: boolean;

        protected mResources: Map<string, any>;

        protected mReLoadResources: Map<string, any>;

        protected mShowData: any;

        id: number;

        UIType: apowophaserui.UIType;

        protected mPreLoad: boolean;

        protected mReloadTimes: number;

        protected mMute: boolean;

        protected mEnabled: boolean;

        protected mWorld: any;

        protected soundGroup: apowophaserui.ISoundGroup;

        addListen(): void;

        removeListen(): void;

        setFollow(gameObject: any, froscene: any, posFunc: any): void;

        isShow(): boolean;

        hide(): void;

        destroy(): void;

        resize(wid?: number, hei?: number): void;

        show(param?: any): void;

        update(param?: any): void;

        updateUIState(activeUI?: any): void;

        tweenExpand(tweenBoo: boolean): void;

        setTween(boo: boolean): void;

        showData: any;

        interactive: boolean;

        protected showTween(show: boolean): void;

        protected tweenComplete(show: boolean): void;

        protected init(): void;

        protected addAtlas(key: string, texture: string, data: any): void;

        protected addImage(key: string, value: any): void;

        protected preload(): void;

        protected loadComplete(loader: any, totalComplete: any, totalFailed: any): void;

        protected loadError(file: any): void;

        protected onFileKeyComplete(key: string): void;

        protected addResources(key: string, resource: any): void;

        protected reload(): void;

        protected startLoad(): void;

        protected offLoad(): void;

        protected sceneClick(pointer: Phaser.Input.Pointer): void;

        protected uiClick(pointer: Phaser.Input.Pointer): void;

    }

    enum ProgressBarEvent {
        tweenStart,
        tweenComplete,
        tweenUpdate,
    }

    /**
     * ProgressBar
     */
    class ProgressBar extends apowophaserui.BaseUI {
        constructor(scene: Phaser.Scene, config?: any);

        setProgress(curVal: number, maxVal: number): void;

        setText(val: string): void;

        text: Phaser.GameObjects.Text;

        bar: Phaser.GameObjects.Image;

        destory(): void;

    }

    /**
     * RoundRectangle
     */
    class RoundRectangle extends Phaser.GameObjects.Shape {
        constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, radiusConfig?: any, fillColor?: any, fillAlpha?: number);

    }

    enum ScrollerEvent {
        downinBound,
        downoutBound,
        upinBound,
        upoutBound,
    }

    /**
     * GameScroller
     */
    class GameScroller extends apowophaserui.BaseUI {
        constructor(scene: Phaser.Scene, config: any, gameObject?: Phaser.GameObjects.Container);

        view: Phaser.GameObjects.Container;

        setEnable(enable: boolean): void;

        setValue(value: number): void;

        getValue(): number;

        adjustBackDeceleration(deceler: number): void;

        adjustSlidingDeceleration(deceler: number): void;

        adjustScrollMode(mode: number): void;

        adjustDragThreshol(hold: number): void;

        updateScrollPos(pos: number): void;

        setParent(parent: Phaser.GameObjects.Container): void;

        resetSize(width: number, height: number): void;

        refreshMask(): void;

        addItem(item: Phaser.GameObjects.GameObject): void;

        addItems(items: Phaser.GameObjects.GameObject[]): void;

        addItemAt(item: Phaser.GameObjects.GameObject, index: number): void;

        getItemList(): Phaser.GameObjects.GameObject[];

        getItemAt(index: number): Phaser.GameObjects.GameObject;

        setBounds(value0: number, value1: number): void;

        /**
         * 
         * @param align 2 居左 1居中 0居右 默认居左 Default 2.
         */
        setAlign(align?: number): void;

        Sort(isFixed?: boolean, iscallValue?: boolean): void;

        getScrollBound(): number;

        clearItems(destroy: boolean): void;

        bounds: any;

        removeInteractiveObject(obj: any): void;

        addListen(): void;

        removeListen(): void;

        left: number;

        right: number;

        top: number;

        bottom: number;

        setInteractiveObject(obj: any): void;

        destroy(): void;

    }

    var isSliding: any;

    var dragSpeed: any;

    enum BaseScrollerEvent {
        downinBound,
        downoutBound,
        upinBound,
        upoutBound,
    }

    /**
     * BaseScroller
     */
    class BaseScroller extends apowophaserui.BaseUI {
        constructor(scene: Phaser.Scene, gameObject: any, config: any);

        soundGroup: apowophaserui.ISoundGroup;

        setEnable(enable: boolean): void;

        setValue(value: number): void;

        adjustBackDeceleration(deceler: number): void;

        adjustSlidingDeceleration(deceler: number): void;

        adjustScrollMode(mode: number): void;

        adjustDragThreshol(hold: number): void;

        setBounds(value0: number, value1: number): void;

        bounds: any;

        resize(width?: number, height?: number, value0?: number, value1?: any): void;

        clearInteractiveObject(): void;

        setInteractiveObject(obj: any): void;

        removeInteractiveObject(obj: any): void;

        addListen(): void;

        removeListen(): void;

        left: number;

        right: number;

        top: number;

        bottom: number;

        boundPad0: number;

        boundPad1: number;

        destroy(): void;

        refreshBound(refreshSize?: number): void;

    }

    /**
     * Sizer
     */
    class Sizer extends apowophaserui.Base {
        constructor(scene: Phaser.Scene, x?: number, y?: number, minWidth?: number, minHeight?: number, orientation?: number, config?: any);

        destroy(fromScene?: any): void;

        setOrientation(orientation: any): any;

        add(gameObject: any, proportion?: any, align?: any, paddingConfig?: any, expand?: any, childKey?: any): any;

        addSpace(proportion?: any): any;

        insert(index: number, gameObject: any, proportion?: any, align?: any, paddingConfig?: any, expand?: any): any;

        remove(gameObject: any): any;

        clear(destroyChild: any): any;

        childrenProportion: any;

    }

    /**
     * GameSlider
     */
    class GameSlider extends apowophaserui.Slider {
        constructor(scene: Phaser.Scene, config: any);

        slider: any;

        setEnable(enable: boolean): void;

        setGap(gap: number): void;

        setValue(value: number, min?: number, max?: number): void;

        addValue(inc: number, min?: number, max?: number): void;

        getValue(min: number, max?: number): number;

        layout(parent: any, newWidth: number, newHeight: number): void;

    }

    class Slider extends apowophaserui.Sizer {
        constructor(scene: Phaser.Scene, config: any);

    }

    /**
     * NinePatchTabButton
     */
    class NinePatchTabButton extends apowophaserui.TabButton {
        constructor(scene: Phaser.Scene, width: number, height: number, key: string, normalFrame: string, downFrame?: string, text?: string, configlist?: any, dpr?: number, scale?: number, data?: any);

        protected mKey: string;

        protected btnData: any;

        protected mBackground: apowophaserui.NineSlicePatch;

        changeNormal(): void;

        changeDown(): void;

        setSize(width?: number, height?: number): any;

        getBtnData(): any;

        enable: boolean;

        createBackground(): void;

        setBgFrame(frame: string): void;

    }

    /**
     * TabButton
     */
    class TabButton extends apowophaserui.Button {
        constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: any, dpr?: number, scale?: number, nineConfig?: any);

        mSelected: boolean;

        selected: any;

        destroy(): void;

        onPointerUpHandler(pointer: Phaser.Input.Pointer): void;

        protected onPointerOutHandler(pointer: Phaser.Input.Pointer): void;

    }

    /**
     * TextBox
     */
    class TextBox extends Phaser.Events.EventEmitter {
        constructor(scene: Phaser.Scene, config?: any);

    }

    /**
     * TextArea
     */
    class TextArea extends apowophaserui.Scrollable {
        constructor(scene: Phaser.Scene, config?: any);

        appendText(text: string): any;

        setText(text: string): any;

        text: any;

        linesCount: any;

    }

    /**
     * Tool
     */
    class Tool {
        static checkPointerContains(gameObject: any, pointer: Phaser.Input.Pointer): boolean;

        static getTransfrom(config: any): any;

        static getPos(transform: any): void;

        static checkNinePatch(align: any): boolean;

    }

    /**
     * Scrollable
     */
    class Scrollable extends apowophaserui.Sizer {
        constructor(scene: Phaser.Scene, config?: any);

        layout(parent?: any, newWidth?: number, newHeight?: number): any;

        scrollToTop(): any;

        scrollToBottom(): any;

        setSliderEnable(enabled: boolean): any;

        setScrollerEnable(enabled: boolean): any;

    }

    /**
     * InputText
     */
    class InputText extends Phaser.GameObjects.DOMElement {
        constructor(scene: Phaser.Scene, x: any, y?: number, width?: number, height?: number, config?: any);

        text: any;

        setText(value: string): any;

        selectText(): apowophaserui.InputText;

        placeholder: any;

        setPlaceholder(value: any): apowophaserui.InputText;

        tooltip: any;

        setTooltip(value: any): apowophaserui.InputText;

        setTextChangedCallback(callback: Function): apowophaserui.InputText;

        readOnly: any;

        setReadOnly(value: boolean): apowophaserui.InputText;

        spellCheck: any;

        setSpellCheck(value: any): apowophaserui.InputText;

        setStyle(key?: any, value?: any): apowophaserui.InputText;

        getStyle(key: string): any;

        scrollToBottom(): apowophaserui.InputText;

        setEnabled(enabled: boolean): apowophaserui.InputText;

        setBlur(): apowophaserui.InputText;

        setFocus(): apowophaserui.InputText;

        resize(width: number, height: number): any;

    }

}

declare namespace apowophaserui.text {
    function setStyle(style: any): any;

}

declare namespace apowophaserui.utils {
    class GetSizerConfig {
        constructor(gameObject: any);

    }

}

declare namespace apowophaserui.Utils {
    function GetTopmostSizer(gameObject: any): any;

}

export = apowophaserui;

