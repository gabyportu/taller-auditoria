import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

   formGroup: FormGroup;
   private url=`${environment.BACKEND_URL}/companies`;
   private imageFile: File | null = null;


    constructor(public fb: FormBuilder, private http: HttpClient) {

      this.formGroup = this.fb.group({

        enterprise: this.fb.group({
          enterpriseName: ['', Validators.maxLength(255)],
          dicCategory: ['', Validators.maxLength(50)],
          nit: ['',Validators.maxLength(20)],
          enterpriseLocation: ['', Validators.maxLength(255)],
          emailRepresentative: ['',Validators.maxLength(100)],
          nameRepresentative: ['',Validators.maxLength(100)],
          ciRepresentative: ['',Validators.maxLength(20)],
          numberRepresentative: ['',Validators.maxLength(100)],
          numberRegistration: ['',Validators.maxLength(50)],
          numberEmployee: ['',Validators.maxLength(50)],
          rubro: ['',Validators.maxLength(50)],
          subsidiaries: this.fb.array([]),

          openingDate: this.obtenerFechaActualEnFormato(),

          }),
          currencyConfig: this.fb.group({

            currencyList: this.fb.array([]),
          }),
          accountablePlan: this.fb.array([]),

      });

    }

  printFormValue() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }
  get form(): FormGroup {
    return this.formGroup;
  }

  getForm(): FormGroup {
    return this.formGroup;
  }

  obtenerFechaActualEnFormato(): string {
    const fechaActual = new Date();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const año = fechaActual.getFullYear().toString();

    return `${mes}-${dia}-${año}`;
  }

  // post de la configuracion de la empresa
  enviarDatos(datos: any): Observable<any> {
    return this.http.post(this.url, datos);
  }

  saveFormDataToLocalStorage() {
    const formData = JSON.stringify(this.formGroup.value);
    localStorage.setItem('formData', formData);
  }

  loadFormDataFromLocalStorage() {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      this.formGroup.patchValue(parsedData);
    }
  }

  clearFormDataFromLocalStorage() {
    localStorage.removeItem('formData');
  }

  setImage(imageFile: File) {
    this.imageFile = imageFile;
  }

  getImage(): File | null {
    return this.imageFile;
  }

  searchCurrency(moneyName: string): Observable<any> {
    console.log(moneyName);
    return this.http.get(`${environment.BACKEND_URL}/config/enterprise/currency?name=${moneyName}`);
  }


}
