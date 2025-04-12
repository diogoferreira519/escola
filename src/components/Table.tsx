import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import actionPage from "../enums/ActionPage";
import TableProps from "../types/TableProps";
import Modal from "./Modal";
import ModelPessoa from "../models/ModelPessoa";
import ModalEdit from "./ModalEdit";

const Table = <T,>({data, columns, totalRegistros, totalPaginas, changePaginaPai, onEditOrDelete, onSearch}: TableProps<T>) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>();

    const changePage = (acao : actionPage) => {
        let novaPagina = currentPage;
        if (acao === actionPage.avanca && currentPage + 1 <= totalPaginas) {
            novaPagina = currentPage + 1;
        } else if (acao === actionPage.retrocede && currentPage !== 1) {
            novaPagina = currentPage - 1;
        } else if (acao === actionPage.primeira) {
            novaPagina = 1;
        } else if (acao === actionPage.ultima) {
            novaPagina = totalPaginas;
        }

        setCurrentPage(novaPagina);
        changePaginaPai(String(novaPagina));
    }

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valor = event.target.value;
        setSearch(valor);
        onSearch(valor);
    }

    const handleDelete = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        onEditOrDelete(id, false, null);
      };
    
    const handleEdit = () => (e: React.MouseEvent<HTMLButtonElement>) => {
        // onEditOrDelete(model.getId(), true, model);
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
                        data.map((item: ModelPessoa, index) => {
                            return (
                                <tr key={index}>
                                    {columns.map((column, indexColumn) => (
                                        <td key={indexColumn}>
                                                    {item[column.acessor]()} 
                                        </td>
                                    ))}

                                    <td className="flex gap-2">
                                    <ModalEdit<ModelPessoa>
                                        classButton="btn btn-outline p-3 btn-warning"
                                        idButton={`modal_edit_${item.getId()}`}
                                        contentButton={<GoPencil />}
                                        contentModal={columns}
                                        title="Editar item"
                                        model={item}
                                        onConfirm={(updatedModel)=> handleEdit(updatedModel)}
                                    />
                                    <Modal
                                        classButton="btn btn-outline p-3 btn-error"
                                        idButton={`modal_delete_${item.getId()}`}
                                        contentButton={<MdDelete />}
                                        contentModal={<p>Deseja excluir <strong>{item.getNome()}</strong>?</p>}
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
                    <span className="text-sm">Total Registros: {Number(totalRegistros)}</span>
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
                    <button className="btn btn-sm md:btn-md bg-blue-700 hover:bg-blue-500">
                    Cadastrar
                    </button>
                </div>
            </div>
        </div>
)}

export default Table;