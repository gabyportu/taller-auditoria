import { Component , Inject} from '@angular/core';
import { faDatabase, faBuilding, faCogs, faFolder } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-advice-modal',
  templateUrl: './advice-modal.component.html',
  styleUrls: ['./advice-modal.component.css']
})
export class AdviceModalComponent {
  constructor(private dialogRef: MatDialogRef<AdviceModalComponent>,
  
  @Inject(MAT_DIALOG_DATA) public data:{
    title: string, message: string ,
     specified:string, canCancel: boolean,
    cancelText:string, okText:string,
    iconFaString:string
  }) { }

  
  icons = [faDatabase, faBuilding, faCogs, faFolder];

  onConfirm(): void {
    this.dialogRef.close(true); // Close the dialog with a 'true' result
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog with a 'false' result
  }
}
