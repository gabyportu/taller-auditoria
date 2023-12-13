import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExchangeMoneyDto, ExchangeRateDto, ExchangeRateCreate} from "../../../dto/exchangeRate.dto";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';
import { AcceptDialogComponent } from '../../general-components/accept.dialog/accept.dialog.component';

@Component({
  selector: 'app-currency-exchange-add',
  templateUrl: './currency-exchange-add.component.html',
  styleUrls: ['./currency-exchange-add.component.css']
})
export class CurrencyExchangeAddComponent implements OnChanges {

  @Input() flag: boolean = false;
  @Input() date: string = '';
  @Output() flagChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flag']) {
      this.loadData();
    }
  }

  close() {
    const acceptMessage = this.dialog.open(AcceptDialogComponent, {
      width: '400px',
      data: {
        title: 'ADVERTENCIA: ¿Desea salir?',
        message: 'Es necesario registrar el tipo de cambio, de lo contrario no podrá realizar ninguna transacción en la fecha.',
        action: () => {
          this.flag = false;
          this.flagChange.emit(this.flag);
        }
      },
    });
  }

  form: FormGroup;
  currencies: ExchangeMoneyDto[] = [];
  principalCurrency: ExchangeMoneyDto = {exchangeMoneyId: 0, companyId: 0, moneyName: '', abbreviationName: '', isPrincipal: false};
  errorMessage = '';
  patternNumber = '^[0-9.]*$';
  patternNumberMessage = 'Ingrese un valor válido';

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if(this.flag){
      this.dataService.getExistExchangeRate(this.date).subscribe({
        next: (data) => {
          if(data.data) {
            const message = this.dialog.open(MessageDialogComponent, {
              data: { title: '¡Atención!', message: `Ya se ha registrado un tipo de cambio para el ${this.getLabelDate()}.` }
            });
            message.afterClosed().subscribe(() => {
              this.flag = false;
              this.flagChange.emit(this.flag);
            });
          }
        },
        error: (error) => {
          const message = this.dialog.open(MessageDialogComponent, {
            data: {title: 'Ocurrio un error!', message: "No se pudo conectar con el servidor. Intente de nuevo más tarde."}
          });
        }
      });
      this.initForm();
      this.fetchCurrencies();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      date: new FormControl(new Date().toISOString().split('T')[0]),
      values: new FormGroup({})
    });
  }

  fetchCurrencies(){
    this.dataService.getExchangeMoney().subscribe({
      next: (data) => {
        if(data.success){
          this.currencies = data.data!;
          this.currencies.forEach(currency => {
            (this.form.get('values') as FormGroup).addControl(currency.abbreviationName, 
              new FormControl());
          });
          this.principalCurrency = this.currencies.find(currency => currency.isPrincipal)!;
        }
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          disableClose: true,
          data: {title: 'Ocurrio un error!', message: "No se pudo obtener la lista de monedas"}
        });
        message.afterClosed().subscribe(() => {
          this.flag = false;
          this.flagChange.emit(this.flag);
        })
      }
    });
  }

  save(): void {
    if(this.form.valid) {
      var flagEmpty = false;
      this.currencies.forEach(currency => {
        const value = this.form.value.values[currency.abbreviationName];
        if(value == null && currency.abbreviationName != this.principalCurrency.abbreviationName) {
          flagEmpty = true;
        }
      });
      if (flagEmpty) {
        this.errorMessage = 'Debe llenar todos los campos';
      } else {
        this.errorMessage = '';
        var currencyList: ExchangeRateCreate[] = [];
        this.currencies.forEach(currency => {
          const exchangeRateCreate: ExchangeRateCreate = {
            moneyName: currency.moneyName,
            abbreviationName: currency.abbreviationName,
            currency: parseFloat(this.form.value.values[currency.abbreviationName] ? this.form.value.values[currency.abbreviationName] : 0)
          }
          currencyList.push(exchangeRateCreate);
        });
        const body = {
          date: this.date,
          exchange: currencyList
        }
        console.log(body);
        this.dataService.createExchangeRate(body).subscribe({
          next: (data) => {
            if(data.success){
              const message = this.dialog.open(MessageDialogComponent, {
                data: {title: 'Exito!', message: data.message}
              });
              message.afterClosed().subscribe(() => {
                this.flag = false;
                this.flagChange.emit(this.flag);
              })
            }else{
              const message = this.dialog.open(MessageDialogComponent, {
                data: {title: 'Ocurrio un error!', message: data.message}
              });
            }
          },
          error: (error) => {
            const message = this.dialog.open(MessageDialogComponent, {
              data: {title: 'Ocurrio un error!', message: "No se pudo crear el tipo de cambio"}
            });
          },
        });
      }
    }
  }
  
  getDateControl(): FormControl {
    return this.form.get('date') as FormControl;
  }

  getCurrencyControl(currency: string): FormControl {
    return this.form.get('values')?.get(currency) as FormControl;
  }

  getLabelDate(): string {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio','julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const [year, month, day] = this.date.split('-').map(Number);
    const formattedDate = day+' de '+months[month-1]+' de '+year;
    return formattedDate;
  }
}
