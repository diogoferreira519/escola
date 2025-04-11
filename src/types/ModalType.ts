import { ReactNode } from "react";

type ModalProps = {
    classButton: string;
    idButton: string;
    contentButton: string | ReactNode;
    contentModal: ReactNode;
    title: string;
    id: number;
    onConfirm: (id: number) => void;
};
export default ModalProps;