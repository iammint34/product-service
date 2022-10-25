export interface Product {
    uuid: string;
    code: string;
    name: string;
    price: number;
    status: string;
}

export interface Filters {
    search ?: string;
    code ?: string;
    name ?: string;
    page ?: number;
    perPage ?: number;
    status?: string;
    sort?: string;
    order?: string;
}