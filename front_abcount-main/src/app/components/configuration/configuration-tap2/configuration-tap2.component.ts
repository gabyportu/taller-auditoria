import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';

interface Elemento {
  nombre: string;
  children?: Elemento[];
  mostrarHijos?: boolean;
}

@Component({
  selector: 'app-configuration-tap2',
  templateUrl: './configuration-tap2.component.html',
  styleUrls: ['./configuration-tap2.component.css']
})
export class ConfigurationTap2Component {

  // Controladores para los inputs
  controlSubsidiaryName: FormControl = new FormControl('', []);
  controlSubsidiaryAddress: FormControl = new FormControl('', []);
  controlAreaName: FormControl = new FormControl('', []);
  patternAll = '.*';

  // Variable para controlar el modo edición
  modeEdit: boolean = false;

  // Variables para mensajes de error
  @ViewChild('errorMessageSucursal') errorMessageSucursal: ElementRef;
  messageSucursal: string = 'La sucursal ya existe';
  @ViewChild('errorMessageArea') errorMessageArea: ElementRef;
  messageArea: string = 'El área ya existe';

  //Listas de sucursales y areas
  subsidiaries: any[] = [];
  areas: any[] = [];
  newSubsidiaries: any[] = [];
  newAreas: any[] = [];

  //Constructor
  constructor(private router: Router, private configurationService: ConfigurationService) { }

  ngOnInit() {
    // Obtener las sucursales y areas
    this.configurationService.getSubsidiaries().subscribe(
      (data: any) => {
        this.subsidiaries = data.data.subsidiaries;
        this.areas = data.data.areas;
      }
    );
  }

  // Lógica para agregar una sucursal
  addSubsidiary() {
    const subsidiariesNames = this.subsidiaries.map((subsidiary: any) => subsidiary.subsidiaryName);
    const newSubsidiariesNames = this.newSubsidiaries.map((subsidiary: any) => subsidiary.subsidiaryName);
    if (subsidiariesNames.includes(this.controlSubsidiaryName.value) || newSubsidiariesNames.includes(this.controlSubsidiaryName.value)) {
      this.errorMessageSucursal.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageSucursal.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      let newSubsidiary = {
        subsidiaryName: this.controlSubsidiaryName.value,
        address: this.controlSubsidiaryAddress.value
      }
      this.newSubsidiaries.push(newSubsidiary);
      this.controlSubsidiaryName.setValue('');
      this.controlSubsidiaryAddress.setValue('');
      console.log(this.newSubsidiaries);
    }
  }
  //Lógica para eliminar una sucursal
  deleteSubsidiary(subsidiaryName: string) {
    this.newSubsidiaries = this.newSubsidiaries.filter((subsidiary: any) => subsidiary.subsidiaryName !== subsidiaryName);
    console.log(this.newSubsidiaries);
  }

  // Logica para agregar area
  addArea() {
    const areasNames = this.areas.map((area: any) => area.areaName);
    const newAreasNames = this.newAreas.map((area: any) => area.areaName);
    if (areasNames.includes(this.controlAreaName.value) || newAreasNames.includes(this.controlAreaName.value)){
      this.errorMessageArea.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageArea.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.newAreas.push({
        areaName: this.controlAreaName.value
      });
      this.controlAreaName.setValue('');
      console.log(this.newAreas);
    }
  }
  //Logica para eliminar area
  deleteArea(areaName: string) {
    this.newAreas = this.newAreas.filter((area: any) => area.areaName !== areaName);
    console.log(this.newAreas);
  }

  //Lógica para mostrar y ocultar hijos
  toggleChildren(elemento: Elemento): void {
    elemento.mostrarHijos = !elemento.mostrarHijos;
  }

  //Lógica para guardar las nuevas sucursales y areas
  save(){
    if (this.newSubsidiaries.length > 0 || this.newAreas.length > 0){
      this.configurationService.addSubsidiaryArea(this.newSubsidiaries, this.newAreas).subscribe();
    }
    this.subsidiaries = this.subsidiaries.concat(this.newSubsidiaries);
    this.areas = this.areas.concat(this.newAreas);
    this.modeEdit = false;
    this.newSubsidiaries = [];
    this.newAreas = [];
  }

  //Cancelar la edición
  cancel(){
    this.configurationService.getSubsidiaries().subscribe(
      (data: any) => {
        this.subsidiaries = data.data.subsidiaries;
        this.areas = data.data.areas;
      }
    );
    this.modeEdit = false;
    this.newAreas = [];
    this.newSubsidiaries = [];
  }

  //Editar
  edit() {
    this.modeEdit = true;
  }
}
