import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralDto } from '../dto/general.dto';
import { AreaSubsAndRoles } from '../dto/areasubsroles.dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  configurationUrl = `${environment.BACKEND_URL}/config/enterprise`;
  closingSheetUrl = `${environment.BACKEND_URL}/closing-sheet`;
  userId = localStorage.getItem('userId');
  companyId = localStorage.getItem('companyId');
  constructor(private http: HttpClient) { }

  getAllSubsAndRoles(){
    let comId = localStorage.getItem('companyId');
    `${environment.BACKEND_URL}/users/info`
    //return this.http.get<GeneralDto<AreaSubsAndRoles>>("http://localhost:3000/roles-subs-and-areas")
    return this.http.get<GeneralDto<AreaSubsAndRoles>>(`${environment.BACKEND_URL}/companies/${this.companyId}/area-subsidiary`)
  }

  postCloseTransactions() {
    return this.http.post<any>(`${this.closingSheetUrl}/company/${this.companyId}/user/${this.userId}`, {});
  }

  getLastClosingDate() {
    return this.http.get<any>(`${this.closingSheetUrl}/closingDate/${this.companyId}`);
  }
}
