import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto } from 'src/app/dto/company.dto';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../general-components/message.dialog/message.dialog.component';
import { InvitationStateDto } from 'src/app/dto/userinvitation.dto';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css']
})
export class MyCompaniesComponent implements OnInit {

  companies: CompanyDto[]
  pendingInvitation : InvitationStateDto[] = []
  loading: boolean = true;
  numberOfNotification: number = 0;

  constructor(private keycloak: KeycloakService, private router: Router, private userService: UserService, private dataService: DataService, private dialog: MatDialog) { }

  async ngOnInit() {
    localStorage.clear();
    this.loading = true; // Mostrar la barra de carga
    // cal first api
    this.userService.getInfoUser().subscribe({
      next: (response) =>{
        console.log(response)
        // call companies
        this.userService.getCompaniesByUser().subscribe({
          next: (response) => {
            console.log(response)
            if(response.data){
              this.companies = response.data;
              // cal invitation api
              this.userService.getInvitationsPending().subscribe({
                next: (response) => {
                  console.log(response)
                  if(response.data){
                    this.pendingInvitation = response.data.PENDING;
                    this.numberOfNotification = this.pendingInvitation.length;
                    this.loading = false;
                  }
                },
                error: (error) => {
                  console.log("Error fetching user Info", error);
                  this.loading = false;
                }
              });
            }
          },
          error: (error) => {
            console.log("Error fetching user Info", error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.log("Error fetching user Info", error);
        this.loading = false;
      }
    })
  }

  saveData(userId: number, companyId: number, companyName: string) {
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('companyId', companyId.toString());
    localStorage.setItem('companyName', companyName);
    window.location.href = '/home';
  }

  // Logica popup
  isDialogVisible = false;
  popup() {
    console.log("popup")
    this.isDialogVisible = true;
  }

  getImageProfile(path: string | null | undefined) {
    console.log(path)
    if(path === undefined){
 
      return '../../../assets/pfp.svg';
    }
  
    if (path != null && path.trim().length > 0) {
  
      return path;
    }
 
    return '../../../assets/pfp.svg';
  }

  confirmInvitation(index:number) {
    console.log('Aceptar invitación');
    // accept or decline
    this.userService.willAceptInvitation(true, this.pendingInvitation[index].invitationId).subscribe({
      next: (response) => {
        console.log(response)
        if(response.success){
          // call companies
          this.userService.getCompaniesByUser().subscribe({
            next: (response) => {
              console.log(response)
              if(response.data){
                this.companies = response.data
              }
            },
            error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
          });
          this.userService.getInvitationsPending().subscribe({
            next: (response) => {
              console.log(response)
              if(response.data){
                this.pendingInvitation = response.data.PENDING;
                this.numberOfNotification = this.pendingInvitation.length;
              }
            },
            error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
          })
        }
      },
      error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
    });
    this.closeWindow()// Cierra el cuadro de diálogo
  }

  cancelDelete(index:number) {
    // Cancela la eliminación aquí
    console.log('Rechazar invitación');
    this.userService.willAceptInvitation(false, this.pendingInvitation[index].invitationId).subscribe({
      next: (response) => {
        console.log(response)
        if(response.success){
          this.userService.getInvitationsPending().subscribe({
            next: (response) => {
              console.log(response)
              if(response.data){
                this.pendingInvitation = response.data.PENDING;
                this.numberOfNotification = this.pendingInvitation.length;
              }
            },
            error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
          });
        }
      },
      error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
    });
    this.closeWindow()// Cierra el cuadro de diálogo
  }

  closeWindow(){
    this.isDialogVisible = false;
  }

  logout() {
    localStorage.clear();
    this.keycloak.logout("http://localhost:4200");
  }
}
