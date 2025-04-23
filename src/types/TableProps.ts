import { MouseEventHandler } from "react";
import Column from "./ColumnType";

type TableProps<T> = {
    data: T[],
    columns: Column<T>[];
    totalData: number;
    totalPages: number;
    changePageFather: (page: string)=>void;
    onChangeDataModel: (id: number | null, Model: T | null, isEdit?: boolean, isDelete?:boolean)=> MouseEventHandler<HTMLButtonElement>;
    onSearch: (search: string)=> void;
    onChangeItemsPage: (items: number)=>void;
}
export default TableProps;