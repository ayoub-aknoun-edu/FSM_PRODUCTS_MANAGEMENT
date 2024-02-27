import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExitVoucher} from "../models/ExitVoucher";
import {Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class ExitVoucherService {
  apiUrl ="http://localhost:8888/EXIT-VOUCHER-SERVICE/exit-voucher";
  API_URL =environment.apiUrl;
  constructor(private http:HttpClient) { }
     getExitVouchers():Observable<ExitVoucher[]>{
        return this.http.get<ExitVoucher[]>(this.apiUrl);
    }
    addExitVoucher(exitVoucher:ExitVoucher){
      let url = `${this.API_URL}/EXIT-VOUCHER-SERVICE/exit-voucher`;
      return this.http.post(url,exitVoucher,{responseType: 'text'});
    }

    approveExitVoucher(exv_number:number){
    //let url = this.apiUrl+"/approve/"+exv_number;
    let url = `${this.API_URL}/EXIT-VOUCHER-SERVICE/exit-voucher/approve/${exv_number}`
      return this.http.get(url,{responseType: 'text'});
    }

    rejectExitVoucher(exv_number:number){
   let url = `${this.API_URL}/EXIT-VOUCHER-SERVICE/exit-voucher/reject/${exv_number}`
      return this.http.get(url,{responseType: 'text'});
    }

}
