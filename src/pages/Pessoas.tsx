import { useEffect, useState } from "react";
import ModelAluno from "../models/ModelAluno";
import axios from "axios";

const Pessoas = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [alunos, setAlunos] = useState<ModelAluno[]>([]);
    useEffect(() => {
        const getData = async ()=>{
        const req = 'http://localhost:3000/pessoas';
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
                setAlunos(converteAlunos);
            })
            .catch(err => {
                setErro(err.message);
            })
        }
        getData();
        
        setIsLoading(false);
    }, []);

    if (isLoading)
        return <p>Carregando</p>;
    if (erro != null){
        return (
        <>
            <div className="toast">
                <div className="alert alert-info">
                <span>{`Erro na requisição: ${erro}`}</span>
                </div>
            </div>
        </>
        )
    }
    return (
        <>
        <div className="overflow-x-auto">
        <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>ativo</th>
                        <th>role</th>
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
                            </tr>
                        );
                        })
                    }
                </tbody>

            </table>
        </div>
        </>
    )
}

export default Pessoas;