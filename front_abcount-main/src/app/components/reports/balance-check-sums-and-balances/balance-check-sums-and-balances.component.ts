import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ConfigurationService } from 'src/app/services/configuration.service';
import { ReportService} from 'src/app/services/report.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as XLSX from "xlsx";


@Component({
  selector: 'app-balance-check-sums-and-balances',
  templateUrl: './balance-check-sums-and-balances.component.html',
  styleUrls: ['./balance-check-sums-and-balances.component.css']
})
export class BalanceCheckSumsAndBalancesComponent {

  loading: boolean = true;
  titleMessage: string = '¡Enhorabuena!';
  message: string = 'Los datos de la empresa se han guardado correctamente.';
  messageIcon: string = 'fa-regular fa-circle-check gradient';

  mostrarPopupConfirm = false;

  //Constructor
  constructor(private configurationService: ConfigurationService, private reportSerive: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit() { }

  @Input() flag: boolean = false;
  @Input() subsidiaries: any[] = [];
  @Input() areas: any[] = [];
  @Input() currencies: any[] = [];
  @Input() principalCurrency: any = '';
  @Input() otherCurrencySelected: string = '0';
  @Input() dateTo: string = '';
  @Input() dateFrom: string = '';
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.name = [];
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  currencySelected: string = '0';
  name: string[] = [];
  @ViewChild('errorMessage') errorMessage: ElementRef;
  errorMessageText: string = 'Por favor, seleccione al menos una sucursal.';

  generatePdf(){
    const sucursalesId = this.subsidiaries.filter (subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    if (sucursalesId.length > 0) {
      const areasId = this.areas.filter(area => area.isChecked).map(area => area.areaId);
      if (areasId.length > 0) {
          if (this.dateTo != '' || this.dateFrom !='') {
            var currencyId = '0';
            if (this.currencySelected == '0') {
              currencyId = this.principalCurrency.abbreviationName;
            } else {
              currencyId = this.otherCurrencySelected;
            }
            const names = this.name.filter((name: string) => {
              const nameSpace = name.trim();
              return nameSpace.length > 0;
            });
            const data = {
              subsidiaries: sucursalesId,
              areas: areasId,
              from: this.dateFrom,
              to: this.dateTo,
              currencies: currencyId,
              responsible: names
            }
            console.log(data);
            this.mostrarPopupConfirm = true;
            //Logica Para Generar reporte
            this.reportSerive.balanceSumsAndBalancesPDF(data).subscribe((response: any) => {
              if (response.success) {
                this.mostrarPopupConfirm = false;
                console.log(response);
                window.open(response.data, '_blank');
              } else {
                console.error('Error al enviar datos al backend', response.errors);
              }
            });
          } else {
            this.errorMessageText = 'Por favor, seleccione una fecha.';
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

  generateExcel(){
    const sucursalesId = this.subsidiaries.filter(subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    if (sucursalesId.length > 0) {
      const areasId = this.areas.filter(area => area.isChecked).map(area => area.areaId);
      if (areasId.length > 0) {
        if (this.dateTo != '' || this.dateFrom !='') {
          const currencyId = this.currencySelected === '0' ? this.principalCurrency.exchangeMoneyId : this.otherCurrencySelected;
          const data = {
            subsidiaries: sucursalesId,
            areas: areasId,
            from: this.dateFrom,
            to: this.dateTo,
            currency: currencyId
          };
          console.log(data);
          this.sendDataToBackend();
        } else {
          this.errorMessageText = 'Por favor, ingrese un rango de fechas.';
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
    const names = this.name.filter((name: string) => {
      const nameSpace = name.trim();
      return nameSpace.length > 0;
    });
    const requestData = {
      subsidiaries: this.subsidiaries.filter(s => s.isChecked).map(s => s.subsidiaryId),
      areas: this.areas.filter(a => a.isChecked).map(a => a.areaId),
      from: this.dateFrom,
      to: this.dateTo,
      currencies: this.currencySelected === '0' ? this.principalCurrency.abbreviationName : this.otherCurrencySelected,
      responsible: names
    };

    console.log(requestData);
    this.configurationService.sendData4(requestData).subscribe((response: any) => {
      if (response.success) {
        console.log(response)
        const headersInfo = {
          companyName: response.data.companyName,
          dateFrom: response.data.dateFrom,
          dateTo: response.data.dateTo,
          currency: response.data.currency,
        };
        this.loadDataForExcel(response.data.subsidiaries, headersInfo);
      } else {
        console.error('Error al enviar datos al backend', response.errors);
      }
    });
  }
  loadDataForExcel(subsidiaryData: any[], headersInfo: any) {
    const formattedData = this.transformDataForExcel(subsidiaryData);
    this.proceedToGenerateExcel(formattedData, headersInfo);
  }
  transformDataForExcel(subsidiaries: any[]): any[] {
    const excelData: any = [];

    // Función para procesar las cuentas de manera recursiva
    function processAccounts(accounts:any , prefix = '') {
      accounts.forEach((account:any) => {
        // Agrega la cuenta actual al excelData
        excelData.push({
          Codigo: prefix + account.accountCode,
          Cuenta: account.accountName,
          SumaDebe: account.sumsDebitAmount,
          SumaHaber: account.sumsCreditAmount,
          SaldoDebe: account.balancesDebitAmount,
          SaldoHaber: account.balancesCreditAmount
        });

        // Procesa las cuentas hijas si las hay
        if (account.children && account.children.length > 0) {
          processAccounts(account.children, prefix + account.accountCode + ' - ');
        }
      });
    }

    // Itera a través de las subsidiarias y áreas
    subsidiaries.forEach(subsidiary => {
      subsidiary.areas.forEach((area:any) => {
        // Agrega un encabezado para cada área
        excelData.push({
          Codigo: subsidiary.subsidiaryName,
          Cuenta: area.areaName,
          SumaDebe: '',
          SumaHaber: '',
          SaldoDebe: '',
          SaldoHaber: ''
        });

        // Procesa las cuentas para cada área
        processAccounts(area.accounts);

        // Agrega los totales de cada área
        excelData.push({
          Codigo: 'Sumas Iguales',
          Cuenta: '',
          SumaDebe: area.totalSumsDebitAmount,
          SumaHaber: area.totalSumsCreditAmount,
          SaldoDebe: area.totalBalancesDebitAmount,
          SaldoHaber: area.totalBalancesCreditAmount
        });

        // Agregar una fila vacía para separar entre áreas
        excelData.push({});
      });
    });

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
    anchor.setAttribute('download', 'Sumas_saldos.csv');

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }


  convertToCSV(data: any[], headersInfo: any): string {
    let csv = '';
    let dateTo = new Date(headersInfo.dateTo);
    let formattedDateTo = dateTo.toISOString().split('T')[0];
    let dateFrom = new Date(headersInfo.dateFrom);
    let formattedDateFrom = dateFrom.toISOString().split('T')[0];
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
    let dateTo = new Date(headersInfo.dateTo);
    let formattedDateTo = dateTo.toISOString().split('T')[0];
    let dateFrom = new Date(headersInfo.dateFrom);
    let formattedDateFrom = dateFrom.toISOString().split('T')[0];
    // Crear una hoja de trabajo con los datos
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    // Agregar la información de encabezado de la empresa en las celdas específicas
    ws['A1'] = { t: 's', v: `Compañia: ${headersInfo.companyName}` };
    ws['A2'] = { t: 's', v: `Del: ${formattedDateFrom}` };
    ws['A3'] = { t: 's', v: `Al: ${formattedDateTo}` };
    ws['A4'] = { t: 's', v: `Moneda: ${headersInfo.currency}` };

    // Añadir una fila vacía entre los encabezados y los datos
    ws['A5'] = { t: 's', v: '' };

    // Agregar los datos a partir de la fila 6
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A7' });
    // Añadir estilo a la cabecera de datos
    if(ws['!ref']) {
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + "8"; // Cambiar según la fila donde comienzan los datos
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
    XLSX.writeFile(wb, 'Sumas_saldos.xlsx');
  }


  showErrorMessage() {
    this.errorMessage.nativeElement.classList.add('show');
    setTimeout(() => {
      this.errorMessage.nativeElement.classList.remove('show');
    }, 2500);
  }
}
