declare namespace phaserui {
    /**
     * BaseMediator
     */
    class BaseMediator {
        protected mParam: any;

        protected mShow: boolean;

        mUIType: any;

        protected mView: any;

        type: any;

        updateViewPos(): void;

        tweenExpand(show: boolean): void;

        getView(): any;

        hide(): void;

        isSceneUI(): boolean;

        isShow(): boolean;

        resize(width: number, height: number): void;

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

        setFollow(gameObject: any, froscene: Phaser.Scene, posFunc: Function): void;

        updatePos(): void;

        setInteractive(shape?: Phaser.Types.Input.InputConfiguration | any, callback?: Phaser.Types.Input.HitAreaCallback, dropZone?: boolean): any;

        disInteractive(): void;

        addListen(): void;

        removeListen(): void;

        playSound(config: any): void;

        /**
         * {key:string,field:phaserui.Interface.Sound.SoundField,soundConfig:Phaser.Types.sound.soundConfig}
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
    class Base extends phaserui.Container {
        constructor(scene: Phaser.Scene, x?: number, y?: number, minWidth?: number, minHeight?: number, config?: any);

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

    /**
     * BBCodeText
     */
    class BBCodeText extends phaserui.Text {
        constructor(scene: Phaser.Scene, x?: number, y?: number, text?: string, style?: any);

    }

    /**
     * Text
     */
    class Text extends Phaser.GameObjects.GameObject implements Phaser.GameObjects.Components.Origin {
        constructor(scene: Phaser.Scene, x: number, y: number, text: string, style: any, type: string, parser: phaserui.parser);

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

    /**
     * Button
     */
    class Button extends phaserui.IButtonState {
        constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: phaserui.ISoundGroup, dpr?: number, scale?: number, nineConfig?: any);

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

        protected mText: Phaser.GameObjects.Text;

        protected mBackground: Phaser.GameObjects.Image | phaserui.NineSlicePatch;

        background: Phaser.GameObjects.Image;

        text: Phaser.GameObjects.Text;

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

        buttonStateChange(state: phaserui.ButtonState): void;

        onPointerMoveHandler(pointer: Phaser.Input.Pointer): void;

        onPointerUpHandler(pointer: Phaser.Input.Pointer): void;

        onPointerDownHandler(pointer: Phaser.Input.Pointer): void;

    }

    /**
     * NineSliceButton
     */
    class NineSliceButton extends phaserui.BaseUI {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame: string, text?: string, dpr?: number, scale?: number, config?: any, music?: any, data?: any);

        protected mLabel: Phaser.GameObjects.Text;

        addListen(): void;

        removeListen(): void;

        enable: boolean;

        getBtnData(): any;

        setText(text: string): void;

        getText(): string;

        setTextStyle(style: any): void;

        setFontStyle(val: string): void;

        setTextOffset(x: number, y: number): void;

        setFrame(frame: string | number): void;

        destroy(): void;

        setFrameNormal(normal: string, down?: string, over?: string): void;

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

        addListen(): void;

        removeListen(): void;

        itemData: any;

        destroy: any;

        selected: boolean;

        setInteractive: boolean;

        overHandler(): void;

        selectHandler(): void;

        outHandler(): void;

    }

    /**
     * ComboBox
     */
    class ComboBox extends phaserui.BaseUI {
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
    class GameGridTable extends Phaser.Events.EventEmitter {
        constructor(scene: Phaser.Scene, config?: any);

        adjustScrollMode(mode: any): void;

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

        resetMask(x?: number, y?: number, width?: number, height?: number): void;

        layout(): void;

        refreshPos(x: number, y: number, conx?: number, cony?: number): void;

        destroy(): void;

        cellTapHandler(cell: any): void;

    }

    namespace GridTableConfig {
        var x: number;

        var y: number;

        var type: string;

        var scrollMode: number;

        var background: any;

        var table: any;

        var slider: any;

        var scroller: any;

        var clamplChildOY: boolean;

        var header: any;

        var footer: any;

        var child: any;

        var space: any;

        var expand: any;

        var align: any;

        var createCellContainerCallback: Function;

        var items: any[];

        var name: string;

    }

    namespace GridTableCoreConfig {
        var width: number;

        var height: number;

        var scrollMode: number;

        var cellWidth: number;

        var cellHeight: number;

        var cellsCount: number;

        var columns: number;

        var interactive: boolean;

        var reuseCellContainer: boolean;

