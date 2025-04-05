import Column from "./ColumnType";

type TableProps<T> = {
    data: T[],
    columns: Column<T>[];
    totalRegistros: Number;
    totalPaginas: Number;
    changePaginaPai: (pagina: string)=>void;
}
export default TableProps;