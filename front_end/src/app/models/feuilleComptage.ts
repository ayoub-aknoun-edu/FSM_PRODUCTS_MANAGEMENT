class data {
    id!: number;
    reference!: string;
    name!: string;
    tag!: string;
    warehouse!: string;
    status!: string;
    supplier!: string;
    recognized_quantity!: number;
    theorique_quantity!: number;
    ecart!: number | null;
}


export class feuilleComptage {
    id!: number;
    date!: string;
    data!: data[];
    processed!: boolean;
}