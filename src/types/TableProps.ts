import { MouseEventHandler } from "react";
import Column from "./ColumnType";

type TableProps<T> = {
    data: T[],
    columns: Column<T>[];
    totalRegistros: number;
    totalPaginas: number;
    changePaginaPai: (pagina: string)=>void;
    onEditOrDelete: (id: number, isEdit: boolean, Model: T | null)=> MouseEventHandler<HTMLButtonElement>;
}
export default TableProps;