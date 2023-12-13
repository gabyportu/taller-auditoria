import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RolesDtoResponse, SubsidiaryDtoResponse, UserSearcherDto } from 'src/app/dto/areasubsroles.dto';
import { CompanyService } from 'src/app/services/company.service';
import { Observable, debounce, fromEvent, of } from 'rxjs';
import { debounceTime, map,distinctUntilChanged,switchMap,tap } from "rxjs/operators";
import { error } from '@angular/compiler-cli/src/transformers/util';
import { MatDialog } from '@angular/material/dialog';
import { AdviceModalComponent } from '../../general-components/advice-modal/advice-modal.component';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';
import { LoadingComponent } from '../../general-components/loading/loading.component';
@Component({
  selector: 'app-add-users-and-permissions',
  templateUrl: './add-users-and-permissions.component.html',
  styleUrls: ['./add-users-and-permissions.component.css']
})
export class AddUsersAndPermissionsComponent  {
  //input
  shouldShow:boolean = false;
  nameSearchInput: string = "";
  usersSearched: UserSearcherDto[];
  timeout : any = null;

  isFocused = false;

  userSelected: UserSearcherDto;


  subsidiaries: SubsidiaryDtoResponse[];
  rolesEntity: RolesDtoResponse[];


  constructor(
    private router: Router, 
    private userService: UserService,
    private companyService: CompanyService,
    private dialog: MatDialog,) { 
      
    }

  
  // Funcion al iniciar la pantalla
  ngOnInit() {
    
    this.companyService.getAllSubsAndRoles().subscribe(
      (data) => {
        if(data.data){
          console.log(data.data)
          this.subsidiaries = data.data.areasAndSubs;
          this.rolesEntity = data.data.roles;
          
        }
      }
    );
  }

  focusFunction(){
    if(!this.nameSearchInput.trim()){
      this.shouldShow = false;
    }else{
      this.shouldShow = true;
    }
    
  }
  focusOutFunction(){
    if(!this.isFocused){
      this.shouldShow = false;
    }
    
  }

  itemClicked(index: number){
    this.userSelected = this.usersSearched[index]; 
    this.shouldShow = false;
    this.nameSearchInput = "";
  }

  onMouseEnter() {
    this.isFocused = true; 
  }

  onMouseLeave() {
    this.isFocused = false; 
  }
  // funcion para verifiar si se deberia checkear todo
  shouldBeCheckedSubsidiary(currentSub: number){
    for(let area of this.subsidiaries[currentSub].areas){
      if(!area.status){
        return false
      }
    }
    return true
  }

  // Controladores para los inputs
  NombreUsuario: string = '';
  areasSeleccionadas: number[] = [];
  sucursalesSeleccionadas: number[] = [];
  rolesSeleccionados: number[] = [];
  idsRolesSeleccionados: number[] = [];
  resultados: any[] = [];
 
  // Logica para el marcado de checkbox
  syncCheckboxes(subsidiary: any, areas: any[]) {
    if (subsidiary.status) {
      areas.forEach((area) => (area.status = true));
    } else {
      areas.forEach((area) => (area.status = false));
    }
  }

  private callToSearchUser(){
    console.log("This is from api request")
    
    this.userService.searchUser(3, this.nameSearchInput).subscribe({
      next: (response) =>{
        if(response.data){
          
          this.usersSearched = response.data;
        }
      },
      error: (error) => {
        console.log("Error ", error)
      }
    })
  }
  changingInputUser(){
    
    if(this.nameSearchInput.trim() != ""){
      
      clearTimeout(this.timeout)
      this.timeout = setTimeout( ()=> {
        this.callToSearchUser()
      }, 500)
      this.shouldShow = true;
      
    }else{
      this.shouldShow = false;
      this.usersSearched = []
    }

  }
  // Guarda listado de id de areas seleccionadas en un array
  onAreaChange(currentSub: number, currentArea: number) {
      this.subsidiaries[currentSub].status = this.allAreaEquals(currentSub)
    
  }
  allAreaEquals(currentSub:number){
    for(let area of this.subsidiaries[currentSub].areas){
      if(! area.status){
        return false
      }
    }
    return true
  }
  // Guarda listado de id de sucursales seleccionadas en un array
  onSubsidiaryChange(currentSub: number) {
    for(let area of this.subsidiaries[currentSub].areas){
      area.status = this.subsidiaries[currentSub].status;
    }
    
  }
 

