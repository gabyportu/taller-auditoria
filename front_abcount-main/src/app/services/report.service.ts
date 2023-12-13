import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  companyId = localStorage.getItem('companyId');

  //Libro Diario
  diaryBookPDF(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_URL}/diary/book/pdf/${this.companyId}`, data);
  }

  //Libro Mayor
  generalLederPDF(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_URL}/mayor/book/pdf/${this.companyId}`, data);
  }
  //Balance General
  balaceSheetPDF(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_URL}/general/balance/pdf/${this.companyId}`, data);
  }
  //Estado De Resultados
  statementIncomePDF(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_URL}/general/estado-resultados/pdf/${this.companyId}`, data);
  }
  //Balance De Sumas y Saldos
  balanceSumsAndBalancesPDF(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BACKEND_URL}/sumas/saldos/pdf/${this.companyId}`, data);
  }

  //Comprobante contable
  accountingVoucherPDF(transactionId: number, currency: string): Observable<any> {
    return this.http.get<any>(`${environment.BACKEND_URL}/transactional/voucher/pdf/${this.companyId}?transactionId=${transactionId}&currency=${currency}`);
  }
}
