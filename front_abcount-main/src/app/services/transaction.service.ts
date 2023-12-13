import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = `${environment.BACKEND_URL}/transactional/voucher`;
  companyId = localStorage.getItem('companyId');

  constructor(private http: HttpClient) { }

  getListTransaction(subsidiaryId: number, areaId: number, transactionTypeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/${this.companyId}?subsidiaryId=${subsidiaryId}&areaId=${areaId}&transactionTypeId=${transactionTypeId}`);
  }
  

  getVoucherData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.companyId}`);
  }


  createTransaction(data: any) {
    return this.http.post(`${this.baseUrl}/${this.companyId}`, data);
  }

  getTransaction(transactionId: number, currency: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/currency/${this.companyId}?transactionId=${transactionId}&currency=${currency}`);
  }
}
