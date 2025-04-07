import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import acaoPagina from "../enums/AcaoPagina";
import TableProps from "../types/TableProps";
import Modal from "./Modal";

const Table = <T,>({data, columns, totalRegistros, totalPaginas, changePaginaPai, onEditOrDelete}: TableProps<T>) => {

    const [paginaAtual, setPaginaAtual] = useState<number>(1);
    const [pesquisa, setPesquisa] = useState<string>('');

    const changePagina = (acao : acaoPagina) => {
        let novaPagina = paginaAtual;
        if (acao === acaoPagina.avanca && paginaAtual + 1 <= totalPaginas) {
            novaPagina = paginaAtual + 1;
        } else if (acao === acaoPagina.retrocede && paginaAtual !== 1) {
            novaPagina = paginaAtual - 1;
        } else if (acao === acaoPagina.primeira) {
            novaPagina = 1;
        } else if (acao === acaoPagina.ultima) {
            novaPagina = totalPaginas;
        }

        setPaginaAtual(novaPagina);
        changePaginaPai(String(novaPagina));
    }

    const onChangePesquisa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPesquisa(event.target.value);
    }

    const handleDelete = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Deletando item com ID:", id);
      };
    
    const handleEdit = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Editando item com ID:", id);
    };
    
    return(
        <div>
            <div className="flex justify-end mb-4">
                <label className="input w-1/10 transition-all duration-300 hover:w-1/4">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" required placeholder="Search" value={pesquisa} onChange={onChangePesquisa} />
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
                                <Modal
                                    classButton="btn btn-outline p-3 btn-warning"
                                    idButton={item.id}
                                    contentButton={<GoPencil />}
                                    contentModal={<p>Deseja editar <strong>{item.nome}</strong>?</p>}
                                    title="Editar item"
                                    id={item.id}
                                    onConfirm={handleEdit(item.id)}
                                />
                                <Modal
                                    classButton="btn btn-outline p-3 btn-error"
                                    idButton={item.id + 1}
                                    contentButton={<MdDelete />}
                                    contentModal={<p>Deseja excluir <strong>{item.nome}</strong>?</p>}
                                    title="Excluir item"
                                    id={item.id}
                                    onConfirm={handleDelete(item.id)}
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
                        <button onClick={()=> changePagina(acaoPagina.primeira)} className="join-item btn">{'<<'}</button>
                        <button onClick={()=> changePagina(acaoPagina.retrocede)} className="join-item btn">{'<'}</button>
                        <button className="join-item btn">{paginaAtual}</button>
                        <button onClick={()=> changePagina(acaoPagina.avanca)}className="join-item btn" >{'>'}</button>
                        <button onClick={()=> changePagina(acaoPagina.ultima)} className="join-item btn">{'>>'}</button>
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