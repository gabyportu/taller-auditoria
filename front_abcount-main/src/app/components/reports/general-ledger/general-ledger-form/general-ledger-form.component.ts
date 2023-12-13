import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";
import { ReportService} from 'src/app/services/report.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-general-ledger-form',
  templateUrl: './general-ledger-form.component.html',
  styleUrls: ['./general-ledger-form.component.css']
})

export class GeneralLedgerFormComponent {

  constructor(private configurationService: ConfigurationService, private reportSerive: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit() { }

  @Input() flag: boolean = false;
  @Input() subsidiaries: any[] = [];
  @Input() areas: any[] = [];
  @Input() currencies: any[] = [];
  @Input() principalCurrency: any = '';
  @Input() otherCurrencySelected: string = '0';
  @Input() accountPlan: any[] = [];
  @Input() dateTo: string = '';
  @Input() dateFrom: string = '';
  @Output() flagChange = new EventEmitter<boolean>();

  loading: boolean = true;
  titleMessage: string = '¡Enhorabuena!';
  message: string = 'Los datos de la empresa se han guardado correctamente.';
  messageIcon: string = 'fa-regular fa-circle-check gradient';

  mostrarPopupConfirm = false;

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  confirm(){
    localStorage.clear();
    window.location.href = '/my-companies';
  }

  currencySelected: string = '0';
  accountsChecked: any[] = [];
  @ViewChild('errorMessage') errorMessage: ElementRef;
  errorMessageText: string = 'Por favor, seleccione al menos una sucursal.';

  generatePdf(){
    const sucursalesId = this.subsidiaries.filter (subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    if (sucursalesId.length > 0) {
      const areasId = this.areas.filter(area => area.isChecked).map(area => area.areaId);
      if (areasId.length > 0) {
        this.accountsChecked = [];
        this.getAccountsPlanChecked(this.accountPlan);
        //console.log(this.accountsChecked);
        const accountsId = this.accountsChecked.map(account => account.accountId);
        if (this.accountsChecked.length>0) {
          if (this.dateFrom != '' && this.dateTo != '') {
            var currencyId = '0';
            if (this.currencySelected == '0') {
              currencyId = this.principalCurrency.abbreviationName;
            } else {
              currencyId = this.otherCurrencySelected;
            }
            const data = {
              subsidiaries: sucursalesId,
              areas: areasId,
              from: this.dateFrom,
              to: this.dateTo,
              accountsId: accountsId,
              currencies: currencyId
            }
            console.log(data);
            this.mostrarPopupConfirm = true;
            //Logica Para Generar reporte
            this.reportSerive.generalLederPDF(data).subscribe((response: any) => {
              if (response.success) {
                console.log(response);
                this.mostrarPopupConfirm = false;
                window.open(response.data, '_blank');
              } else {
                console.error('Error al enviar datos al backend', response.errors);
              }
            });
          } else {
            this.errorMessageText = 'Por favor, ingrese un rango de fechas.';
            this.showErrorMessage();
          }
        } else {
          this.errorMessageText = 'Por favor, seleccione al menos una cuenta.';
          this.showErrorMessage();
        }
      } else {
        this.errorMessageText = 'Por favor, seleccione al menos un área.';
        this.showErrorMessage();
      }
    } else {
      this.errorMessageText = 'Por favor, seleccione al menos una sucursal.';
      this.showErrorMessage();
    }

  }

  generateExcel() {
    const sucursalesId = this.subsidiaries.filter(subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    if (sucursalesId.length > 0) {
      const areasId = this.areas.filter(area => area.isChecked).map(area => area.areaId);
      if (areasId.length > 0) {
        this.accountsChecked = [];
        this.getAccountsPlanChecked(this.accountPlan);
        const accountsId = this.accountsChecked.map(account => account.accountId);
        if (this.accountsChecked.length > 0) {
          if (this.dateFrom != '' && this.dateTo != '') {
            const currencyId = this.currencySelected === '0' ? this.principalCurrency.exchangeMoneyId : this.otherCurrencySelected;
            const data = {
              subsidiaries: sucursalesId,
              areas: areasId,
              from: this.dateFrom,
              to: this.dateTo,
              accountsId: accountsId,
              currencies: currencyId
            };
            console.log(data);
            this.sendDataToBackend();
          } else {
            this.errorMessageText = 'Por favor, ingrese un rango de fechas.';
            this.showErrorMessage();
          }
        } else {
          this.errorMessageText = 'Por favor, seleccione al menos una cuenta.';
          this.showErrorMessage();
        }
      } else {
        this.errorMessageText = 'Por favor, seleccione al menos un área.';
        this.showErrorMessage();
      }
    } else {
      this.errorMessageText = 'Por favor, seleccione al menos una sucursal.';
      this.showErrorMessage();
    }
  }


  sendDataToBackend() {
    this.accountsChecked = [];
    this.getAccountsPlanChecked(this.accountPlan);
    const requestData = {
      subsidiaries: this.subsidiaries.filter(s => s.isChecked).map(s => s.subsidiaryId),
      areas: this.areas.filter(a => a.isChecked).map(a => a.areaId),
      from: this.dateFrom,
      to: this.dateTo,
      accountsId: this.accountsChecked.map(account => account.accountId),
      currencies: this.currencySelected === '0' ? this.principalCurrency.abbreviationName : this.otherCurrencySelected
      //currencies: 26

    };

    console.log(requestData);
    this.configurationService.sendData(requestData).subscribe((response: any) => {
      if (response.success) {
        const headersInfo = {
          companyName: response.data.companyName,
          dateFrom: response.data.dateFrom,
          dateTo: response.data.dateTo,
          currency: response.data.currency,
        };
        this.loadData(response.data.subsidiaries, headersInfo);
      } else {
        console.error('Error al enviar datos al backend', response.errors);
      }
    });
  }

  loadData(subsidiaryData: any[], headersInfo: any) {
    const formattedData = this.transformDataForExcel(subsidiaryData);
    this.proceedToGenerateExcel(formattedData, headersInfo);
  }


  transformDataForExcel(subsidiaries: any[]): any[] {
    const excelData: any = [];
    subsidiaries.forEach(subsidiary => {
      subsidiary.areas.forEach((area:any) => {
        area.accounts.forEach((account:any) => {
          if (account.transactions && account.transactions.length > 0) {
            account.transactions.forEach((transactions:any) => {
              let date = new Date(transactions.registrationDate);
              let formattedDate = date.toISOString().split('T')[0];
              const row = {
                Sucursal: subsidiary.subsidiaryName,
                Area: area.area,
                "Codigo de Cuenta": account.accountCode,
                Cuenta: account.accountName,
                "Fecha de Registro": formattedDate,
                Tipo: transactions.transactionType,
                Glosa: transactions.glosaDetail,
                "Numero de Documento": transactions.documentNumber,
                Debe: transactions.debitAmount,
                Haber: transactions.creditAmount,
                Saldos: transactions.balances
              };

              excelData.push(row);
            });
            const totalsRow = {
              Cuenta: 'Sumas y Saldos',
              Debe: account.totalDebitAmount,
              Haber: account.totalCreditAmount,
              Saldos: account.totalBalances
            };
            excelData.push(totalsRow);
          } else {
            // Crear una fila con los totales de la cuenta si no hay transacciones
            const row = {
              Sucursal: subsidiary.subsidiaryName,
              Area: area.area,
              "Codigo de Cuenta": account.accountCode,
              Cuenta: account.accountName,
              "Fecha de Registro": '-',
              Tipo: '-',
              Glosa: '-',
              "Numero de Documento": '-',
              Debe: '-',
              Haber: '-',
              Saldos: '-'
            };
            excelData.push(row);
          }

        });
      });
    });
    console.log('Data to be converted to CSV:', excelData);
    return excelData;
  }


  proceedToGenerateExcel(data: any[], headersInfo:any) {
    const csvData = this.convertToCSV(data, headersInfo);
    this.proceedToGenerateXLSX(data, headersInfo);
    const blob = new Blob([csvData], {type: 'text/csv'});
    // Convertir datos a formato CSV
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.setAttribute('style', 'display:none;');
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', 'libro_mayor.csv');

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }


  convertToCSV(data: any[], headersInfo: any): string {
    let csv = '';
    let dateFrom = new Date(headersInfo.dateFrom);
    let formattedDateFrom = dateFrom.toISOString().split('T')[0];
    let dateTo = new Date(headersInfo.dateTo);
    let formattedDateTo = dateTo.toISOString().split('T')[0];
    // Añadir la información de la compañía y las fechas como cabecera
    csv += `CompanyName: ${headersInfo.companyName}\n`;
    csv += `Date From: ${formattedDateFrom}\n`;
    csv += `Date To: ${formattedDateTo}\n`;
    csv += `Currency: ${headersInfo.currency}\n`;
    csv += '\n'; // Añadir una línea vacía para separar la cabecera de los datos

    // Encabezados para las columnas de datos
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      csv += headers.join(',') + '\n';

      // Contenido
      for (const row of data) {
        const values = headers.map(header => {
          const escaped = ('' + row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csv += values.join(',') + '\n';
      }
    } else {
      csv += 'No hay datos disponibles para exportar.';
    }
    return csv;
  }

  proceedToGenerateXLSX(data: any[], headersInfo: any) {

    // Crear una hoja de trabajo con los datos
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    let dateFrom = new Date(headersInfo.dateFrom);
    let formattedDateFrom = dateFrom.toISOString().split('T')[0];
    let dateTo = new Date(headersInfo.dateTo);
    let formattedDateTo = dateTo.toISOString().split('T')[0];
    // Agregar la información de encabezado de la empresa en las celdas específicas
    ws['A1'] = { t: 's', v: `Compañia: ${headersInfo.companyName}` };
    ws['A2'] = { t: 's', v: `De: ${formattedDateFrom}` };
    ws['A3'] = { t: 's', v: `Al: ${formattedDateTo}` };
    ws['A4'] = { t: 's', v: `Moneda: ${headersInfo.currency}` };

    // Añadir una fila vacía entre los encabezados y los datos
    ws['A5'] = { t: 's', v: '' };

    // Agregar los datos a partir de la fila 6
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A6' });
    // Añadir estilo a la cabecera de datos
    if(ws['!ref']) {
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + "7"; // Cambiar según la fila donde comienzan los datos
        if (!ws[address]) continue;
        ws[address].s = {
          fill: {fgColor: {rgb: "FFFFAA00"}}, // Estilo de cabecera, ejemplo con color naranja
          font: {bold: true}
        };
      }
    }
    // Crear un nuevo libro y añadir la hoja de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    // Generar el archivo XLSX
    XLSX.writeFile(wb, 'libro_mayor.xlsx');
  }


  getAccountsPlanChecked(accounts: any[]) {
    for(let i = 0; i < accounts.length; i++){
      if(accounts[i].isChecked){
        this.accountsChecked.push(accounts[i]);
      }
      if(accounts[i].childrenAccounts.length > 0){
        this.getAccountsPlanChecked(accounts[i].childrenAccounts);
      }
    }
  }

  showErrorMessage() {
    this.errorMessage.nativeElement.classList.add('show');
    setTimeout(() => {
      this.errorMessage.nativeElement.classList.remove('show');
    }, 2500);
  }
}
