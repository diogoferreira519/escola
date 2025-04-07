import { MouseEventHandler, ReactNode } from "react";

type ModalProps = {
    classButton: string;
    idButton: string;
    contentButton: string | ReactNode;
    contentModal: string | ReactNode;
    title: string;
    id: number;
    onConfirm: (id: number) => MouseEventHandler<HTMLButtonElement>;
  };

const Modal: React.FC<ModalProps> = ({classButton, 
               idButton, 
               contentButton,
               contentModal,
               title,
               onConfirm,
               id,
            }) => {
    return(
        <>
        <div>
        <button className={classButton} onClick={() => (document.getElementById(idButton) as HTMLDialogElement)?.showModal()}>{contentButton}</button>
        <dialog id={idButton} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="py-4">{contentModal}</div>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Cancelar</button>
                <button className="btn" onClick={()=> onConfirm(id)}>Confirmar</button>
            </form>
            </div>
        </div>
        </dialog>
        </div>
        </>
    )
}
export default Modal;