import { useEffect, useState } from "react";
import ModelAluno from "../models/ModelAluno";

const Pessoas = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [alunos, setAlunos] = useState<ModelAluno>();
    useEffect(() => {
        const getData = async ()=>{
            try{
                const req = 'http://localhost:3333/pessoas';
                const response : Response = await fetch(req);
                
                if (!response.ok){
                    throw new Error(`Erro na requisição ${response.status}`);
                }
                
                const json = await response.json();

                const converteAlunos = json.map((item: any)=> {
                    new ModelAluno(item.id, item.nome, item.email, 
                                    item.cpf, item.ativo, item.role, 
                                    item.updatedAt, item.createdAt);
                });
            }catch(err){
                setErro(err.message);
            }finally{
                setIsLoading(false);
            }
      
        }
        getData();
    }, []);

    if (isLoading)
        return <p>Carregando</p>;
    if (erro != null)
        return <p>Erro {erro}</p>;

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
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Pessoas;