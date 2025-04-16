type Column<T> = {
    header: string,
    acessor: keyof T;
    isEnum?:true;
    isKeyDescription?: boolean;
    enumType?: Record<string, string>; 
}

export default Column;