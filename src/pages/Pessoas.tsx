import { useEffect, useState } from "react";
import ModelPessoa from "../models/ModelPessoa";
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
    const url = import.meta.env.VITE_API_URL + '/pessoas';

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [pageUrl, search, itemsPage, columnOrder]);

    useEffect(() => {
        if (erro != null)
          toast.error(erro);
      }, [erro]);

    const changePagina = (pagina: string) => {
        setPageUrl(pagina);
        window.history.pushState({}, '', `?page=${pagina}`);
    }

    const getData = async ()=>{
        await axios.get(url, {
            params: {
                page: pageUrl,
                search: search,
                items: itemsPage,
                order: columnOrder
            }
        }).then(response => {
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

    const insertData = async (data: T)=>{
        const body = {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            ativo: data.ativo ? 1 : 0,
            role: data.role
        };
        console.log(body);

        const urlInsert = import.meta.env.VITE_API_URL + '/pessoas/';
        await axios.post(urlInsert, body)
            .then(response => {
                if (!response.status)
                    throw new Error(`Erro na requisição ${response.status}`);
                
                getData()
            })
            .catch(err => {
                setErro(err.message);
        })
    }

    const putData = async (data: T)=> {
        const body = {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            ativo: data.isAtivo ? 1 : 0,
            role: data.role
        };

        const urlPut = import.meta.env.VITE_API_URL + '/pessoas/' + data.id;
        await axios.put(urlPut, body)
            .then(response => {
                if (!response.status)
                    throw new Error(`Erro na requisição ${response.status}`);
                
                getData()
            })
            .catch(err => {
                setErro(err.message);
        })
    }

    const deleteData = async(id: number) =>{
        const urlDelete = import.meta.env.VITE_API_URL + '/pessoas/' + id;
        await axios.delete(urlDelete)
            .then(response => {
                if (!response.status)
                    throw new Error(`Erro na requisição ${response.status}`);
                
                getData();
            })
            .catch(err => {
                setErro(err.response?.data?.mensagem);
            });
    }

    const onSearch = (searchProp: string) => {
        setSearch(searchProp);
    }

    const onChangeItemsPage = (page: number) => {
        setItemsPage(page);
    }

    const onChangeDataModal = (id: number | null, Model: T | null): void => {
        if (id && Model) 
            putData(Model);
        else if (!id && Model)
            insertData(Model);
        else if (id && !Model){
            deleteData(id);
        }
    }

    const setAscColumn = (column: string, isAsc: boolean) => {
        setColumnOrder([{column: column, asc: isAsc}]);
    }

    if (isLoading)
        return <p>Carregando</p>;
    
    const colunas: Column<ModelPessoa>[] = [
        { header: "ID", acessor: 'getId', propertie: 'id' },
        { header: "Nome", acessor: 'getNome', isKeyDescription: true, propertie: 'nome'},
        { header: "Email", acessor: 'getEmail', propertie: 'email'},
        { header: "CPF", acessor: 'getCpf', propertie: 'cpf'},
        { header: "Função", acessor: 'getRole', isEnum: true, enumType: Role, propertie: 'role' },
        { header: "Ativo", acessor: 'isAtivo', isBoolean: true, propertie: 'ativo'},
      ];

    return (
        <>
            <Table data={data} 
                   columns={colunas} 
                   totalData={totalRegistros} 
                   totalPages={totalPaginas} 
                   changePageFather={changePagina}
                   onChangeDataModal={onChangeDataModal}
                   onSearch={onSearch}
                   onChangeItemsPage={onChangeItemsPage}
                   setAscColumn={setAscColumn}
            /> 
        </>
    )
}

export default Pessoas;