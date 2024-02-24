import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExitVoucher} from "../models/ExitVoucher";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExitVoucherService {
  apiUrl ="http://localhost:8888/EXIT-VOUCHER-SERVICE/exit-voucher";
  constructor(private http:HttpClient) { }
     getExitVouchers():Observable<ExitVoucher[]>{
        return this.http.get<ExitVoucher[]>(this.apiUrl);
    }
    addExitVoucher(exitVoucher:ExitVoucher){
      return this.http.post(this.apiUrl,exitVoucher,{responseType: 'text'});
    }

    approveExitVoucher(exv_number:number){
    let url = this.apiUrl+"/approve/"+exv_number;
      return this.http.get(url,{responseType: 'text'});
    }

    rejectExitVoucher(exv_number:number){
    let url = this.apiUrl+"/reject/"+exv_number;
      return this.http.get(url,{responseType: 'text'});
    }

}
