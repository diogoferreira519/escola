import { useEffect, useState } from "react";
import ModelAluno from "../models/ModelAluno";
import axios from "axios";
import { GoPencil } from "react-icons/go";
import { MdDelete } from "react-icons/md";

enum acaoPagina {
    avanca,
    retrocede,
    primeira,
    ultima
}
const Pessoas = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [alunos, setAlunos] = useState<ModelAluno[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [pesquisa, setPesquisa] = useState('');
    useEffect(() => {
        const getData = async ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const paginaUrl = urlParams.get('page');
         await axios.get(import.meta.env.VITE_API_URL + '/pessoas?page=' + paginaUrl)
            .then(response => {
                if (!response.status){
                throw new Error(`Erro na requisição ${response.status}`);
                }
                setAlunos(response.data?.rows?.map((item: any)=> {
                    return new ModelAluno(item.id, item.nome, item.email, 
                                    item.cpf, item.ativo, item.role, 
                                    item.updatedAt, item.createdAt);
                }));
               setTotalRegistros(response.data?.count);
                setTotalPaginas(Math.ceil(response.data?.count/10));
            })
            .catch(err => {
                setErro(err.message);
            })
        }
        getData();
        
        setIsLoading(false);
    }, [paginaAtual]);

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

    window.history.pushState({}, '', `?page=${novaPagina}`);
    }

    const onChangePesquisa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPesquisa(event.target.value);
    }

    if (isLoading)
        return <p>Carregando</p>;
    if (erro != null){
        return (
        <>
            <div className="toast">
                <div className="alert alert-warning">
                <span>{`Erro na requisição: ${erro}`}</span>
                </div>
            </div>
        </>
        )
    }

    return (
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
                                    <button className="btn btn-outline btn-warning"><GoPencil /></button> 
                                    <button className="btn btn-outline btn-error"><MdDelete /></button></td>
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
                    <button className="btn btn-md bg-blue-700 hover:bg-blue-500">
                    Cadastrar
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Pessoas;