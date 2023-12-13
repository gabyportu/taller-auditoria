import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-accounting-voucher-view',
  templateUrl: './accounting-voucher-view.component.html',
  styleUrls: ['./accounting-voucher-view.component.css']
})
export class AccountingVoucherViewComponent {

  // Variables
  companyName: string = '';
  sucursales: any[] = [{id: '', name: ''}];
  areas: any[] = [{id: '', name: ''}];
  documentos: any[] = [{id: '', name: ''}];
  transactionId: number = 0;
  fecha: string = '';
  numComprobante: number = 0;
  monedas: any[] = [{id: '', name: ''}];
  glosa: string = '';
  listTransactionAccount: Row[] = [];
  totalDebe: number = 0;
  totalHaber: number = 0;
  monedasAux: any[] = [];
  auxiliares: any[] = [];
  entidades: any[] = [];

  currentVoucherIndex: number = 0;
  comprobantes: any[] = [];

  cbteAjuste: boolean = false;

  constructor(
    private transactionService: TransactionService, 
    private dialog: MatDialog, 
    private route: Router,
    private reportService: ReportService
  ) { }

  // Función inicial
  ngOnInit(){
    this.addEmptyRow();
    this.loadVouncherData();
  }

  // Función para cargar los datos del voucher
  loadVouncherData(){
    this.transactionService.getVoucherData().subscribe(response => {
      if (response.success) {
        const data = response.data;
        console.log(data);
        // Llenando la información de la cabecera
        this.companyName = data.companyName;
        if(data.subsidiaries.length > 0) {
          this.sucursales = data.subsidiaries.map((subsidiary: {subsidiaryId: any; subsidiaryName: any; }) => ({id: subsidiary.subsidiaryId, name: subsidiary.subsidiaryName}));
          this.subsidiarySelect = data.subsidiaries[0].subsidiaryId;
        }
        if(data.areas.length > 0) {
          this.areas = data.areas.map((area: { areaId: any, areaName: any; }) => ({id: area.areaId, name: area.areaName}));
          this.areaSelect = data.areas[0].areaId;
        }
        if(data.transactionType.length > 0) {
          this.documentos = data.transactionType.map((transactionType: { transactionTypeId: any, type: any; }) => ({id: transactionType.transactionTypeId, name: transactionType.type}));
          this.documentSelect = data.transactionType[0].transactionTypeId;
        }
        if(data.currencies.length > 0) {
          this.monedasAux = data.currencies;
          this.monedas = data.currencies.map((currency: { exchangeRateId: any; moneyName: any; }) => ({id: currency.exchangeRateId, name: currency.moneyName}));
          this.currencySelect = this.monedas[0];
        }
        if (this.subsidiarySelect!=0 && this.areaSelect!=0 && this.documentSelect!=0){
          this.searchData();
        }
        this.auxiliares = data.auxiliar;
        this.entidades = data.entities;
      } else {
        const message = this.dialog.open(MessageDialogComponent, {
          disableClose: true,
          data: {
            title: 'Ocurrio un error!', 
            message: "Ocurrio un error con el servidor"}
        });
        message.afterClosed().subscribe(() => {
          this.route.navigate(['/accounting-voucher/view']);
        });
      }
    });
  }

  searchData() {
    this.comprobantes = [];
    this.cbteAjuste = false;
    this.transactionId = 0;
    this.transactionService.getListTransaction(this.subsidiarySelect, this.areaSelect, this.documentSelect).subscribe(response => {
      const data = response.data;
      this.comprobantes = data;
      console.log(this.comprobantes);
      if(this.comprobantes.length > 0) {
        this.currentVoucherIndex = 0;
        this.loadVoucherByIndex();
      } else {
        this.listTransactionAccount = [];
        this.addEmptyRow();
        this.fecha = '';
        this.numComprobante = 0;
        this.glosa = '';
        this.totalDebe = 0;
        this.totalHaber = 0;
      }
    });
  }

  // Función para agregar una fila vacía
  addEmptyRow(){
    const counter = this.listTransactionAccount.length;
    if (counter < 10) {
      for(let i = 0; i < 10-counter; i++){
        const row: Row = {
          numeroCuenta: '',
          nombreCuenta: '',
          auxiliar: '',
          entidad: '',
          debe: '',
          haber: '',
          glosa: '',
          nroDoc: '',
          fechaEmision: ''
        };
        this.listTransactionAccount.push(row);
      }
    }
  }

