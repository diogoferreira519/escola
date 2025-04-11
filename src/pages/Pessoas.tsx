import { MouseEventHandler, useEffect, useState } from "react";
import ModelPessoa from "../models/ModelPessoa";
import axios from "axios";
import Table from "../components/Table";
import Column from "../types/ColumnType";
import { useLocation } from "react-router-dom";

const Pessoas = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [data, setData] = useState<ModelPessoa[]>([]);
    const [search, setSearch] = useState<string>();
    const [totalRegistros, setTotalRegistros] = useState<number>(1);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);
    const location = useLocation();
    const [pageUrl, setPageUrl] = useState<string | null>(new URLSearchParams(location.search).get("page"));

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [pageUrl, search]);

    const changePagina = (pagina: string) => {
        setPageUrl(pagina);
        window.history.pushState({}, '', `?page=${pagina}`);
    }

    const getData = async ()=>{
        await axios.get(import.meta.env.VITE_API_URL + '/pessoas?page=' + pageUrl + (search != null ? '&search='+search : ''))
            .then(response => {
                if (!response.status){
                throw new Error(`Erro na requisição ${response.status}`);
                }
                if (response.data){
                    setData(response.data?.rows?.map((item: any)=> {
                        return new ModelPessoa(item.id, item.nome, item.email, 
                                        item.cpf, item.ativo, item.role, 
                                        item.updatedAt, item.createdAt);
                    }));
                }
                setTotalRegistros(response.data.count);
                setTotalPaginas(Math.ceil(response.data.count/10));
            })
            .catch(err => {
                setErro(err.message);
            })
        }

    const onEditOrDelete = (id: number, editar: boolean, Model: ModelPessoa | null): MouseEventHandler<HTMLButtonElement> => {
        if (editar) {
            console.log('editou')
        }
        else{
            console.log('excluir')
        }
    }

    const onSearch = (searchProp: string) => {
        console.log('chegou?')
        setSearch(searchProp);
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

    const colunas: Column<ModelPessoa>[] = [
        { header: "ID", acessor: 'getId' },
        { header: "Nome", acessor: 'getNome' },
        { header: "Email", acessor: 'getEmail' },
        { header: "CPF", acessor: 'getCpf' },
        { header: "Função", acessor: 'getRole' },
        { header: "Ativo", acessor: 'getAtivo' },
      ];

    return (
        <>
            <Table data={data} 
                   columns={colunas} 
                   totalRegistros={totalRegistros} 
                   totalPaginas={totalPaginas} 
                   changePaginaPai={changePagina}
                   onEditOrDelete={onEditOrDelete}
                   onSearch={onSearch}
            /> 
        </>
    )
}

export default Pessoas;