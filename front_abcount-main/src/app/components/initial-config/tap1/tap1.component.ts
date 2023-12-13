import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormStateService } from 'src/app/services/form-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tap1',
  templateUrl: './tap1.component.html',
  styleUrls: ['./tap1.component.css']
})

export class Tap1Component  {
  

  // Etiqueteas de los inputs
  name = {labelName: 'Razón social', placeholderName: 'Ingrese la razón social de tu empresa', iconInputName: "fa-regular fa-building"};
  rubro = {labelRubro: 'Rubro', placeholderRubro: 'Ingrese el rubro al que se dedica', iconInputRubro: "fa-regular fa-store"};
  nit = {labelNIT: 'NIT de la empresa', placeholderNIT: 'Ingrese el NIT de la empresa', iconInputNIT: "fa-regular fa-credit-card"};
  legalRepresentative = {labelLegalRepresentative: 'Representante legal', placeholderLegalRepresentative: 'Ingrese el nombre del representante legal', iconInputLegalRepresentative: "fa-regular fa-user"};
  ciRepresentative = {labelCIRepresentative: 'C.I. del representante legal', placeholderCIRepresentative: 'Ingrese la C.I. del representante legal', iconInputCIRepresentative: "fa-regular fa-address-card"};
  address = {labelAddress: 'Dirección', placeholderAddress: 'Ingrese la dirección de la empresa', iconInputAddress: "fa-regular fa-map-marker-alt"};
  email = {labelEmail: 'E-mail de contacto', placeholderEmail: 'Ingrese un e-mail de contacto', iconInputEmail: "fa-regular fa-envelope"};
  numberRepresentative = {labelNumberRepresentative: 'Número de contacto', placeholderNumberRepresentative: 'Ingrese un número de contacto', iconInputNumberRepresentative: "fa-regular fa-phone"};
  numberRegistration = {labelNumberRegistration: 'Número de registro de comercio', placeholderNumberRegistration: 'Ingrese el número de registro de comercio', iconInputNumberRegistration: "fa-regular fa-credit-card"};
  numberEmployee = {labelNumberEmployee: 'Número de registro de empleador', placeholderNumberEmployee: 'Ingrese el número de registro de empleador', iconInputNumberEmployee: "fa-regular fa-user"};

  // Patrones de validación
  pattern={patternAll: '.*', patternAllMessage: 'Ingrese un valor válido', patternNumber: '^[0-9]*$', patternNumberMessage: 'Por favor, ingrese un número de contacto válido.', patternEmail: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$', patternEmailMessage: 'Por favor, ingrese una dirección de correo electrónico válida.'};

  @Input() control: FormControl;
  @ViewChild('fileInput') fileInput!: ElementRef;

  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  imageFile: File | null = null;
 

  constructor(public formService: FormStateService, private router: Router) {}
  ngOnInit() {
    const storedImagen = localStorage.getItem('imagen');
    if (storedImagen) {
      this.imageURL = storedImagen;
    }
    this.formService.loadFormDataFromLocalStorage();
  }


  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }


  // Métodos para el logo-------------------------------------------------------------------------//
  guardarImagen(imagenBase64: string) {
    this.imageURL = imagenBase64;
    localStorage.setItem('imagen', imagenBase64);
  }
 

  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadPreview(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.loadPreview(file);
    }
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }


  loadPreview(file: File) {
    this.imageFile = file;
    // Aquí podrías aún querer cargar una vista previa de la imagen como base64
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = reader.result;
      localStorage.setItem('imagen', this.imageURL as string);
    };
    this.formService.setImage(file);
    reader.readAsDataURL(file);
  }


  removeImage() {
    localStorage.removeItem('imagen');
    this.imageURL = null;
    this.fileInput.nativeElement.value = '';
  }

  //---------------------------------------------------------------------------------------------//

  get nombreControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('enterpriseName') as FormControl;
  }
  /*
  get diccCategoryControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('diccCategory') as FormControl;
  }  
  */
  get nitControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('nit') as FormControl;
  }
  
  get direccionControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('enterpriseLocation') as FormControl;
  }

  get emailControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('emailRepresentative') as FormControl;
  }

  get numberRepresentativeControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('numberRepresentative') as FormControl;
  }

  get numberRegistrationControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('numberRegistration') as FormControl;
  }

  get numberEmployeeControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('numberEmployee') as FormControl;
  }

  get ciRepresentativeControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('ciRepresentative') as FormControl;
  }

  get nameRepresentativeControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('nameRepresentative') as FormControl;
  }

  get rubroControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('rubro') as FormControl;
  }


  printValue() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }

  /*Verificaciones---------------------------------------------------------------------------------------------*/
  @ViewChild('errorMessage') errorMessage: ElementRef;
  @ViewChild('errorMessageLogo') errorMessageLogo: ElementRef;
  //Comprobar que los campos estan llenos
  verificarCampos() {
    if (this.nombreControl.valid && this.direccionControl.valid && this.rubroControl.valid && this.nitControl.valid && this.emailControl.valid && this.numberRepresentativeControl.valid) {
      if (this.formGroup.value.enterprise.enterpriseName != "" && this.formGroup.value.enterprise.direccion != "" && this.formGroup.value.enterprise.rubro != "" && this.formGroup.value.enterprise.nit != "" && this.formGroup.value.enterprise.email != "" && this.formGroup.value.enterprise.numeroContacto != "") {
        this.router.navigate(['/initial-config/tap2']);
      } else {
        console.log('Vacios');
        this.errorMessage.nativeElement.classList.add('show');
        setTimeout(() => {
          this.errorMessage.nativeElement.classList.remove('show');
        }, 3000);
      }
    } else {
      console.log('Falla');
      this.errorMessage.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessage.nativeElement.classList.remove('show');
      }, 3000);
    }
    this.formService.saveFormDataToLocalStorage();
  }
}
