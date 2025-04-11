import ModalEditProps from "../types/ModalEditType";

  const ModalEdit = <T,>({
    classButton,
    idButton,
    contentButton,
    contentModal,
    title,
    id,
    model,
    onConfirm,
  }: ModalEditProps<T>) => {

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
                {
                     contentModal.map((content, i) => (
                        <div key={i} className="form-control mb-2">
                          <label className="label w-20">
                          <span className={`label-text ${content.header === 'ID' ? 'hidden' : ''}`}>
                          {content.header}
                        </span>
                          </label>
                          <input
                            type={content.header !== 'ID' ? 'text' : 'hidden'}
                            className="input input-bordered"
                            name={content.acessor}
                            defaultValue={model[content.acessor]()}
                          />
                        </div>
                      ))
                }
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
export default ModalEdit;