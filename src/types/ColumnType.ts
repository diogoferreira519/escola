type Column<T> = {
    header: string,
    acessor: keyof T;
    isEnum?:boolean;
    isBoolean?:boolean;
    isKeyDescription?: boolean;
    enumType?: Record<string, string>;
     
}

export default Column;