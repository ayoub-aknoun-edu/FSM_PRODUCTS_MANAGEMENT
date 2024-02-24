import {ExitProduct} from "./ExitProduct";

export interface ExitVoucher{
  exv_number: number;
  date: Date;
  user_name: string;
  checked: boolean;
  approved: boolean;
  exitedProduct: ExitProduct[];
}
