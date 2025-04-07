import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import actionPage from "../enums/ActionPage";
import TableProps from "../types/TableProps";
import Modal from "./Modal";
import ModelPessoa from "../models/ModelPessoa";

const Table = <T,>({data, columns, totalRegistros, totalPaginas, changePaginaPai, onEditOrDelete}: TableProps<T>) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');

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
        setSearch(event.target.value);
    }

    const handleDelete = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        onEditOrDelete(id, false, null);
      };
    
    const handleEdit = (id: number, Model: T) => (e: React.MouseEvent<HTMLButtonElement>) => {
        onEditOrDelete(id, true, Model);
    };
    
    return(
        <div>
            <div className="flex justify-end mb-4">
                <label className="input w-1/10 transition-all duration-300 hover:w-1/4">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" required placeholder="Search" value={search} onChange={onChangeSearch} />
                </label>
            </div>
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
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                {columns.map((column, indexColumn) => (
                                    <td key={indexColumn}>
                                                {item[column.acessor]()} 
                                    </td>
                                ))}

                                <td className="flex gap-2">
                                <Modal<ModelPessoa>
                                    classButton="btn btn-outline p-3 btn-warning"
                                    idButton={`modal_edit_${item.id}`}
                                    contentButton={<GoPencil />}
                                    contentModal={columns}
                                    title="Editar item"
                                    id={item.id}
                                    onConfirm={()=> handleEdit(item.id)}
                                />
                                <Modal
                                    classButton="btn btn-outline p-3 btn-error"
                                    idButton={`modal_delete_${item.id}`}
                                    contentButton={<MdDelete />}
                                    contentModal={<p>Deseja excluir <strong>{item.nome}</strong>?</p>}
                                    title="Excluir item"
                                    id={item.id}
                                    onConfirm={()=> handleDelete(item.id)}
                                />
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4">
                <div>
                    <span>Total Registros: {Number(totalRegistros)}</span>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="join">
                        <button onClick={()=> changePage(actionPage.primeira)} className="join-item btn">{'<<'}</button>
                        <button onClick={()=> changePage(actionPage.retrocede)} className="join-item btn">{'<'}</button>
                        <button className="join-item btn">{currentPage}</button>
                        <button onClick={()=> changePage(actionPage.avanca)}className="join-item btn" >{'>'}</button>
                        <button onClick={()=> changePage(actionPage.ultima)} className="join-item btn">{'>>'}</button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn btn-md bg-blue-700 hover:bg-blue-500">
                    Cadastrar
                    </button>
                </div>
            </div>
        </div>
)}

export default Table;