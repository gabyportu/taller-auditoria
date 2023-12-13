import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RolesDtoResponse,
  SubsidiaryDtoResponse,
  UserSearcherDto,
} from 'src/app/dto/areasubsroles.dto';
import { EmployeeDto } from 'src/app/dto/userinvitation.dto';
import { UserService } from 'src/app/services/user.service';
import { AdviceModalComponent } from '../../general-components/advice-modal/advice-modal.component';
import { LoadingComponent } from '../../general-components/loading/loading.component';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';

@Component({
  selector: 'app-users-and-permissions',
  templateUrl: './users-and-permissions.component.html',
  styleUrls: ['./users-and-permissions.component.css'],
})
export class UsersAndPermissionsComponent {
  

  user: EmployeeDto = {
    email: "",
    employeeId: 0,
    name: "",
    urlProfilePicture: ""
  };
  subsidiaries: SubsidiaryDtoResponse[];
  roles: RolesDtoResponse[];

  constructor(
    private router: Router,
    private routeActivated: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.routeActivated.params.subscribe((params) => {
      const userParam: number = params['user'];

      this.userService.getSummInfoUserByIdAndCompany(userParam).subscribe({
        next: (response) => {
          if (response.data) {
            console.log(response.data)
            this.user = response.data;
          }
        },
        error: (error) => {
          console.log('Error ', error);
        },
      });

      this.userService
        .getPermissionAndRolesByUserAndCompany(userParam)
        .subscribe({
          next: (response) => {
            if (response.data) {
              this.subsidiaries = response.data.areasAndSubs;
              this.roles = response.data.roles;
            }
          },
          error: (error) => {
            console.log('Error ', error);
          },
        });
    });
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
    let as= this.roles.map( obj => {
      if(obj.status){
        return obj.roleId!;
      }else{
        return null;
      }
    }).filter((value): value is number => value !== null);
    return as;
 
  }

  update(){
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
     
    // loading
    const loading = this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '300px',
      height: '350px',
    });


    this.userService.updatePermissions(this.user.employeeId, areaSubs, roles).subscribe({
      next: response => {
        if(response.success){ 
          loading.close(); 
          const message = this.dialog.open(MessageDialogComponent,{
            data: {title: 'Permisos actualizados correctamente', message: ""}
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
        loading.close();
        const message = this.dialog.open(MessageDialogComponent,{
          data: {title: 'Ocurrio un error!', message: "No se pudo comunicar con el servidor, intente de nuevo más tarde"}
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
  cancel() {
    this.router.navigate(['/configuration-tap/5']);
  }

  getImageProfile(path: string | null | undefined) {
    if(path == undefined){
      return '../../../assets/pfp.svg';
    }
    if (path != null && path.trim().length > 0) {
      return path;
    }
    return '../../../assets/pfp.svg';
  }

  
  onAreaChange(currentSub: number, currentArea: number) {
    this.subsidiaries[currentSub].status = this.allAreaEquals(currentSub);
  }
  allAreaEquals(currentSub: number) {
    for (let area of this.subsidiaries[currentSub].areas) {
      if (!area.status) {
        return false;
      }
    }
    return true;
  }
  
  onSubsidiaryChange(currentSub: number) {
    for (let area of this.subsidiaries[currentSub].areas) {
      area.status = this.subsidiaries[currentSub].status;
    }
  }
}
