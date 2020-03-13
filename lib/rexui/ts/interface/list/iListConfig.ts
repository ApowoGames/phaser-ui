// import { Transform } from "../pos/transform";
// import { ISliderSkinData } from "./iSliderSkinData";

// export interface IListConfig {
//     transform: Transform;
    
//     slider?: ISliderSkinData;
//     back
// }
// // x: 0,
// // y: 0,
// // anchor: undefined,
// // width: undefined,
// // height: undefined,

// scrollMode: 0,

//     // Elements
//     background: backgroundGameObject,

//         table: {
//                width: undefined,
//                height: undefined,
//                cellWidth: undefined,
//                cellHeight: undefined,
//                columns: 2,
//                mask: {
//                    padding: 0
//               },
//               interactive: true,
//               reuseCellContainer: false,
//         },

//         slider: {
//               track: trackGameObject,
//               thumb: thumbGameObject,
//         },

//         scroller: {
//               threshold: 10,
//               slidingDeceleration: 5000,
//             backDeceleration: 2000,
//         },

//         clamplChildOY: false,

//         header: headerGameObject,
//         footer: footerGameObject,

//         space: {
//             left: 0,
//             right: 0,
//             top: 0,
//                 bottom: 0,

//                     table: 0,
//                         // table: {
//                         //    top: 0,
//                         //    bottom: 0,
//                         //    left: 0,
//                         //    right: 0,
//                         //},
//                         header: 0,
//                             footer: 0,
//     },

//     expand: {
//         header: true,
//         footer: true,
//     },

//     align: {
//         header: 'center',
//         footer: 'center',
//     },

//      createCellContainerCallback: function(cell, cellContainer) {
//     var scene = cell.scene,
//         width = cell.width,
//         height = cell.height,
//         item = cell.item,
//         index = cell.index;
//     if (cellContainer === null) { // No reusable cell container, create a new one
//         // cellContainer = scene.add.container();
//     }
//     // Set child properties of cell container ...
//     return cellContainer;
// },

// items: [],

//     // name: '',
//     // draggable: false