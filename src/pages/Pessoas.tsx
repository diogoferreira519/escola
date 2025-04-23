import { MouseEventHandler, useEffect, useState } from "react";
import ModelPessoa from "../models/ModelPerson";
import axios from "axios";
import Table from "../components/Table";
import Column from "../types/ColumnType";
import { useLocation } from "react-router-dom";
import { Role } from "../enums/Role";
import Toast from "../components/Toast";

const Pessoas = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [data, setData] = useState<ModelPessoa[]>([]);
    const [search, setSearch] = useState<string>();
    const [itemsPage, setItemsPage] = useState<number>(10);
    const [totalRegistros, setTotalRegistros] = useState<number>(1);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);
    const location = useLocation();
    const [pageUrl, setPageUrl] = useState<string | null>(new URLSearchParams(location.search).get("page"));

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [pageUrl, search, itemsPage]);

    const changePagina = (pagina: string) => {
        setPageUrl(pagina);
        window.history.pushState({}, '', `?page=${pagina}`);
    }

    const getData = async ()=>{
        const url = import.meta.env.VITE_API_URL + '/pessoas?page=' + pageUrl  + (search != null ? '&search='+search : '') + '&items=' +itemsPage;
        await axios.get(url)
            .then(response => {
                if (!response.status){
                throw new Error(`Erro na requisição ${response.status}`);
                }
                if (response.data?.rows){
                    setData(response.data.rows.map((item: any)=> {
                        return new ModelPessoa(item.id, item.nome, item.email, 
                                        item.cpf, item.ativo, item.role, 
                                        item.updatedAt, item.createdAt);
                    }));
                }
                else if(response.data){
                    setData(response.data.map((item: any)=> {
                        return new ModelPessoa(item.id, item.nome, item.email, 
                                        item.cpf, item.ativo, item.role, 
                                        item.updatedAt, item.createdAt);
                    }));
                }
                setTotalRegistros(response.data.count);
                setTotalPaginas(Math.ceil(response.data.count/itemsPage));
            })
            .catch(err => {
                setErro(err.message);
        })
    }

    const putData = async (data:any)=>{
        const body = {
            nome: data.getNome,
            email: data.getEmail,
            cpf: data.getCpf,
            ativo: data.getAtivo,
            role: data.getRole
        };

        console.log(body);

        const url = import.meta.env.VITE_API_URL + '/pessoas/' + data.getId;
        await axios.put(url, body)
            .then(response => {
                if (!response.status){
                throw new Error(`Erro na requisição ${response.status}`);
                }
                getData()
            })
            .catch(err => {
                setErro(err.message);
        })
    }

    const onSearch = (searchProp: string) => {
        setSearch(searchProp);
    }

    const onChangeItemsPage = (page: number) => {
        setItemsPage(page);
    }

    const onEditOrDelete = (id: number, editar: boolean, formEdit: any | null): MouseEventHandler<HTMLButtonElement> => {
        if (editar && formEdit) {
            putData(formEdit);
        }
        else{
            console.log('excluir')
        }
    }

    if (isLoading)
        return <p>Carregando</p>;
    if (erro != null){
        return (
            <Toast
                message={`Erro na requisição: ${erro}`}
                type ={'warning'}
            />
        )
    }

    const colunas: Column<ModelPessoa>[] = [
        { header: "ID", acessor: 'getId' },
        { header: "Nome", acessor: 'getNome', isKeyDescription: true},
        { header: "Email", acessor: 'getEmail' },
        { header: "CPF", acessor: 'getCpf' },
        { header: "Função", acessor: 'getRole', isEnum: true, enumType: Role },
        { header: "Ativo", acessor: 'getAtivo', isBoolean: true},
      ];

    return (
        <>
            <Table data={data} 
                   columns={colunas} 
                   totalData={totalRegistros} 
                   totalPages={totalPaginas} 
                   changePageFather={changePagina}
                   onEditOrDelete={onEditOrDelete}
                   onSearch={onSearch}
                   onChangeItemsPage={onChangeItemsPage}
            /> 
        </>
    )
}

export default Pessoas;