        var tableOX: number;

        var tableOY: number;

        var cellVisibleCallback: Function;

        var cellVisibleCallbackScope: number[];

        var cellInvisibleCallback: Function;

        var cellInvisibleCallbackScope: number[];

        var cellOriginX: number;

        var cellOriginY: number;

        var cellPadX: number;

        var cellPadY: number;

        var zoom: number;

        var dpr: number;

        var clampTableOY: boolean;

        var mask: any;

    }

    namespace SliderConfig {
        var background: any;

        var track: any;

        var thumb: any;

        var input: Phaser.Input.InputPlugin;

    }

    namespace ScrollerableConfig {
        var threshold: number;

        var slidingDeceleration: number;

        var backDeceleration: number;

    }

    /**
     * InputText
     */
    class InputText extends Phaser.GameObjects.DOMElement {
        constructor(scene: Phaser.Scene, x: any, y?: number, width?: number, height?: number, config?: any);

        resize(width: number, height: number): phaserui.InputText;

        text: any;

        setText(value: string): any;

        selectText(): phaserui.InputText;

        placeholder: any;

        setPlaceholder(value: any): phaserui.InputText;

        tooltip: any;

        setTooltip(value: any): phaserui.InputText;

        setTextChangedCallback(callback: Function): phaserui.InputText;

        readOnly: any;

        setReadOnly(value: boolean): phaserui.InputText;

        spellCheck: any;

        setSpellCheck(value: any): phaserui.InputText;

        setStyle(key?: any, value?: any): phaserui.InputText;

        getStyle(key: string): any;

        scrollToBottom(): phaserui.InputText;

        setEnabled(enabled: boolean): phaserui.InputText;

        setBlur(): phaserui.InputText;

        setFocus(): phaserui.InputText;

    }

    const ElementProperties: any;

    const StyleProperties: any;

    const ElementEvents: any;

    namespace IAbstractInteractiveObject {
        var selected: boolean;

        var enabled: boolean;

    }

    namespace IAbstractItem {
        var index: number;

    }

    namespace IAbstractUI {
        var id: number;

        var UIType: phaserui.UIType;

    }

    namespace ISetInteractive {
        function setInteractive(): void;

        function disInteractive(): void;

    }

    namespace ISound {
        var soundMap: any;

        function playSound(config: Phaser.Sound.BaseSound): void;

        function startPlay(config: Phaser.Sound.BaseSound): void;

        function stopSound(): void;

        function pauseSound(): void;

        function resumeSound(): void;

        function setSilent(boo: boolean): void;

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

    namespace IButtonState {
        function changeNormal(): void;

        function changeDown(): void;

    }

    namespace IComboboxConfig {
        var wid: number;

        var hei: number;

        var resKey: string;

        var resPng: string;

        var resJson: string;

        var resBg: string;

        var resArrow: string;

        var fontStyle: any;

        var up: boolean;

        var clickCallBack: Function;

        var boxMusic: any;

        var itemMusic: any;

    }

    enum ClickEvent {
        Click,
        Up,
        Down,
        Hold,
        Tap,
        Move,
        Over,
        Out,
        DragStart,
        DragStop,
    }

    enum InputTextEvent {
        Change,
        Click,
        DBClick,
        Focus,
        Blur,
    }

    namespace INinePatchConfig {
        var x: number;

        var y: number;

        var width: number;

        var height: number;

        var key: string;

        var frame: string;

        var config: any;

    }

    namespace IAbstractPanel {
        function isShow(): boolean;

        function setFollow(gameObject: any, fromScene: Phaser.Scene, callBack?: Function): void;

        function tweenExpand(show: boolean): void;

        function resize(wid?: number, hei?: number): void;

        function show(param?: any): void;

        function update(param: any): void;

        function hide(): void;

        function destroy(): void;

    }

    enum AlignType {
        center,
        left,
        right,
    }

    namespace ScrollerConfig {
    }

    enum SoundField {
        Background,
        Element,
        Effect,
    }

    namespace ISoundConfig {
        var key: string;

        var field: phaserui.SoundField;

        var soundConfig: Phaser.Types.Sound.SoundConfig;

    }

    namespace ISoundGroup {
        var open: phaserui.ISoundConfig;

        var close: phaserui.ISoundConfig;

        var click: phaserui.ISoundConfig;

        var down: phaserui.ISoundConfig;

        var up: phaserui.ISoundConfig;

