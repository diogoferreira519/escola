import ModalEditProps from "../types/ModalEditType";

  const ModalWithData = <T,>({
    classButton,
    idButton,
    contentButton,
    contentModal,
    title,
    model,
    onConfirm,
  }: ModalEditProps<T>) => {

    const handleConfirm = () => {
      const dialog = document.getElementById(idButton) as HTMLDialogElement;
      const inputs = dialog.querySelectorAll<HTMLInputElement>('input');
      const selects = dialog.querySelectorAll<HTMLSelectElement>('select');
    
      const data: Record<string, string | boolean> = {};

      inputs.forEach(input => {
        if (input.type === 'checkbox'){
          data[input.name] = input.checked;
        }
        else
          data[input.name] = input.value;
      });

      selects.forEach(select =>{
        data[select.name] = select.value;
      });

      onConfirm(data as T);
    };

    return(
        <>
        <div>
        <button className={classButton} onClick={() => (document.getElementById(idButton) as HTMLDialogElement)?.showModal()}>{contentButton}</button>
        <dialog id={idButton} className="modal modal-middle">
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
                          {
                            !content.isEnum && !content.isBoolean &&
                            <input
                            type={content.header !== 'ID' ? 'text' : 'hidden'}
                            className="input input-bordered"
                            name={content.acessor}
                            defaultValue={model ? model[content.acessor]() : ''}
                          />
                           }
                           {
                            content.isBoolean &&
                            <input name={content.acessor}type="checkbox" defaultChecked={model ? model[content.acessor]() : false} className="toggle toggle-info" />
                           }
                          {content.isEnum && content.enumType &&
                            <select name={content.acessor}defaultValue={model ? model[content.acessor]() : 0} className="select">
                             <option value={0} key={0}>Selecione uma opção</option>
                             {Object.values(content.enumType).map((valor)=>(
                              <option key={valor} value={valor}>{valor.charAt(0).toUpperCase() + valor.slice(1)}</option>
                             ))}
                           </select>
                           }
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
export default ModalWithData;