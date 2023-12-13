import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  modeEdit: boolean = false;

  // Datos del usuario
  username: string = "";
  email: string = "";
  birthdate: string = "";
  name: string = "";
  lastname: string = "";
  gender: number = 0;
  address: string = "";
  phoneCode: string = "";
  phoneNumber: string = "";
  country: string = "";
  noIdentity: string = "";
  extNoIdentity: string = "";

  constructor(private profileService: ProfileService) { }
  
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.profileService.getProfile().subscribe(
      (response: any) => {
        console.log(response);
        const profile = response.data;
        if(profile.urlImage != null && profile.urlImage != "") {
          this.imageURL = profile.urlImage;
        } else {
          this.imageURL = "../../../assets/pfp.svg";
        }
        this.username = profile.username;
        this.email = profile.email;
        this.birthdate = profile.birthday;
        this.name = profile.firstName;
        this.lastname = profile.lastName;
        this.gender = profile.genderPerson;
        this.address = profile.address;
        this.phoneCode = profile.extNoFono;
        this.phoneNumber = profile.noFono;
        this.country = profile.countryIdentity;
        this.noIdentity = profile.noIdentity;
        this.extNoIdentity = profile.extNoIdentity;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // --------------------------------------------------------------------------------------------//
  // Lógica para la foto de perfil
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  imageFile: File | null = null;

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

  loadPreview(file: File) {
    this.imageFile = file;
    // Aquí podrías aún querer cargar una vista previa de la imagen como base64
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  removeImage() {
    this.imageURL = null;
    this.fileInput.nativeElement.value = '';
  }

  enable() {
    this.modeEdit = true;
  }

  cancel() {
    this.loadData();
    this.modeEdit = false;
  }
  // --------------------------------------------------------------------------------------------//
  // Lógica para el formulario de perfil
  save() {
    var formData = new FormData();
    formData.append('imageProfile', this.imageFile!);
    formData.append('birthday', this.birthdate);
    formData.append('names', this.name);
    formData.append('lastnames', this.lastname);
    formData.append('gender', this.gender.toString());
    formData.append('address', this.address);
    formData.append('phoneNumber', this.phoneNumber);
    formData.append('domainNumber', this.phoneCode);
    formData.append('country', this.country);
    formData.append('dni', this.noIdentity);
    formData.append('dniExtension', this.extNoIdentity);
    console.log(formData);
    this.profileService.updateProfile(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.modeEdit = false;
        this.loadData();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
