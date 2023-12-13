import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormStateService } from 'src/app/services/form-state.service';
import { Router } from '@angular/router';
import { SubsidiaryDto } from 'src/app/dto/subsidiary.dto';

interface Elemento {
  nombre: string;
  children?: Elemento[];
  mostrarHijos?: boolean;
}

export interface Subsidiary {
  name: string;
  address: string;
  areas: Area[];
}

export interface Area {
  name: string;
}


@Component({
  selector: 'app-tap2',
  templateUrl: './tap2.component.html',
  styleUrls: ['./tap2.component.css']
})

export class Tap2Component {

  // Etiqueteas de los inputs
  subsidiaryName = {iconInputSubsidiaryName: "fa-solid fa-shop", labelSubsidiaryName: 'Nombre de la sucursal', placeholderSubsidiaryName: 'Ingrese el nombre de tu sucursal'};
  address = {iconInputAddress: "fa-regular fa-map-marker-alt", labelAddress: 'Dirección de la sucursal', placeholderAddress: 'Ingrese la dirección de tu sucursal'};
  area = {iconInputArea: "fa-regular fa-building", labelArea: 'Nombre del área', placeholderArea: 'Ingrese el nombre de tu área'};
  // Patrones generales
  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';

  /*Controladores*/
  controlSubsidiaryName = new FormControl();
  controlSubsidiaryAddress = new FormControl();
  controlArea = new FormControl();
  controlAreaName = new FormControl();

  // Arreglos
  sucursales: SubsidiaryDto[] = [];
  areas: string[] = [];

  // Nombre de la empresa
  enterpriseName: string = '';

  //Constructor
  constructor(private formStateService: FormStateService, private router: Router,public formService: FormStateService) { }

  ngOnInit() {
    const storedSucursales = localStorage.getItem('sucursales');
    const storedAreas = localStorage.getItem('areas');

    // Obtener el nombre de la empresa
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      this.enterpriseName = JSON.parse(storedFormData).enterprise.enterpriseName;
    }

    if (storedSucursales) {
      this.sucursales = JSON.parse(storedSucursales);
    }

    if (storedAreas) {
      this.areas = JSON.parse(storedAreas);
    }
  }

  @ViewChild('errorMessageSucursal') errorMessageSucursal: ElementRef;
  messageSucursal: string = 'La sucursal ya existe';
  agregarSucursal() {
    console.log("Agregar sucursal");
    const nombresSucursales = this.sucursales.map((sucursal) => sucursal.name);
    if (nombresSucursales.includes(this.controlSubsidiaryName.value)) {
      this.messageSucursal = 'La sucursal ya existe';
      this.errorMessageSucursal.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageSucursal.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.sucursales.push({
        name: this.controlSubsidiaryName.value,
        address: this.controlSubsidiaryAddress.value,
        areas: this.areas
      });
      this.limpiarCampos();
    }
    localStorage.setItem('sucursales', JSON.stringify(this.sucursales));
    console.log(this.sucursales);
  }
  eliminarSucursal(sucursalName: string) {
    console.log("Eliminar sucursal");
    this.sucursales = this.sucursales.filter((sucursal) => sucursal.name !== sucursalName);
    console.log(this.sucursales);
    if (this.sucursales.length == 0) {
      this.areas = [];
    }
    localStorage.setItem('sucursales', JSON.stringify(this.sucursales));
  }

  @ViewChild('errorMessageArea') errorMessageArea: ElementRef;
  messageArea: string = 'El área ya existe';
  //Logica para agregar area
  agregarArea() {
    console.log('Agregar área');
    if (this.areas.includes(this.controlAreaName.value)) {
      this.messageArea = 'El área ya existe';
      this.errorMessageArea.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageArea.nativeElement.classList.remove('show');
      }, 2000);
    } else if (this.sucursales.length == 0) {
      this.messageArea = 'Debe agregar al menos una sucursal antes';
      this.errorMessageArea.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageArea.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.areas.push(this.controlAreaName.value);
      this.limpiarCampos();
    }
    localStorage.setItem('areas', JSON.stringify(this.areas));
    console.log(this.areas);
    //this.sucursales.push(this.areas);
  }
  //Logica para eliminar area
  eliminarArea(areaName: string) {
    console.log('Eliminar área');
    this.areas = this.areas.filter((area) => area !== areaName);
    localStorage.setItem('areas', JSON.stringify(this.areas));
    console.log(this.areas);
  }

  //Limpiar campos
  limpiarCampos() {
    this.controlSubsidiaryName.setValue('');
    this.controlSubsidiaryAddress.setValue('');
    this.controlAreaName.setValue('');
  }

  //Lógica para mostrar y ocultar hijos
  toggleChildren(elemento: SubsidiaryDto): void {
    elemento.mostrarHijos = !elemento.mostrarHijos;
  }

  //Verificar si existe alguna sucursal y area
  verificar(){
    if (this.sucursales.length == 0) {
      this.messageSucursal = 'Debe agregar al menos una sucursal antes';
      this.errorMessageSucursal.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageSucursal.nativeElement.classList.remove('show');
      }, 2000);
    } else if (this.areas.length == 0) {
      this.messageArea = 'Debe agregar al menos un área antes';
      this.errorMessageArea.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageArea.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.router.navigate(['/initial-config/tap3']);
      this.guardarJSON();
    }
  }

  //Imprimiendo datos
  printValue() {
    console.log(JSON.stringify(this.formStateService.getForm().value, null, 2));
  }
  get formGroup(): FormGroup {
    return this.formStateService.form;
  }

  get subsidiariesControl(): FormControl {
    return this.formGroup.get('subsidiaries') as FormControl;
  }

  guardarJSON() {
    console.log('Datos en JSON:');
    console.log(this.sucursales);
    console.log(this.areas);

    const subsidiariesArray = this.formStateService.fb?.array(
      this.sucursales.map(sucursal => this.formService.fb?.group({
        name: sucursal.name,
        address: sucursal.address,
        areas: this.formService.fb?.array(this.areas)
      }))
     );
      const subsdiariesGroup = this.formGroup?.get('enterprise.subsidiaries') as FormGroup;

      if (this.formGroup) {
        const enterpriseControl = this.formGroup.get('enterprise');
        if (enterpriseControl instanceof FormGroup) {
          enterpriseControl.setControl('subsidiaries', subsidiariesArray);
          this.printValue();
        }
      }
      this.printValue()
    }
}
