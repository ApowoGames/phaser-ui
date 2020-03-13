export interface ITableConfig {
    transform: Transform;
    cellWidth: number;
    cellHeight: number;
    columns: number;
    mask: {
        padding: number
    };
    interactive: boolean;
    reuseCellContainer: boolean; // 子对象是否重用
}