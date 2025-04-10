import { ReactNode, useState } from "react";
import Column from "../types/ColumnType";
import ModelPessoa from "../models/ModelPessoa";

type ModalProps<T> = {
    isEdit: boolean;
    classButton: string;
    idButton: string;
    contentButton: string | ReactNode;
    contentModal: Column<T>| ReactNode;
    title: string;
    id: number;
    onConfirm: (model: T) => ModelPessoa;
    model?: T
  };

  const Modal = <T,>({
    isEdit,
    classButton,
    idButton,
    contentButton,
    contentModal,
    title,
    onConfirm,
    model,
  }: ModalProps<T>) => {

    const [genericModel, setGenericModel] = useState<T>(model);

    const handleConfirm = () => {
      const form = document.getElementById(`form-${idButton}`) as HTMLFormElement;
      const formData = new FormData(form);
  
      const updatedModel: Partial<T> = {};
      formData.forEach((value, key) => {
        (updatedModel as any)[key] = value;
      });
  
      onConfirm(updatedModel);
      (document.getElementById(idButton) as HTMLDialogElement)?.close();
    };

    return(
        <>
        <div>
        <button className={classButton} onClick={() => (document.getElementById(idButton) as HTMLDialogElement)?.showModal()}>{contentButton}</button>
        <dialog id={idButton} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="py-4">
              {isEdit && Array.isArray(contentModal) ? (
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
                      defaultValue={genericModel?.[content.acessor]()}
                    />
                  </div>
                ))
              ) : (
                contentModal
              )}
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