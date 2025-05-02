import { ReactNode } from "react";

type ModalProps = {
    classButton: string;
    idButton: string;
    contentButton: string | ReactNode;
    contentModal: ReactNode;
    title: string;
    onConfirm: () => void;
};
export default ModalProps;