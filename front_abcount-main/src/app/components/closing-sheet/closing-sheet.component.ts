import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-closing-sheet',
  templateUrl: './closing-sheet.component.html',
  styleUrls: ['./closing-sheet.component.css']
})
export class ClosingSheetComponent {

  backgroundPopup: boolean = false;
  firstPopup: boolean = false;
  secondPopup: boolean = false;
  loading: boolean = false;
  final: boolean = false;
  titleMessage = '¡Enhorabuena!';
  message = 'Se ha completado el proceso de cierre de manera exitosa.';
  messageIcon = 'fa-regular fa-circle-check gradient';

  constructor(private router: Router, private companyService: CompanyService) { }

  openFirstPopup(){
    this.backgroundPopup = true;
    this.firstPopup = true;
  }

  openSecondPopup(){
    this.firstPopup = false;
    this.secondPopup = true;
  }

  cancel(){
    this.backgroundPopup = false;
    this.firstPopup = false;
    this.secondPopup = false;
  }

  closingSheetProcess() {
    console.log("Cierre de ejercicio");
    this.secondPopup = false;
    this.loading = true;
    this.companyService.postCloseTransactions().subscribe({
      next: (data) => {
        console.log(data);
        if (data.success) {
          this.titleMessage = '¡Enhorabuena!';
          this.message = 'Se ha completado el proceso de cierre de manera exitosa.';
          this.messageIcon = 'fa-regular fa-circle-check gradient-green';
        } else {
          this.titleMessage = '¡Ocurrio un error!';
          this.message = 'Ha ocurrido un error al intentar cerrar el ejercicio.';
          this.messageIcon = 'fa-regular fa-circle-xmark gradient-red';
        }
        this.loading = false;
        this.final = true;
      },
      error: (err) => {
        this.titleMessage = '¡Ocurrio un error!';
        this.message = 'No se pudo conectar con el servidor. Intente de nuevo más tarde.';
        this.messageIcon = 'fa-regular fa-circle-xmark gradient-red';
        this.loading = false;
        this.final = true;
      }
    });
  }

  end() {
    this.final = false;
    this.backgroundPopup = false;
    this.router.navigate(['/home']);
  }

}
