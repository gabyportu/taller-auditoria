import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { FormStateService } from 'src/app/services/form-state.service';

@Component({
  selector: 'app-configuration-tap3',
  templateUrl: './configuration-tap3.component.html',
  styleUrls: ['./configuration-tap3.component.css']
})
export class ConfigurationTap3Component {

  // Variables
  registerDate: string = '';
  currencies: any[] = [];

  // Constructor
  constructor(private configurationService: ConfigurationService, private formService: FormStateService) { }

  // Cargar los datos
  ngOnInit() {
    this.configurationService.getCurrencies().subscribe((data: any) => {
      console.log(data);
      this.currencies = data.data.currencyConfig;
      const fechaOriginal = data.data.openingDate;
      const partesFecha: string[] = fechaOriginal.split("-");
      const partesFechaInvertidas: string[] = partesFecha.reverse();
      this.registerDate = partesFechaInvertidas.join("-");
    });
  }

}