  getAreaSubs() {
    let areasSubs:number[] = [];
    for(let subs of this.subsidiaries){
      for(let ar of subs.areas){
        if(ar.status){
          areasSubs.push(ar.areaSubsidiaryId!);
        }
      }
    }
    return areasSubs
  }
  getRoles(){
    let as= this.rolesEntity.map( obj => {
      if(obj.status){
        return obj.roleId!;
      }else{
        return null;
      }
    }).filter((value): value is number => value !== null);
    return as;
 
  }

  addedUser(){
    let areaSubs = this.getAreaSubs();
    let roles = this.getRoles();

    if(roles.length === 0){
      this.showMessage("ROLES", false);
      return;
    }
    if(areaSubs.length === 0){
      this.showMessage("AREAS", false);
      return;
    }
    if(! this.userSelected){
      this.showMessage("USER_NOTFOUND", false);
      return;
    }

    let toSend = {
      userId: this.userSelected.id,
      areaSubsidiaryId  : areaSubs,
      roles: roles
    }
     
    const loading = this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '300px',
      height: '350px',
    });
   
    console.log(this.userSelected.id!, areaSubs, roles)
    this.userService.inviteUserWithData(this.userSelected.id!, areaSubs, roles).subscribe({
      next: response => {
        if(response.success){ 
          loading.close(); 
          const message = this.dialog.open(MessageDialogComponent,{
            data: {title: 'Invitación enviada correctamente', message: ""}
          });
          message.afterClosed().subscribe(result => {
            console.log('Dialog was closed. Result:', result);
            this.router.navigate(['/configuration-tap/5']);
          });
        }else{
          loading.close();
          const message = this.dialog.open(MessageDialogComponent,{
            data: {title: 'Ocurrio un error!', message: response.message}
          })
        }
      },
      error: error => {
     
        if(error.status == 400){

        }
        console.log(error.status)
        loading.close();
        const message = this.dialog.open(MessageDialogComponent,{
          data: {title: 'Ocurrio un error!', message: error.error.message}
        })
      }
    });
  }

  showMessage(indexString:string, canCancel:boolean){
    let nameAgeMapping = new Map<string, number>();
    nameAgeMapping.set("USER_NOTFOUND", 0);
    nameAgeMapping.set("AREAS", 1);
    nameAgeMapping.set("ROLES", 2);

    let index:number = nameAgeMapping.get(indexString)!
    const values = {
      title: ["Seleccionaste un usuario?", "No seleccionaste las áreas", "No seleccionaste los roles"],
      message: ["", "", ""],
      specified: ["", "", ""],
      cancelText: ["Cancelar","Cancelar","Cancelar"],
      okText: ["OK", "OK", "OK"],
      iconFaString: ["fa-regular fa-circle-xmark fa-beat", "fa-regular fa-circle-xmark fa-beat", "fa-regular fa-circle-xmark fa-beat"]
    }
    const dialogRef = this.dialog.open(AdviceModalComponent, {
      data:{
        title: values.title[index],
        message: values.message[index],
        specified: values.specified[index],
        canCancel: canCancel,
        cancelText: values.cancelText[index],
        okText: values.okText[index],
        iconFaString: values.iconFaString[index]
      },
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // User clicked 'Yes'
        // Perform the action here
      }
    })
  }
  cancel(){
    
    this.router.navigate(['/configuration-tap/5']);
  }
}
