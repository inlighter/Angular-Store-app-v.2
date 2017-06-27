import { Product } from './product.model';

export interface Store {
    id?: number;
    name: string;
    address: string;
    mode?: string;
    products?: Product[]
}


