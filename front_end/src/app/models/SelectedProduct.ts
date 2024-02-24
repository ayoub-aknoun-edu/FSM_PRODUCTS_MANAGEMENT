import { Product } from "./Product";

export class SelectedProduct {
    product !: Product;
    name !: string;
    isSelected: boolean = false;
    quantity: number = 1;
}
