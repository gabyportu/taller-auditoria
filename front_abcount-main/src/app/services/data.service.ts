import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuxiliaryDto} from "../dto/auxiliary.dto";
import {BehaviorSubject, Observable} from "rxjs";
import {EntityDto} from "../dto/entity.dto";
import {ExchangeMoneyDto, ExchangeRateCreate, ExchangeRateDto} from "../dto/exchangeRate.dto";
import { GeneralDto } from '../dto/general.dto';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/general-components/message.dialog/message.dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.BACKEND_URL;


  constructor(private http: HttpClient, private dialog: MatDialog) {
    
  }

  
  

  // Auxiliares
  createAuxiliary(auxiliary: AuxiliaryDto): Observable<GeneralDto<AuxiliaryDto[]>> {
    const companyId = localStorage.getItem('companyId');
    return this.http.post<GeneralDto<AuxiliaryDto[]>>(`${this.baseUrl}/auxiliaryAccount/${companyId}`, auxiliary);
  }

  getAllAuxiliaries(): Observable<GeneralDto<AuxiliaryDto[]>>  {
    const companyId = localStorage.getItem('companyId');
    return this.http.get<GeneralDto<AuxiliaryDto[]>>(`${this.baseUrl}/auxiliaryAccount/${companyId}`);
  }
  updateAuxiliary(auxiliary: AuxiliaryDto): Observable<GeneralDto<AuxiliaryDto[]>>{
    const companyId = localStorage.getItem('companyId');
    return this.http.put<GeneralDto<AuxiliaryDto[]>>(`${this.baseUrl}/auxiliaryAccount/${companyId}`, auxiliary);
  }
  deleteAuxiliary(auxiliaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/auxiliaryAccount/${auxiliaryId}`);
  }

  //Entidades
  createEntity(entity: EntityDto): Observable<GeneralDto<EntityDto[]>> {
    const companyId = localStorage.getItem('companyId');
    return this.http.post<GeneralDto<EntityDto[]>>(
      `${this.baseUrl}/entity/${companyId}`, entity);
  }
  getAllEntities(): Observable<GeneralDto<EntityDto[]>> {
    const companyId = localStorage.getItem('companyId');
    return this.http.get<GeneralDto<EntityDto[]>>(`${this.baseUrl}/entity/${companyId}`);
  }

  updateEntity(entity: EntityDto): Observable<GeneralDto<EntityDto[]>> {
    const companyId = localStorage.getItem('companyId');
    return this.http.put<GeneralDto<EntityDto[]>>(`${this.baseUrl}/entity/${companyId}`, entity);
  }

  deleteEntity(entityId: number): Observable<GeneralDto<EntityDto[]>>{
    return this.http.delete<GeneralDto<EntityDto[]>>(`${this.baseUrl}/entity/${entityId}`);
  }

  //Cambios de moneda


  private editingRecordSource = new BehaviorSubject<ExchangeRateDto | null>(null);
  currentEditingRecord = this.editingRecordSource.asObservable();
  companyId = localStorage.getItem('companyId');

  getExchangeRates(): Observable<{ data: ExchangeRateDto[] }> {
    //console.log("Llamando a la URL:", `${this.baseUrl}/exchangeRate/${this.companyId}`);
    return this.http.get<{ data: ExchangeRateDto[] }>(`${this.baseUrl}/exchangeRate/${this.companyId}`);
  }


  createExchangeRate(data: any): Observable<any>{
    const companyId = localStorage.getItem('companyId');
    return this.http.post<any>(`${this.baseUrl}/exchangeRate/${companyId}`, data);
  }

  updateExchangeRate(data: any[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/exchangeRate`, data);
  }

  deleteExchangeRate(data: ExchangeRateDto): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteExchangeRate/${data.id}`);
  }

  getExchangeMoney(): Observable<GeneralDto<ExchangeMoneyDto[]>> {
    const companyId = localStorage.getItem('companyId');
    return this.http.get<GeneralDto<ExchangeMoneyDto[]>>(`${this.baseUrl}/exchangeMoney/${companyId}`);
  }

  getExistExchangeRate(date: string): Observable<GeneralDto<Boolean>> {
    const companyId = localStorage.getItem('companyId');
    return this.http.get<GeneralDto<Boolean>>(`${this.baseUrl}/exchangeRate/exist/${companyId}?date=${date}`);
  }


  
}
