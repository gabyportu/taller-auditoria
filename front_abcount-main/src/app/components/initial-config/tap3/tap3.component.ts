import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {FormStateService} from "../../../services/form-state.service";
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-tap3',
  templateUrl: './tap3.component.html',
  styleUrls: ['./tap3.component.css']
})
export class Tap3Component {
  fechaActual: Date = new Date();
  monedasSugeridas: any[] = [];
  monedasSeleccionadas: any[] = [];

  monedasLocalStorage: any []=[];
  moneyName = new FormControl();

  color: string = '#CFF4E8';

  constructor(public formService: FormStateService) {
    this.cargarMonedasDesdeLocalStorage();
    this.formService.loadFormDataFromLocalStorage();
    this.guardarJSON();
  }

  ngOnInit() {
    this.buscarSugerencias();
  }

  buscarSugerencias() {
    this.moneyName.valueChanges.pipe(debounceTime(300)).subscribe(
      (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue.length > 0) {
          this.formService.searchCurrency(value).subscribe(
            (response: any) => {
              if (response.success) {
                this.monedasSugeridas = response.data;
              } else {
                console.error(response.message);
              }
            },
            (error) => {
              console.error('Error al buscar monedas:', error);
            }
          );
        } else {
          this.monedasSugeridas = [];
        }
      });
  }

  seleccionarMoneda(moneda: any) {
    if (!this.monedasSeleccionadas.some(m => m.exchangeId === moneda.exchangeId)) {
      this.monedasSeleccionadas = [...this.monedasSeleccionadas, moneda];
      this.agregarMonedaId(moneda.exchangeId);
      this.guardarMonedasEnLocalStorage();
    }
    this.moneyName.setValue('');
    this.monedasSugeridas = [];
  }

  removerMoneda(exchangeId: number) {
    this.moneyName.setValue('');
    this.monedasSugeridas = [];
    this.monedasSeleccionadas = this.monedasSeleccionadas.filter(m => m.exchangeId !== exchangeId);
    const currencyList = this.formGroup.get('currencyConfig.currencyList') as FormArray;
    const indexToRemove = currencyList.value.findIndex((id: number) => id === exchangeId);
    if (indexToRemove !== -1) {
      this.removerMonedaId(indexToRemove);
    }
    this.guardarMonedasEnLocalStorage();
  }

  agregarMonedaId(id: number) {
    let currencyList = this.formGroup.get('currencyConfig.currencyList') as FormArray;
    if (!currencyList) {
      currencyList = this.formService.fb.array([]);
      (this.formGroup.get('currencyConfig') as FormGroup).setControl('currencyList', currencyList);
    }
    currencyList.push(this.formService.fb.control(id));
    this.guardarMonedasEnLocalStorage();
  }

  removerMonedaId(index: number) {
    const currencyList = this.formGroup.get('currencyConfig.currencyList') as FormArray;
    if (currencyList) {
      currencyList.removeAt(index);
      this.guardarMonedasEnLocalStorage();
    } else {
      console.error('currencyList no existe o es null');
    }
  }


  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }

  guardarJSON() {
    const monedasIds = this.monedasSeleccionadas.map(moneda => moneda.exchangeId);
    const jsonData = {
      monedasIds: monedasIds,
    };

    console.log('Datos en JSON:');
    console.log(jsonData);

    const monedasFormArray = this.formService.fb.array(monedasIds);
    const configCurrencyGroup = this.formGroup.get('currencyConfig') as FormGroup;
    configCurrencyGroup.setControl('currencyList', monedasFormArray);
    this.formService.saveFormDataToLocalStorage();
  }
  guardarMonedasEnLocalStorage() {
    localStorage.setItem('monedasSeleccionadas', JSON.stringify(this.monedasSeleccionadas));
  }
  cargarMonedasDesdeLocalStorage() {
    const storedMonedas = localStorage.getItem('monedasSeleccionadas');
    if (storedMonedas) {
      this.monedasSeleccionadas = JSON.parse(storedMonedas);
    }
  }

}
