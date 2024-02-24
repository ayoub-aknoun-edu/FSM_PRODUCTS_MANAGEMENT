import { Invoice } from "./Invoice";

export class EntryVoucher {
    id!: number;
    evNumber!: number;
    description!: string;
    date!: Date;
    invoice!: Invoice
}