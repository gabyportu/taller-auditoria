import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get(`${environment.BACKEND_URL}/users/info`);
  }

  updateProfile(data: FormData)  {
    console.log("user wants to add data")
    return this.http.post(`${environment.BACKEND_URL}/users`, data);
  }
}