  // Selects
  subsidiarySelect: number = 0;
  areaSelect: number = 0;
  documentSelect: number = 0;
  currencySelect: any = 0;

  subsidiarySelected(subsidiary: any) {
    this.subsidiarySelect = subsidiary.id;
    this.searchData();
  }
  areaSelected(area: any) {
    this.areaSelect = area.id;
    this.searchData();
  }
  documentSelected(document: any) {
    this.documentSelect = document.id;
    this.searchData();
  }
  currencySelected(currency: any) {
    this.currencySelect = currency;
    //console.log("Moneda id: "+this.currencySelect);
    if (this.transactionId != 0) {
      const abbreviationName = this.monedasAux.find((currency: { exchangeRateId: number; }) => currency.exchangeRateId === this.currencySelect.id);
      this.transactionService.getTransaction(this.transactionId, abbreviationName.abbreviationName).subscribe(response => {
        if (response.success) {
          const data = response.data;
          console.log(data);
          const currentVoucher = this.comprobantes[this.currentVoucherIndex]; 
          console.log(currentVoucher); 
          currentVoucher.totalDebit = data.totalDebit;
          currentVoucher.totalCredit = data.totalCredit;
          currentVoucher.currency = abbreviationName;
          currentVoucher.transactions = data.transactions;
          this.loadVoucherByIndex();
        } else {
          const message = this.dialog.open(MessageDialogComponent, {
            disableClose: true,
            data: {
              title: 'Ocurrio un error!', 
              message: "Ocurrio un error con el servidor"}
          });
          message.afterClosed().subscribe(() => {
            this.route.navigate(['/accounting-voucher/view']);
          });
        }
      });
    }
  }

  navegar(direccion: string) {
    if (direccion === 'derecha') {
      if (this.currentVoucherIndex < this.comprobantes.length - 1) {
        this.currentVoucherIndex++;
      }
    } else {
      if (this.currentVoucherIndex > 0) {
        this.currentVoucherIndex--;
      }
    }
    this.loadVoucherByIndex();
  }
  loadVoucherByIndex() {
    const currentVoucher = this.comprobantes[this.currentVoucherIndex];
    this.transactionId = currentVoucher.transactionId;
    this.cbteAjuste = currentVoucher.ajuste;
    this.fecha = currentVoucher.date;
    this.numComprobante = currentVoucher.transactionNumber;
    this.glosa = currentVoucher.glosaGeneral;
    this.totalDebe = currentVoucher.totalDebit.toFixed(2);
    this.totalHaber = currentVoucher.totalCredit.toFixed(2);
    const moneyName = currentVoucher.currency.moneyName;
    this.currencySelect = this.monedas.find(m => m.name === moneyName);
    this.listTransactionAccount = currentVoucher.transactions.map((tx: any) => {
      var auxiliar = '';
      if (tx.auxiliaryId != null) {
        auxiliar = this.auxiliares.find((aux: { auxiliaryAccountId: number; }) => aux.auxiliaryAccountId === tx.auxiliaryId).codeAccount;
      }
      return {
        numeroCuenta: tx.accountCode,
        nombreCuenta: tx.nameAccount,
        auxiliar: auxiliar,
        entidad: tx.entityName,
        debe: tx.amountDebit !== 0 ? tx.amountDebit.toFixed(2) : '-',
        haber: tx.amountCredit === 0 ? '-' : tx.amountCredit.toFixed(2),
        glosa: tx.glosaDetail,
        nroDoc: tx.documentCode,
      }
    });
    this.addEmptyRow();
  }

  /*Modal*/
  mostrarPopupConfirm = false;

  /*Imprimir el comprobante contable*/
  printPdf() {
    this.mostrarPopupConfirm = true;
    const abbreviationName = this.monedasAux.find((currency: { exchangeRateId: number; }) => currency.exchangeRateId === this.currencySelect.id).abbreviationName;
    this.reportService.accountingVoucherPDF(this.transactionId, abbreviationName).subscribe((response: any) => {
      if (response.success) {
        this.mostrarPopupConfirm = false;
        console.log(response);
        window.open(response.data, '_blank');
      } else {
        console.error('Error al enviar datos al backend', response.errors);
      }
    });
  }
}

interface Row {
  numeroCuenta: string;
  nombreCuenta: string;
  auxiliarId?: number;
  auxiliar: string;
  entidad: string;
  debe: string;
  haber: string;
  glosa: string;
  nroDoc: string;
  fechaEmision: string;
}