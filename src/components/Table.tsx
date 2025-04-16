import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import actionPage from "../enums/ActionPage";
import TableProps from "../types/TableProps";
import Modal from "./Modal";
import ModalWithData from "./ModalWithData";

const Table = <T,>({data, columns, totalData, totalPages, changePageFather, onSearch, onChangeDataModel}: TableProps<T>) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>();

    const changePage = (acao : actionPage) => {
        let novaPagina = currentPage;
        if (acao === actionPage.avanca && currentPage + 1 <= totalPages) {
            novaPagina = currentPage + 1;
        } else if (acao === actionPage.retrocede && currentPage !== 1) {
            novaPagina = currentPage - 1;
        } else if (acao === actionPage.primeira) {
            novaPagina = 1;
        } else if (acao === actionPage.ultima) {
            novaPagina = totalPages;
        }

        setCurrentPage(novaPagina);
        changePageFather(String(novaPagina));
    }

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valor = event.target.value;
        setSearch(valor);
        onSearch(valor);
    }

    const handleDelete = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        if (id)
            onChangeDataModel(id, null, false, true);
      };
    
    const handleEdit = (data: any) => {
        if (data)
            onChangeDataModel(data.getId,data, true);
    };

    const handleInsert = (data: any) => {
        if (data)
            onChangeDataModel(null, data);
    }

    const getDinamicDescription = (item: T) => {
        const descricaoColuna = columns.find(column => column.keyDescription);
        if (descricaoColuna) {
            return item[descricaoColuna.acessor](); // Acessa o valor dinâmico do item
        }
        return null; // Se não encontrar, pode retornar um valor padrão
    };

    
    return(
        <div>
            <div className="flex justify-end mb-4">
                <label className="input lg:w-3/10 md:w-2/10 sm:w-1/10 transition-all duration-300 hover:w-4/10">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" required placeholder="Search" value={search} onChange={onChangeSearch} />
                </label>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra table-sm">
                    <thead>
                        <tr>
                            {columns.map((column, index)=>(
                                <th key={index}>{column.header}</th>
                            ))}                   
                            <th className="w-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((item: T, index) => {
                            return (
                                <tr key={index}>
                                    {columns.map((column, indexColumn) => (
                                        <td key={indexColumn}>
                                                    {item[column.acessor]()} 
                                        </td>
                                    ))}

                                    <td className="flex gap-2">
                                    <ModalWithData<T>
                                        classButton="btn btn-outline p-3 btn-warning"
                                        idButton={`modal_edit_${item.getId()}`}
                                        contentButton={<GoPencil />}
                                        contentModal={columns}
                                        title="Editar item"
                                        model={item}
                                        onConfirm={handleEdit}
                                    />
                                    <Modal
                                        classButton="btn btn-outline p-3 btn-error"
                                        idButton={`modal_delete_${item.getId()}`}
                                        contentButton={<MdDelete />}
                                        contentModal={<p>Deseja excluir <strong>{getDinamicDescription(item)}</strong>?</p>}
                                        title="Excluir item"
                                        id= {item.getId()}
                                        onConfirm={(id)=> handleDelete(id)}
                                    />
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between mt-4 flex-wrap">
                <div className="mb-2 md:mb-0"> 
                    <span className="text-sm">Total Registros: {totalData != undefined ? Number(totalData) : 0}</span>
                </div>
                <div className="flex-1 flex justify-center mb-2 md:mb-0"> 
                    <div className="join">
                        <button onClick={()=> changePage(actionPage.primeira)} className="join-item btn btn-xs sm:btn-sm md:btn-md">{'<<'}</button>
                        <button onClick={()=> changePage(actionPage.retrocede)} className="join-item btn btn-xs sm:btn-sm md:btn-md">{'<'}</button>
                        <button className="join-item btn btn-xs sm:btn-sm md:btn-md">{currentPage}</button>
                        <button onClick={()=> changePage(actionPage.avanca)}className="join-item btn btn-xs sm:btn-sm md:btn-md" >{'>'}</button>
                        <button onClick={()=> changePage(actionPage.ultima)} className="join-item btn btn-xs sm:btn-sm md:btn-md">{'>>'}</button>
                    </div>
                </div>
                <div className="flex justify-end">
                <ModalWithData<T>
                    classButton="btn btn-sm md:btn-md bg-blue-700 hover:bg-blue-500"
                    idButton={`modal_insert`}
                    contentButton={<span> Cadastrar</span>}
                    contentModal={columns}
                    title="Cadastro"
                    onConfirm={(newModel)=> handleInsert(newModel)}
                />
                </div>
            </div>
        </div>
)}

export default Table;