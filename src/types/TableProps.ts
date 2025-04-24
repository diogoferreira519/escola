import { MouseEventHandler } from "react";
import Column from "./ColumnType";

type TableProps<T> = {
    data: T[],
    columns: Column<T>[];
    totalData: number;
    totalPages: number;
    changePageFather: (page: string)=>void;
    onChangeDataModal: (id: number | null, Model?: T | null)=> void;
    onSearch: (search: string)=> void;
    onChangeItemsPage: (items: number)=>void;
    setAscColumn: (column: string, isAsc: boolean) => void;
}
export default TableProps;