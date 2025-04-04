import { useState } from "react";

type Column<T> = {
    header: string,
    acessor: keyof T;
}

type TableProps<T> = {
    data: T[],
    columns: Column<T>[];
}

const [paginaAtual, setPaginaAtual] = useState(1);
const [totalPaginas, setTotalPaginas] = useState(0);
const [totalRegistros, setTotalRegistros] = useState(0);
const [pesquisa, setPesquisa] = useState('');

const Table = <T,>({data, columns}: TableProps<T>) => {
    return(<>
        <>
        <div>
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
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th>Ativo</th>
                            <th>Função</th>
                            <th className="w-3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alunos.map((aluno: ModelAluno) => {
                            return (
                                <tr key={aluno.getId()}> {/* Definindo uma chave única para cada linha */}
                                <td>{aluno.getId()}</td>         {/* Exibindo o ID do aluno */}
                                <td>{aluno.getNome()}</td>       {/* Exibindo o nome do aluno */}
                                <td>{aluno.getEmail()}</td>      {/* Exibindo o email do aluno */}
                                <td>{aluno.getCpf()}</td>        {/* Exibindo o CPF do aluno */}
                                <td>{aluno.isAtivo() ? 'Sim' : 'Não'}</td> {/* Exibindo se o aluno está ativo ou não */}
                                <td>{aluno.getRole()}</td>       {/* Exibindo o papel do aluno */}
                                <td className="flex gap-2">
                                    <button className="btn btn-outline p-3 btn-warning"><GoPencil/></button> 
                                    <button className="btn btn-outline p-3 btn-error"><MdDelete /></button></td>
                                </tr>
                            );
                            })
                        }
                    </tbody>

                </table>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div>
                    <span>Total Registros: {totalRegistros}</span>
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
                    <button className="btn hover:text-blue-400" onClick={()=>document.getElementById('my_modal_3').showModal()}>Cadastrar</button>
                    <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg mb-2">Cadastro de Pessoa</h3>
                        <div className="flex items-center gap-4">
                            <p className="py-4 w-10">Nome:</p>
                            <input type="text" placeholder="Type here" className="input w-10/12" />
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="py-4 w-10">Email:</p>
                            <input type="text" placeholder="Type here" className="input w-10/12" />
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="py-4 w-10">CPF:</p>
                            <input type="text" placeholder="Type here" className="input w-10/12" />
                        </div>
                    </div>
                    </dialog>
                </div>
            </div>
        </div>
        </>
        </>)
}

export default Table;