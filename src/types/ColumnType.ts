type Column<T> = {
    header: string,
    acessor: keyof T;
}

export default Column;