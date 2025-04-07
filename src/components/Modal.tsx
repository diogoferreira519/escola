import { MouseEventHandler, ReactNode } from "react";
import Column from "../types/ColumnType";

type ModalProps<T> = {
    classButton: string;
    idButton: string;
    contentButton: string | ReactNode;
    contentModal: Column<T> | ReactNode;
    title: string;
    id: number;
    onConfirm: (id: number) => MouseEventHandler<HTMLButtonElement>;
  };

  const Modal = <T,>({
    classButton,
    idButton,
    contentButton,
    contentModal,
    title,
    onConfirm,
    id,
  }: ModalProps<T>) => {
    
    function isColumn<T>(value: unknown): value is Column<T> {
        return (
          typeof value === "object" &&
          value !== null &&
          "header" in value &&
          "acessor" in value
        );
      }
      

    return(
        <>
        <div>
        <button className={classButton} onClick={() => (document.getElementById(idButton) as HTMLDialogElement)?.showModal()}>{contentButton}</button>
        <dialog id={idButton} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="py-4">
                {
                    isColumn<T>(contentModal) ? (
                        <div className="form-control mb-2">
                          <label className="label">
                            <span className="label-text">{contentModal.header}</span>
                          </label>
                          <input
                            type="text"
                            className="input input-bordered"
                          />
                        </div>
                      ) : (
                        contentModal
                      )
                }</div>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Cancelar</button>
                <button className="btn" onClick={onConfirm(id)}>Confirmar</button>
            </form>
            </div>
        </div>
        </dialog>
        </div>
        </>
    )
}
export default Modal;