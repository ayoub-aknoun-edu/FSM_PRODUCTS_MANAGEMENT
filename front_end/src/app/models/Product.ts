import { Tag } from "./Tag";
import { Accessory } from "./Accessory";
import { TechnicalSheet } from "./TechnicalSheet";
import { Document } from "./Document";

export class Product {
    id!: number;
    reference!: string;
    name!: string;
    warehouse!: string;
    ev_number!: string;
    quantity!: number
    supplier!: string;
    technicalSheet!: TechnicalSheet;
    tag!: Tag;
    accesories!: Accessory[];
    documents!: Document[];
}