        var move: phaserui.ISoundConfig;

        var disabled: phaserui.ISoundConfig;

        var progress: phaserui.ISoundConfig;

        var expand: phaserui.ISoundConfig;

    }

    class MessageBox extends phaserui.Panel {
    }

    /**
     * NinePatch
     */
    class NinePatch extends Phaser.GameObjects.RenderTexture {
        constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number, key?: string, baseFrame?: string, columns?: number, rows?: number, config?: any);

    }

    /**
     * NineSlicePatch
     */
    class NineSlicePatch extends phaserui.BaseUI {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, frame?: string, config?: any, dpr?: number, scale?: number);

        resize(width: number, height: number): void;

        getConfig(): any;

        setConfig(config: any): void;

        setTexture(key: string, frame: string): void;

        setFrame(frame: string): void;

        setSize(width: number, height: number): any;

        setTint(tint: any): void;

        setTintFill(tint: any): void;

        tintFill: any;

        static isTinted: any;

        clearTine(): void;

        createPatches(): void;

        drawPatches(): void;

        createPatchFrame(patch: string, x: number, y: number, width: number, height: number): void;

        getPatchNameByIndex(index: number): void;

        calculScale(num0: number, num1: number): number;

        normalizePatchesConfig(config: any): any;

    }

    /**
     * Panel
     */
    class Panel extends phaserui.BaseUI {
        constructor(scene: Phaser.Scene, world: any, music?: any);

        protected mPanelTween: Phaser.Tweens.Tween;

        protected mResources: Map<string, any>;

        protected mReloadTimes: Map<string, any>;

        protected mShowData: any;

        id: number;

        UIType: phaserui.UIType;

        protected mPreLoad: boolean;

        protected mTweening: boolean;

        protected mTweenBoo: boolean;

        protected mMute: boolean;

        protected mEnabled: boolean;

        protected mWorld: any;

        protected soundGroup: phaserui.ISoundGroup;

        addListen(): void;

        removeListen(): void;

        setFollow(gameObject: any, froscene: any, posFunc: any): void;

        isShow(): boolean;

        hide(): void;

        destroy(): void;

        resize(wid: number, hei: number): void;

        show(param?: any): void;

        update(param: any): void;

        tweenExpand(tweenBoo: boolean): void;

        setTween(boo: boolean): void;

        showData: any;

        interactive: any;

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
    }

    /**
     * ProgressBar
     */
    class ProgressBar extends phaserui.BaseUI {
        constructor(scene: Phaser.Scene, config?: any);

        setProgress(curVal: number, maxVal: number): void;

        setText(val: string): void;

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
    class GameScroller extends phaserui.BaseUI {
        constructor(scene: Phaser.Scene, config: any, gameObject?: Phaser.GameObjects.Container);

        protected soundGroup: phaserui.ISoundGroup;

        view: any;

        setEnable(enable: boolean): void;

        setValue(value: number): void;

        getValue(): number;

        adjustBackDeceleration(deceler: number): void;

        adjustSlidingDeceleration(deceler: number): void;

        adjustScrollMode(mode: number): void;

        adjustDragThreshol(hold: number): void;

        updateScrollPos(pos: number): void;

        refreshMask(): void;

        addItem(item: Phaser.GameObjects.GameObject): void;

        addItemAt(item: Phaser.GameObjects.GameObject, index: number): void;

        getItemList(): Phaser.GameObjects.GameObject[];

        setBounds(value0: number, value1: number): void;

        /**
         * 
         * @param align  Default 2.
         */
        setAlign(align?: number): void;

        Sort(isFixed?: boolean): void;

        getScrollBound(): void;

        clearItems(): void;

        bounds: any;

        removeInteractiveObject(obj: any): void;

        left: any;

        right: any;

        top: any;

        bottom: any;

        setInteractiveObject(obj: any): void;

        clearInteractiveObject(): void;

        checkPointerInBounds(gameObject: any, pointer: Phaser.Input.Pointer, isCell: boolean): boolean;

    }

    enum BaseScrollerEvent {
        downinBound,
        downoutBound,
        upinBound,
        upoutBound,
    }

    /**
     * BaseScroller
     */
    class BaseScroller extends phaserui.BaseUI {
        constructor(scene: Phaser.Scene, config: any, gameObject?: Phaser.GameObjects.Container);

        protected soundGroup: phaserui.ISoundGroup;

        setEnable(enable: boolean): void;

