type Column<T> = {
    header: string,
    acessor: keyof T;
    isEnum?:true;
    enumType?: Record<string, string>; 
}

export default Column;