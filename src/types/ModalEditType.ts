import { ReactNode } from "react";
import Column from "./ColumnType";

type ModalEditProps<T> = {
    classButton: string;
    idButton: string;
    contentButton: ReactNode;
    contentModal:  Column<T>[];
    title: string;
    model?: T;
    onConfirm: (form: T) => void;
};
export default ModalEditProps;