        setValue(value: number): void;

        adjustBackDeceleration(deceler: number): void;

        adjustSlidingDeceleration(deceler: number): void;

        adjustScrollMode(mode: number): void;

        adjustDragThreshol(hold: number): void;

        setBounds(value0: number, value1: number): void;

        bounds: any;

        resize(width: number, height: number, value0: number, value1: number): void;

        clearInteractiveObject(): void;

        setInteractiveObject(obj: any): void;

        removeInteractiveObject(obj: any): void;

        left: any;

        right: any;

        top: any;

        bottom: any;

        boundPad0: any;

        boundPad1: any;

        refreshBound(refreshSize?: number): void;

        checkPointerInBounds(gameObject: any, pointer: Phaser.Input.Pointer, isCell: boolean): boolean;

    }

    /**
     * Sizer
     */
    class Sizer extends phaserui.Base {
        constructor(scene: Phaser.Scene, x?: number, y?: number, minWidth?: number, minHeight?: number, orientation?: number, config?: any);

        destroy(fromScene?: any): void;

        setOrientation(orientation: any): any;

        add(gameObject: any, proportion: any, align: any, paddingConfig: any, expand: any, childKey: any): any;

        addSpace(proportion: any): any;

        insert(index: number, gameObject: any, proportion: any, align: any, paddingConfig: any, expand: any): any;

        remove(gameObject: any): any;

        clear(destroyChild: any): any;

        childrenProportion: any;

    }

    /**
     * GameSlider
     */
    class GameSlider extends phaserui.Slider {
        constructor(scene: Phaser.Scene, config: any);

        setEnable(enable: boolean): any;

        setGap(gap: any): any;

        setValue(value: number, min: number, max: number): any;

        addValue(inc: number, min: number, max: number): any;

        getValue(min: number, max: number): number;

        layout(parent: any, newWidth: number, newHeight: number): any;

    }

    class Slider extends phaserui.Sizer {
        constructor(scene: Phaser.Scene, config: any);

    }

    /**
     * NinePatchTabButton
     */
    class NinePatchTabButton extends phaserui.TabButton {
        constructor(scene: Phaser.Scene, width: number, height: number, key: string, normalFrame: string, downFrame?: string, text?: string, configlist?: any, dpr?: number, scale?: number, data?: any);

        protected mKey: string;

        protected btnData: any;

        protected mBackground: phaserui.NineSlicePatch;

        setSize(width: number, height: number): any;

        getBtnData(): any;

        enable: boolean;

        createBackground(): void;

        setBgFrame(frame: string): void;

    }

    /**
     * TabButton
     */
    class TabButton extends phaserui.Button {
        constructor(scene: Phaser.Scene, key: string, frame?: string, downFrame?: string, text?: string, music?: phaserui.ISoundGroup, dpr?: number, scale?: number, nineConfig?: any);

        selected: any;

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
    class TextArea extends phaserui.Scrollable {
        constructor(scene: Phaser.Scene, config?: any);

        setText(text: string): any;

        appendText(text: string): any;

    }

    /**
     * Scrollable
     */
    class Scrollable extends phaserui.Sizer {
        constructor(scene: Phaser.Scene, config?: any);

        layout(parent?: any, newWidth?: number, newHeight?: number): any;

        scrollToTop(): any;

        scrollToBottom(): any;

        setSliderEnable(enabled: boolean): any;

        setScrollerEnable(enabled: boolean): any;

    }

}

declare namespace phaserui.basesizer {
    function AddChildrenMap(key: any, gameObject: any): any;

}

declare namespace phaserui.text {
    function setStyle(style: any): any;

}

declare namespace FramesSkin {
    /**
     * 切换多帧对象frame
     */
    function changeFrame(frameState: any): void;

}

declare namespace phaserui.CoreUI {
    enum MouseEvent {
    }

}

declare namespace phaserui.gameScroller {
    function onScrollValueChange(value: number): void;

}

declare namespace phaserui.Tool {
    function checkPointerContains(gameObject: any, pointer: Phaser.Input.Pointer): boolean;

    function getTransfrom(config: any): any;

    function getPos(transform: any): void;

    function checkNinePatch(align: any): boolean;

}

declare namespace phaserui.Utils {
    function GetParentSizer(gameObject: any): any;

    function GetTopmostSizer(gameObject: any): any;

}

declare module 'phaserui' {
    export = phaserui;

}

