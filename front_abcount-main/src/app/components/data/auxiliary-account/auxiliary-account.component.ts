import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuxiliaryDto } from "../../../dto/auxiliary.dto";
import { DataService } from "../../../services/data.service";
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auxiliary-account',
  templateUrl: './auxiliary-account.component.html',
  styleUrls: ['./auxiliary-account.component.css']
})
export class AuxiliaryAccountComponent {

  auxiliaryForm: FormGroup;
  auxiliary: AuxiliaryDto[] = [];
  newAuxiliary: AuxiliaryDto ={ auxiliaryCode: '', auxiliaryName: '' };
  columnsToDisplay = ['nro', 'codigo', 'nombre', 'acciones'];

  auxiliaryCode = { labelAuxiliaryCode: 'Codigo', placeholderAuxiliaryCode: 'Ingrese el codigo del auxiliar'};
  auxiliaryName = { labelAuxiliaryName: 'Nombre', placeholderAuxiliaryName: 'Ingrese el nombre del auxiliar'};

  controlAuxiliaryCode = new FormControl;

  controlAuxiliaryName = new FormControl;
  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';

  selectedAuxiliary?: AuxiliaryDto;

  constructor(private dataService: DataService, private dialog: MatDialog, private route: Router) {
  }

  addAuxiliary(auxiliaryData: AuxiliaryDto): void {
    this.dataService.createAuxiliary(auxiliaryData).subscribe({
      next: (data) => {
        if(data.success){
          this.controlAuxiliaryCode.reset();
          this.controlAuxiliaryName.reset();
          this.auxiliary = data.data!;
        }else{
          const message = this.dialog.open(MessageDialogComponent, {
            data: {title: 'Ocurrio un error!', message: data.message}
          });
        }
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          disableClose: true,
          data: {title: 'Ocurrio un error!', message: "No se pudo agregar el auxiliar"}
        });

        message.afterClosed().subscribe(() => {
          window.location.reload();
        })
      }
    }
    );
  }


  addOrUpdateAuxiliary(): void {
    const auxiliaryData: AuxiliaryDto = {
      auxiliaryCode: this.controlAuxiliaryCode.value,
      auxiliaryName: this.controlAuxiliaryName.value
    };

    if (this.selectedAuxiliary) {
      auxiliaryData.auxiliaryId = this.selectedAuxiliary.auxiliaryId;
      this.editAuxiliary(auxiliaryData);
    } else {
      this.addAuxiliary(auxiliaryData);
    }
  }


  getAuxiliaries(): void {
    this.dataService.getAllAuxiliaries().subscribe({
      next: (data) => {
        this.auxiliary = data.data!;
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          disableClose: true,
          data: {title: 'Ocurrio un error!', message: "No se pudo obtener los datos de los auxiliares"}
        });

        message.afterClosed().subscribe(() => {
          this.route.navigate(['/configuration-tap/1']);
        })
      }
    });
  }
  editAuxiliary(auxiliary: AuxiliaryDto): void {
    this.dataService.updateAuxiliary(auxiliary).subscribe({
      next: (data) => {
        if(data.success){
          this.auxiliary = data.data!;
          this.cancelEdit();
        }else{
          const message = this.dialog.open(MessageDialogComponent, {
            data: {title: 'Ocurrio un error!', message: data.message}
          });
        }
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          disableClose: true,
          data: {title: 'Ocurrio un error!', message: "No se pudo actualizar el auxiliar:" + auxiliary.auxiliaryId}
        });
        message.afterClosed().subscribe(() => {
          window.location.reload();
        })
        this.cancelEdit();
      },
    }
    );
    
  }

  deleteAuxiliary(auxiliary: AuxiliaryDto): void {
    this.dataService.deleteAuxiliary(auxiliary.auxiliaryId!).subscribe(
      () => {
        this.auxiliary = this.auxiliary.filter(a => a.auxiliaryId !== auxiliary.auxiliaryId);
      },
      error => {
        console.error('Error deleting auxiliary', error);
      }
    );
  }

  loadAuxiliaryForEdit(auxiliary: AuxiliaryDto): void {
    console.log(auxiliary.auxiliaryId);
    this.selectedAuxiliary = { ...auxiliary };
    this.controlAuxiliaryCode.setValue(this.selectedAuxiliary.auxiliaryCode);
    this.controlAuxiliaryName.setValue(this.selectedAuxiliary.auxiliaryName);
  }

  cancelEdit(): void {
    this.selectedAuxiliary = undefined;
    this.controlAuxiliaryCode.reset();
    this.controlAuxiliaryName.reset();
  }

  ngOnInit(): void{
    this.getAuxiliaries();
  }

  @Input() flag: boolean = false;
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

}