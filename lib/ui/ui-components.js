"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const RoundRectangle_js_1 = __importDefault(require("./roundrectangle/RoundRectangle.js"));
const BBCodeText_js_1 = __importDefault(require("./bbcodetext/BBCodeText.js"));
const TagText_js_1 = __importDefault(require("./tagtext/TagText.js"));
const Container_js_1 = __importDefault(require("./container/Container.js"));
const Canvas_js_1 = __importDefault(require("./canvas/Canvas.js"));
const NineSlicePatch_1 = __importDefault(require("./ninepatch/NineSlicePatch"));
const Sizer_js_1 = __importDefault(require("./sizer/Sizer.js"));
const GridSizer_js_1 = __importDefault(require("./gridsizer/GridSizer.js"));
const Label_js_1 = __importDefault(require("./label/Label.js"));
const Buttons_js_1 = __importDefault(require("./buttons/Buttons.js"));
const Slider_js_1 = __importDefault(require("./slider/Slider.js"));
const GridTable_js_1 = __importDefault(require("./gridtable/GridTable.js"));
const Menu_js_1 = __importDefault(require("./menu/Menu.js"));
const TextBox_1 = __importDefault(require("./textBox/TextBox"));
const TextBlock_js_1 = __importDefault(require("./textblock/TextBlock.js"));
const TextArea_js_1 = __importDefault(require("./textarea/TextArea.js"));
const ScrollableBlock_js_1 = __importDefault(require("./scrollableblock/ScrollableBlock.js"));
const ScrollablePanel_js_1 = __importDefault(require("./scrollablepanel/ScrollablePanel.js"));
const InputText_1 = __importDefault(require("../plugins/gameobjects/inputtext/InputText"));
const Tap_js_1 = __importDefault(require("./tap/Tap.js"));
const Press_js_1 = __importDefault(require("./press/Press.js"));
const Rotate_js_1 = __importDefault(require("./rotate/Rotate.js"));
const Flip_js_1 = __importDefault(require("./flip/Flip.js"));
const GetParentSizer_js_1 = __importDefault(require("./utils/GetParentSizer.js"));
const GetTopmostSizer_js_1 = __importDefault(require("./utils/GetTopmostSizer.js"));
const IsPointerInBounds_js_1 = __importDefault(require("../plugins/utils/input/IsPointerInBounds.js"));
const Hide_js_1 = require("./utils/Hide.js");
const Edit_js_1 = __importDefault(require("../plugins/behaviors/textedit/Edit.js"));
const WaitEvent_js_1 = require("./utils/WaitEvent.js");
const BaseUI_js_1 = __importDefault(require("./baseUI/BaseUI.js"));
const Button_js_1 = require("./button/Button.js");
const NineSliceButton_js_1 = __importDefault(require("./button/NineSliceButton.js"));
const Combobox_js_1 = require("./combobox/Combobox.js");
const GameGridTable_js_1 = __importDefault(require("./gridtable/GameGridTable.js"));
const NinePatchSkin_js_1 = require("./interface/ninepatch/NinePatchSkin.js");
const MessageBox_js_1 = __importDefault(require("./messageBox/MessageBox.js"));
const NinePatch_js_1 = __importDefault(require("./ninepatch/NinePatch.js"));
const Panel_js_1 = __importDefault(require("./panel/Panel.js"));
const ProgressBar_js_1 = require("./progressbar/ProgressBar.js");
const GameScroller_js_1 = __importDefault(require("./scroller/GameScroller.js"));
const Scroller_js_1 = __importDefault(require("./scroller/Scroller.js"));
const NinePatchTabButton_js_1 = __importDefault(require("./tab/NinePatchTabButton.js"));
const TabButton_js_1 = __importDefault(require("./tab/TabButton.js"));
const SetText_js_1 = __importDefault(require("../ui/textarea/SetText.js"));
const AppendText_js_1 = __importDefault(require("../ui/textarea/AppendText.js"));
const UIType_js_1 = __importDefault(require("../ui/interface/baseUI/UIType.js"));
const GameSlider_1 = __importDefault(require("../ui/slider/GameSlider"));
const BaseMediator_1 = __importDefault(require("../ui/baseUI/BaseMediator"));
const CheckBox_1 = __importDefault(require("../ui/checkbox/CheckBox"));
const Tool_1 = require("../ui/tool/Tool");
const Patches_config_1 = require("../ui/interface/baseUI/Patches.config");
const ClickEvent_1 = __importDefault(require("../ui/interface/event/ClickEvent"));
const ISoundConfig_1 = require("../ui/interface/sound/ISoundConfig");
const SoundField_1 = __importDefault(require("../ui/interface/sound/SoundField"));
const BaseImage_1 = __importDefault(require("../ui/baseUI/BaseImage"));
module.exports = {
    BaseImage: BaseImage_1.default,
    SoundField: SoundField_1.default,
    ISoundConfig: ISoundConfig_1.ISoundConfig,
    AppendText: AppendText_js_1.default,
    SetText: SetText_js_1.default,
    ClickEvent: ClickEvent_1.default,
    Patches_config: Patches_config_1.Patches_config,
    Tool: Tool_1.Tool,
    UIType: UIType_js_1.default,
    BaseMediator: BaseMediator_1.default,
    CheckBox: CheckBox_1.default,
    InputText: InputText_1.default,
    RoundRectangle: RoundRectangle_js_1.default,
    BBCodeText: BBCodeText_js_1.default,
    TagText: TagText_js_1.default,
    Container: Container_js_1.default,
    Canvas: Canvas_js_1.default,
    NineSlicePatch: NineSlicePatch_1.default,
    Sizer: Sizer_js_1.default,
    GridSizer: GridSizer_js_1.default,
    BaseUI: BaseUI_js_1.default,
    Button: Button_js_1.Button,
    NineSliceButton: NineSliceButton_js_1.default,
    ComboBox: Combobox_js_1.ComboBox,
    GameGridTable: GameGridTable_js_1.default,
    NinePatchSkin: NinePatchSkin_js_1.NinePatchSkin,
    MessageBox: MessageBox_js_1.default,
    NinePatch: NinePatch_js_1.default,
    Panel: Panel_js_1.default,
    ProgressBar: ProgressBar_js_1.ProgressBar,
    GameScroller: GameScroller_js_1.default,
    BaseScroller: Scroller_js_1.default,
    NinePatchTabButton: NinePatchTabButton_js_1.default,
    TabButton: TabButton_js_1.default,
    Label: Label_js_1.default,
    Buttons: Buttons_js_1.default,
    Slider: Slider_js_1.default,
    GridTable: GridTable_js_1.default,
    Menu: Menu_js_1.default,
    TextBlock: TextBlock_js_1.default,
    TextArea: TextArea_js_1.default,
    ScrollableBlock: ScrollableBlock_js_1.default,
    ScrollablePanel: ScrollablePanel_js_1.default,
    Tap: Tap_js_1.default,
    Press: Press_js_1.default,
    Rotate: Rotate_js_1.default,
    Flip: Flip_js_1.default,
    GameSlider: GameSlider_1.default,
    GetParentSizer: GetParentSizer_js_1.default,
    GetTopmostSizer: GetTopmostSizer_js_1.default,
    IsPointerInBounds: IsPointerInBounds_js_1.default,
    Show: Hide_js_1.Show,
    Hide: Hide_js_1.Hide,
    IsShown: Hide_js_1.IsShown,
    Edit: Edit_js_1.default,
    WaitEvent: WaitEvent_js_1.WaitEvent,
    WaitComplete: WaitEvent_js_1.WaitComplete,
    TextBox: TextBox_1.default
};
