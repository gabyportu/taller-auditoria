import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EnterpriseDto } from 'src/app/dto/enterprise.dto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DataService } from 'src/app/services/data.service';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';

@Component({
  selector: 'app-configuration-tap1',
  templateUrl: './configuration-tap1.component.html',
  styleUrls: ['./configuration-tap1.component.css']
})

export class ConfigurationTap1Component {

  // Controladores para los inputs
  companyName: FormControl = new FormControl('', []); // Razon social
  rubro: FormControl = new FormControl('', []);
  nit: FormControl = new FormControl('', []);
  legalRepresentative: FormControl = new FormControl('', []);
  ciRepresentative: FormControl = new FormControl('', []);
  address: FormControl = new FormControl('', []);
  emailRepresentative: FormControl = new FormControl('', []);
  numberRepresentative: FormControl = new FormControl('', []); // Numero de contacto
  numberRegistration: FormControl = new FormControl('', []);
  numberEmployee: FormControl = new FormControl('', []);
  
  // Patrones para los inputs
  patternAll = '.*';
  patternEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  patternNumber = '^[0-9]*$';

  // Variable para almacenar los datos de la empresa
  enterpriseData: EnterpriseDto;
  logoUuid: string;

  // Variable para controlar el modo de edición
  modeEdit: boolean = false;

  // Constructor
  constructor(private configurationService: ConfigurationService, private route: Router, private dataService: DataService, private dialog: MatDialog) { }

  // Funcion al iniciar la pantalla
  ngOnInit() {
    const companyId = localStorage.getItem('companyId');
    if(companyId){
      this.configurationService.getEnterprise().subscribe(
        (data: any) => {
          this.enterpriseData = data.data;
          this.ngAfterViewInit();
        }
      );
      this.disable();
    }else{
      this.route.navigate(['/my-companies']);
    }
  }

  // Asignar valores a los inputs
  ngAfterViewInit() {
    this.companyName.setValue(this.enterpriseData.companyName);
    this.rubro.setValue(this.enterpriseData.rubro);
    this.nit.setValue(this.enterpriseData.nit);
    this.address.setValue(this.enterpriseData.address);
    this.logoUuid = "data:image/jpeg;base64,"+this.enterpriseData.logoUuid;
    this.emailRepresentative.setValue(this.enterpriseData.emailRepresentative);
    this.numberRepresentative.setValue(this.enterpriseData.numberRepresentative);
    this.legalRepresentative.setValue(this.enterpriseData.legalRepresentative);
    this.ciRepresentative.setValue(this.enterpriseData.ciRepresentative);
    this.numberRegistration.setValue(this.enterpriseData.numberRegistration);
    this.numberEmployee.setValue(this.enterpriseData.numberEmployee);
    this.transformImage(this.enterpriseData.logoUuid);
  }

  // Imagen de la empresa
  selectedLogo: File;

  transformImage(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const fileName = 'logo.png';
    this.selectedLogo = new File([blob], fileName, { type: 'image/png' });
    console.log(this.selectedLogo);
  }


  // Campos para las fotos
  onFileSelectedLogo(event: any) {
    this.selectedLogo = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result != null){
        this.logoUuid = reader.result?.toString();
      }
    };
    console.log(this.selectedLogo);
    reader.readAsDataURL(this.selectedLogo);
  }

  // Variable para controlar que los campos esten llenos
  @ViewChild('errorMessage') errorMessage: ElementRef;

  // Función para guardar cambios realizados
  save() {
    if (this.companyName.value == '' || this.rubro.value == '' || this.nit.value == '' || this.address.value == '' || this.logoUuid == '' || this.emailRepresentative.value == '' || 
    this.numberRepresentative.value == '' || this.legalRepresentative.value == '' || this.ciRepresentative.value == '' || this.numberRegistration.value == '' || this.numberEmployee.value == '') {
      this.errorMessage.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessage.nativeElement.classList.remove('show');
      }, 3000);
    } else {
      if (this.companyName.valid && this.rubro.valid && this.nit.valid && this.address.valid && this.logoUuid != '' && this.emailRepresentative.valid &&
      this.numberRepresentative.valid && this.legalRepresentative.valid && this.ciRepresentative.valid && this.numberRegistration.valid && this.numberEmployee.valid) {
        const formData = new FormData();
        const data = {
          companyName: this.companyName.value,
          rubro: this.rubro.value,
          nit: this.nit.value,
          address: this.address.value,
          emailRepresentative: this.emailRepresentative.value,
          numberRepresentative: this.numberRepresentative.value,
          legalRepresentative: this.legalRepresentative.value,
          ciRepresentative: this.ciRepresentative.value,
          numberRegistration: this.numberRegistration.value,
          numberEmployee: this.numberEmployee.value
        };
        formData.append('datos', JSON.stringify(data));
        formData.append('image', this.selectedLogo);
        this.configurationService.updateEnterprise(formData).subscribe(
          (data: any) => {
            console.log("Se actualizo la empresa");
            console.log(this.enterpriseData);
          }
        );
        this.disable();
      } else {
        this.errorMessage.nativeElement.classList.add('show');
        setTimeout(() => {
          this.errorMessage.nativeElement.classList.remove('show');
        }, 3000);
      }
    }
  }

  // Función para cancelar los cambios
  cancel() {
    this.ngAfterViewInit();
    this.disable();
  }

  // Función para habilitar los inputs
  enable() {
    this.modeEdit = true;
    this.companyName.enable();
    this.rubro.enable();
    this.nit.enable();
    this.address.enable();
    this.emailRepresentative.enable();
    this.numberRepresentative.enable();
    this.legalRepresentative.enable();
    this.ciRepresentative.enable();
    this.numberRegistration.enable();
    this.numberEmployee.enable();
  }
  // Función para deshabilitar los inputs
  disable() {
    this.modeEdit = false;
    this.companyName.disable();
    this.rubro.disable();
    this.nit.disable();
    this.address.disable();
    this.emailRepresentative.disable();
    this.numberRepresentative.disable();
    this.legalRepresentative.disable();
    this.ciRepresentative.disable();
    this.numberRegistration.disable();
    this.numberEmployee.disable();
  }
}
