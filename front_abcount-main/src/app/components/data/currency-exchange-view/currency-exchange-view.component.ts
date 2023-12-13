import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ExchangeRateDto, ExchangeRateUpdate } from "../../../dto/exchangeRate.dto";
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-currency-exchange-view',
  templateUrl: './currency-exchange-view.component.html',
  styleUrls: ['./currency-exchange-view.component.css']
})
export class CurrencyExchangeViewComponent {
  
  date: string = '';
  data: any[] = [];
  dataUpdate: any[] = [];
  displayedColumns: string[] = [];
  allColumns: string[] = [];
  selectedRecord: ExchangeRateDto = { date: '', values: [] };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.date = this.getCurrentDate();
    this.loadData();
  }

  getCurrentDate(): string {
    const boliviaTimezone = 'America/La_Paz';
    const formattedDate = new Date().toLocaleDateString('en-US', { timeZone: boliviaTimezone, year: 'numeric', month: '2-digit', day: '2-digit' });
    const dateParts = formattedDate.split('/');
    const year = dateParts[2];
    const month = dateParts[0].padStart(2, '0');
    const day = dateParts[1].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadData() {
    this.dataService.getExchangeMoney().subscribe((data: any) => {
      this.displayedColumns = data.data.filter((item: any) => item.isPrincipal === false).map((item: any) => item.abbreviationName);
      this.displayedColumns.unshift('Fecha');
      this.allColumns = [...this.displayedColumns, 'Editar'];
      //console.log(this.allColumns);
      this.dataService.getExchangeRates().subscribe(response => {
        this.data = this.transformData(response.data);
        this.dataUpdate = this.transformUpdate(response.data);
      });
    });
  }

  transformData(data: any[]): any[] {
    const result: any[] = [];
    // Agrupar por fecha
    const groupedByDate: { [date: string]: any[] } = {};
    data.forEach((item) => {
      const date = item.date.split('T')[0]; // Obtener solo la parte de la fecha
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(item);
    });
    // Crear el resultado
    for (const date in groupedByDate) {
      if (groupedByDate.hasOwnProperty(date)) {
        const currencies: { [currency: string]: number } = {};
        groupedByDate[date].forEach((item: any) => {
          currencies[item.abbreviationName] = item.currency;
        });
        const formattedDate = formatDate(new Date(date), 'dd-MM-yyyy', 'en-US');
        const record = { Fecha: `${formattedDate}`, ...currencies };
        result.push(record);
      }
    }
    return result;
  }

  transformUpdate(data: any[]): any[] {
    const result: any[] = [];
    // Agrupar por fecha
    const groupedByDate: { [date: string]: any[] } = {};
    data.forEach((item) => {
      const date = item.date.split('T')[0]; // Obtener solo la parte de la fecha
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(item);
    });
    // Crear el resultado
    for (const date in groupedByDate) {
      if (groupedByDate.hasOwnProperty(date)) {
        const currencies: ExchangeRateUpdate[] = [];
        groupedByDate[date].forEach((item: any) => {
          const currency: ExchangeRateUpdate = {
            abbreviation: item.abbreviationName,
            exchangeRateId: item.exchangeRateId,
            value: item.currency
          };
          currencies.push(currency);
        });
        result.push(currencies);
      }
    }
    return result;
  }

  getValueForCurrency(record: ExchangeRateDto, currency: string): number | undefined {
    const found = record.values.find(item => item.abbreviation === currency);
    return found ? found.value : undefined;
  }

  loadExchangeRateForEdit(record: any, index: number): void {
    this.selectedRecord = {
      date: record.Fecha,
      values: this.dataUpdate[index]
    };
    console.log("Registro seleccionado:", this.selectedRecord);
    this.flagEditChange();
  }

  flagEdit: boolean = false;
  flagEditChange() {
    this.flagEdit = !this.flagEdit;
    if (!this.flagEdit) {
      this.loadData();
    }
  }

  flagAdd: boolean = false;
  flagAddChange() {
    this.flagAdd = !this.flagAdd;
    if (!this.flagAdd) {
      this.loadData();
    }
  }
  
  @Input() flag: boolean = false;
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

}