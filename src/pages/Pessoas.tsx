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
    const itemsPorPagina = 10;
    useEffect(() => {
        const getData = async ()=>{
        const req = 'http://localhost:3333/pessoas';
        const response = await axios.get(req)
            .then(response => {
                if (!response.status){
                throw new Error(`Erro na requisição ${response.status}`);
                }
                console.log(response);
                const converteAlunos = response.data.map((item: any)=> {
                    return new ModelAluno(item.id, item.nome, item.email, 
                                    item.cpf, item.ativo, item.role, 
                                    item.updatedAt, item.createdAt);
                });
                console.log(response);
                setAlunos(converteAlunos);
            })
            .catch(err => {
                setErro(err.message);
            })
        }
        getData();
        
        setIsLoading(false);
    }, []);

    const changePagina = (acao : acaoPagina) => {
        if (acao === acaoPagina.avanca){
            setPaginaAtual(paginaAtual + 1);
        }
        else if (acao === acaoPagina.retrocede && paginaAtual !== 1){
            setPaginaAtual(paginaAtual - 1);
        }
        else if (acao === acaoPagina.primeira){
            setPaginaAtual(1);
        }
        else if (acao === acaoPagina.ultima){
            setPaginaAtual(alunos.length / itemsPorPagina);
        }
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
            <div className="overflow-x-auto">
            <table className="table table-zebra table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th>Ativo</th>
                            <th>Função</th>
                            <th>Ações</th>
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