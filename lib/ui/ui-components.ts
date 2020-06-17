import "tooqinggamephaser";
import RoundRectangle from "./roundrectangle/RoundRectangle.js";
import BBCodeText from "./bbcodetext/BBCodeText.js";
import TagText from "./tagtext/TagText.js";
import Container from "./container/Container.js";
import Canvas from "./canvas/Canvas.js";
import Sizer from "./sizer/Sizer.js";
import GridSizer from "./gridsizer/GridSizer.js";

import Label from "./label/Label.js";
import Buttons from "./buttons/Buttons.js";
import Slider from "./slider/Slider.js";
import GridTable from "./gridtable/GridTable.js";
import Menu from "./menu/Menu.js";
import TextBlock from "./textblock/TextBlock.js";
import TextArea from "./textarea/TextArea.js";
import ScrollableBlock from "./scrollableblock/ScrollableBlock.js";
import ScrollablePanel from "./scrollablepanel/ScrollablePanel.js";

import Tap from "./tap/Tap.js";
import Press from "./press/Press.js";
import Rotate from "./rotate/Rotate.js";
import Flip from "./flip/Flip.js";

import GetParentSizer from "./utils/GetParentSizer.js";
import GetTopmostSizer from "./utils/GetTopmostSizer.js";
import IsPointerInBounds from "../plugins/utils/input/IsPointerInBounds.js";
import { Show, Hide, IsShown } from "./utils/Hide.js";
import Edit from "../plugins/behaviors/textedit/Edit.js";
import { WaitEvent, WaitComplete } from "./utils/WaitEvent.js";
import { BaseUI } from "./baseUI/BaseUI.js";
import { BaseMediator } from "./baseUI/BaseMediator.js";
import { Button } from "./button/Button.js";
import { NineSliceButton } from "./button/NineSliceButton.js";
import { ComboBox } from "./combobox/Combobox.js";
import { GameGridTable } from "./gridtable/GameGridTable.js";
import { NinePatchSkin } from "./interface/ninepatch/NinePatchSkin.js";
import { MessageBox } from "./messageBox/MessageBox.js";
import { NinePatch } from "./ninepatch/NinePatch.js";
import { NineSlicePatch } from "./ninepatch/NineSlicePatch.js";
import { Panel } from "./panel/Panel.js";
import { ProgressBar } from "./progressbar/ProgressBar.js";
import { GameScroller } from "./scroller/GameScroller.js";
import { BaseScroller } from "./scroller/Scroller.js";
import { NinePatchTabButton } from "./tab/NinePatchTabButton.js";
import { TabButton } from "./tab/TabButton.js";
/**
 * @namespace tooqingui
 */
const tooqingui = {
  RoundRectangle,
  BBCodeText,
  TagText,
  Container,
  Canvas,
  Sizer,
  GridSizer,
  BaseUI,
  BaseMediator,
  Button,
  NineSliceButton,
  ComboBox,
  GameGridTable,
  NinePatchSkin,
  MessageBox,
  NinePatch,
  NineSlicePatch,
  Panel,
  ProgressBar,
  GameScroller,
  BaseScroller,
  NinePatchTabButton,
  TabButton,


  Label,
  Buttons,
  Slider,
  GridTable,
  Menu,
  TextBlock,
  TextArea,
  ScrollableBlock,
  ScrollablePanel,
  Tap,
  Press,
  Rotate,
  Flip,
  GetParentSizer,
  GetTopmostSizer,
  IsPointerInBounds,
  Show,
  Hide,
  IsShown,
  Edit,
  WaitEvent,
  WaitComplete,
}
module.exports = tooqingui;
