import { Component } from '@angular/core';
import { EmployeeDto, InvitedDto } from 'src/app/dto/userinvitation.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-configuration-tap5',
  templateUrl: './configuration-tap5.component.html',
  styleUrls: ['./configuration-tap5.component.css']
})
export class ConfigurationTap5Component {
 
 
  constructor(private UserServices: UserService) { }
  //users: any[]=[];
  //Datos quemados en frotend
  
  employee :EmployeeDto[] = []
  invitation: InvitedDto[] = []
   

  ngOnInit() {
    // get users and invited
     this.UserServices.getUsersAndInvitedByCompanyId().subscribe(
       (data) => {
        if(data.data){
          this.invitation = data.data.invitation;
          this.employee = data.data.employee;
        }
                
       }
     );
  }
  updateList(){
    this.UserServices.getUsersAndInvitedByCompanyId().subscribe(
      (data) => {
       if(data.data){
         this.invitation = data.data.invitation;
         this.employee = data.data.employee;
       }
               
      }
    );
  }
  // Lógica para eliminar un usuario
  Eliminar(id: any){
    console.log("Usuario eliminado",id)
    this.UserServices.removeUser(id).subscribe(
      (data: any) => {
        console.log(data)
        this.updateList();
      }
    );
  }
  getImageProfile(path: string | null){
    if(path != null && path.trim().length > 0){
      return path
    }
    return "../../../assets/pfp.svg"
  }

  EliminarInvitation(invitationId: number, invitedId: number){ 
    this.UserServices.cancelInvitation(invitedId, invitationId).subscribe(
      (data: any) => {
        console.log(data)
        this.updateList();
      }
    );
  }
}
