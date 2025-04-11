import ModalProps from "../types/ModalType";

  const Modal = ({
    classButton,
    idButton,
    contentButton,
    contentModal,
    title,
    id,
    onConfirm,
  }: ModalProps) => {

    const handleConfirm = () => {
      onConfirm(id);
    };

    return(
        <>
        <div>
        <button className={classButton} onClick={() => (document.getElementById(idButton) as HTMLDialogElement)?.showModal()}>{contentButton}</button>
        <dialog id={idButton} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="py-4">
                {contentModal}
              </div>
            <div className="modal-action">
            <form method="dialog">
                <button className="btn">Cancelar</button>
                <button className="btn" onClick={handleConfirm}>Confirmar</button>
            </form>
            </div>
        </div>
        </dialog>
        </div>
        </>
    )
}
export default Modal;