import { MouseEventHandler, useEffect, useState } from "react";
import ModelPessoa from "../models/ModelPerson";
import axios from "axios";
import Table from "../components/Table";
import Column from "../types/ColumnType";
import { useLocation } from "react-router-dom";
import { Role } from "../enums/Role";
import { toast } from "react-toastify";
import ColumnOrder from "../interfaces/ColumnOrder";

const Pessoas = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [data, setData] = useState<ModelPessoa[]>([]);
    const [search, setSearch] = useState<string>();
    const [itemsPage, setItemsPage] = useState<number>(10);
    const [totalRegistros, setTotalRegistros] = useState<number>(1);
    const [totalPaginas, setTotalPaginas] = useState<number>(1);
    const [columnOrder, setColumnOrder] = useState<ColumnOrder[]>([{column: 'id', asc: true}]);
    const location = useLocation();
    const [pageUrl, setPageUrl] = useState<string | null>(new URLSearchParams(location.search).get("page"));

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [pageUrl, search, itemsPage, columnOrder]);

    const changePagina = (pagina: string) => {
        setPageUrl(pagina);
        window.history.pushState({}, '', `?page=${pagina}`);
    }

    const getData = async ()=>{
        await axios.get(import.meta.env.VITE_API_URL + '/pessoas', {
            params: {
                page: pageUrl,
                search: search,
                items: itemsPage,
                order: columnOrder
            }
        }).then(response => {
            console.log(response)
            if (!response.status)
                throw new Error(`Erro na requisição ${response.status}`);
            
            if (response.data?.rows){
                setData(response.data.rows.map((item: any)=> {
                    return new ModelPessoa(item.id, item.nome, item.email, 
                                    item.cpf, item.ativo, item.role, 
                                    item.updatedAt, item.createdAt);
                }));
                setTotalRegistros(response.data.count ?? response.data.length);
            }
            else if(response.data){
                setData(response.data.map((item: any)=> {
                    return new ModelPessoa(item.id, item.nome, item.email, 
                                    item.cpf, item.ativo, item.role, 
                                    item.updatedAt, item.createdAt);
                }));
                setTotalRegistros(response.data.count ?? response.data.length);
            }
            setTotalPaginas(Math.ceil(response.data.count/itemsPage));
        }).catch(err => {
            setErro(err.message);
        });
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

    const onEditOrDelete = (id: number, formEdit: any | null, editar: boolean,): 
    MouseEventHandler<HTMLButtonElement> => {
        if (editar && formEdit) 
            putData(formEdit);
        else
            console.log('excluir')
    }

    const setAscColumn = (column: string, isAsc: boolean) => {
        setColumnOrder([{column: column, asc: isAsc}]);
    }

    if (isLoading)
        return <p>Carregando</p>;
    
    if (erro != null)
        toast.error(erro);

    const colunas: Column<ModelPessoa>[] = [
        { header: "ID", acessor: 'getId', propertie: 'id' },
        { header: "Nome", acessor: 'getNome', isKeyDescription: true, propertie: 'nome'},
        { header: "Email", acessor: 'getEmail', propertie: 'email'},
        { header: "CPF", acessor: 'getCpf', propertie: 'cpf'},
        { header: "Função", acessor: 'getRole', isEnum: true, enumType: Role, propertie: 'role' },
        { header: "Ativo", acessor: 'getAtivo', isBoolean: true, propertie: 'ativo'},
      ];

    return (
        <>
            <Table data={data} 
                   columns={colunas} 
                   totalData={totalRegistros} 
                   totalPages={totalPaginas} 
                   changePageFather={changePagina}
                   onChangeDataModel={onEditOrDelete}
                   onSearch={onSearch}
                   onChangeItemsPage={onChangeItemsPage}
                   setAscColumn={setAscColumn}
            /> 
        </>
    )
}

export default Pessoas;