import { Component, EventEmitter, Input, Output } from '@angular/core';
import {AuxiliaryDto} from "../../../dto/auxiliary.dto";
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {EntityDto} from "../../../dto/entity.dto";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent {
  entity: EntityDto[] = [];
  columnsToDisplay = ['nro', 'nombre', 'nit', 'razonSocial', 'extranjera', 'acciones'];

  controlEntityName = new FormControl();
  controlEntityNit = new FormControl();
  controlEntitySocialReason = new FormControl();
  controlEntityForeign = new FormControl(false); // checkbox

  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';

  selectedEntity?: EntityDto;

  constructor(private dataService: DataService, private dialog: MatDialog, private route: Router) {}

  addEntity(entityData: EntityDto): void {
    this.dataService.createEntity(entityData).subscribe({
      next: (data) =>{
        this.controlEntityName.reset();
        this.controlEntityNit.reset();
        this.controlEntitySocialReason.reset();
        this.controlEntityForeign.reset();
        this.entity = data.data!;
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          data: {title: 'Ocurrio un error!', message: "No se pudo agregar la entidad"}
        });

        message.afterClosed().subscribe(() => {
          window.location.reload();
        })

      }
    }
    );
  }

  editEntity(entity: EntityDto): void {
    this.dataService.updateEntity(entity).subscribe({
      next: (data) =>{
        this.entity = data.data!;
        this.cancelEdit();
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          data: {title: 'Ocurrio un error!', message: "No se pudo editar la entidad"+entity.entityId}
        });

        message.afterClosed().subscribe(() => {
          window.location.reload();
        })
      }
    }
      
    );
  }

  deleteEntity(entity: EntityDto): void {
    this.dataService.deleteEntity(entity.entityId!).subscribe(
      () => {
        this.entity = this.entity.filter(e => e.entityId !== entity.entityId);
      },
      error => {
        console.error('Error deleting entity', error);
      }
    );
  }

  loadEntityForEdit(entity: EntityDto): void {
    console.log(entity.entityId);
    this.selectedEntity = { ...entity };
    this.controlEntityName.setValue(this.selectedEntity.entityName);
    this.controlEntityNit.setValue(this.selectedEntity.entityNit);
    this.controlEntitySocialReason.setValue(this.selectedEntity.entitySocialReason);
    this.controlEntityForeign.setValue(this.selectedEntity.foreign);
  }

  addOrUpdateEntity(): void {
    const entityData: EntityDto = {
      entityName: this.controlEntityName.value,
      entityNit: this.controlEntityNit.value,
      entitySocialReason: this.controlEntitySocialReason.value,
      foreign: this.controlEntityForeign.value || false

    };

    if (this.selectedEntity) {
      entityData.entityId = this.selectedEntity.entityId;
      this.editEntity(entityData);
      this.selectedEntity = undefined; // Reset after editing
    } else {
      this.addEntity(entityData);
    }
  }

  cancelEdit(): void {
    this.selectedEntity = undefined;
    this.controlEntityNit.reset();
    this.controlEntityName.reset();
    this.controlEntitySocialReason.reset();
    this.controlEntityForeign.reset();
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.dataService.getAllEntities().subscribe({
      next: (data) => {
        this.entity = data.data!;
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          data: {title: 'Ocurrio un error!', message: "No se pudo obtener las entidades"}
        });

        message.afterClosed().subscribe(() => {
          this.route.navigate(['/configuration-tap/1']);
        })
      }
    });
  }

  @Input() flag: boolean = false;
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }
}
