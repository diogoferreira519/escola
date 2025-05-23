import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import actionPage from "../enums/ActionPage";
import TableProps from "../types/TableProps";
import Modal from "./Modal";
import ModalWithData from "./ModalWithData";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const Table = <T,>({data, columns, totalData, totalPages, changePageFather, onSearch, onChangeDataModal, onChangeItemsPage, setAscColumn}: TableProps<T>) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>();
    const [isAscOrder, setIsAscOrder] = useState<boolean>(true);
    const [columnSorter, setColumnSorter] = useState<string | null>('id');

    const changePage = (acao : actionPage) => {
        let novaPagina = currentPage;

        if (acao === actionPage.avanca && currentPage + 1 <= totalPages) 
            novaPagina = currentPage + 1;
        else if (acao === actionPage.retrocede && currentPage !== 1) 
            novaPagina = currentPage - 1;
        else if (acao === actionPage.primeira) 
            novaPagina = 1;
        else if (acao === actionPage.ultima) 
            novaPagina = totalPages;
        
        setCurrentPage(novaPagina);
        changePageFather(String(novaPagina));
    }

    const changeItemsPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeItemsPage(Number(e.target.value))
    }

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        onSearch(event.target.value);
    }

    const handleDelete = (id: number) => {
        if (id)
            onChangeDataModal(id);
      };
    
    const handleEdit = (data: T) => {
        if (data)
            onChangeDataModal(data.id,data);
    };

    const handleInsert = (data: T) => {
        if (data)
            onChangeDataModal(null, data);
    }

    const handleSortColumn = (propertie: string) => {
        if (propertie == columnSorter){
            const novaOrdem = !isAscOrder;
            setIsAscOrder(novaOrdem);
            setAscColumn(propertie, novaOrdem); 
        }else{
            setColumnSorter(propertie);
            setIsAscOrder(true);
            setAscColumn(propertie, true);
        }
    }

    const getDinamicDescription = () => {
        const descricaoColuna = columns.find(column => column.isKeyDescription);
        if (descricaoColuna) {
            return descricaoColuna.acessor;
        }
        return null; 
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
                                <th className="cursor-pointer" key={index}>
                                    <span className="flex items-center gap-2" onClick={()=>handleSortColumn(column.propertie)}>
                                        {column.header} {columnSorter === column.propertie
                                        ? (isAscOrder ? <FaSortUp /> : <FaSortDown />)
                                        : <FaSortDown className="opacity-30" />}
                                    </span>
                                </th>
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
                                            {typeof(item[column.acessor]()) == "string" || typeof(item[column.acessor]()) == "number"  ? item[column.acessor]() : (
                                                        item[column.acessor]() ? 'Sim' : 'Não'
                                                    )}
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
                                        onConfirm={(data)=> handleEdit(data)}
                                    />
                                    <Modal
                                        classButton="btn btn-outline p-3 btn-error"
                                        idButton={`modal_delete_${item.getId()}`}
                                        contentButton={<MdDelete />}
                                        contentModal={<p>Deseja excluir <strong>{item[getDinamicDescription()]()}</strong>?</p>}
                                        title="Excluir item"
                                        onConfirm={()=> handleDelete(item.getId())}
                                    />
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className="flex items-center mt-4 flex-wrap">
                <div className="flex flex-col lg:flex-row md:flex-row rounded-md">
                    <div className="flex flex-col md:flex-row gap-2 lg:items-center md:items-center">
                        <div className="flex items-center justify-start mb-2 md:mb-0"> 
                            <span className="text-sm whitespace-normal break-words">Total: {totalData != undefined ? Number(totalData) : 0}</span>
                            <span className="pl-2 hidden sm:block">|</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="label">
                                <span className="text-sm">Paginação:</span>
                            </label>
                            <select 
                                id="itemsPerPage" 
                                className="select select-bordered w-16 h-7 md:w-18 md:h-8" 
                                onChange={changeItemsPage}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 md:mb-0"> 
                        <div className="join">
                            <button onClick={()=> changePage(actionPage.primeira)} className="join-item btn btn-xs sm:btn-sm md:btn-md">{'<<'}</button>
                            <button onClick={()=> changePage(actionPage.retrocede)} className="join-item btn btn-xs sm:btn-sm md:btn-md">{'<'}</button>
                            <button disabled className="text-amber-50 join-item btn btn-xs sm:btn-sm md:btn-md">{currentPage}</button>
                            <button onClick={()=> changePage(actionPage.avanca)} className="join-item btn btn-xs sm:btn-sm md:btn-md" >{'>'}</button>
                            <button onClick={()=> changePage(actionPage.ultima)} className="join-item btn btn-xs sm:btn-sm md:btn-md">{'>>'}</button>
                        </div>
                    </div>
                        <div className="absolute right-1/12">
                            <ModalWithData<T>
                                classButton="btn btn-xs sm:btn-sm md:btn-md bg-blue-700 hover:bg-blue-500"
                                idButton={`modal_insert`}
                                contentButton={<span> Cadastrar</span>}
                                contentModal={columns}
                                title="Cadastro"
                                onConfirm={(newModel)=> handleInsert(newModel)}
                            />
                        </div>
                    </div>
            </div>
        </div>
)}

export default Table;