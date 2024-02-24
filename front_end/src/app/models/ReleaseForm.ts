import { ExitProduct } from "./ExitProduct";

export class ReleaseForm {
    evNumber!: number;
    date!: Date;
    userName!: String;
    isConfirmed: Boolean=true;
    Products!: [ExitProduct]
}