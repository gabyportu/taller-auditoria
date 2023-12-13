import { Component, Input } from '@angular/core';
import { faDatabase, faBuilding, faCogs, faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  
  @Input() steps: number[] = [];
  @Input() currentStep: number = 0;

  icons = [faDatabase, faBuilding, faCogs, faFolder];
  subtitles = ['Datos', 'Sucursales y Áreas', 'General', 'Plan de Cuentas'];

  getIcon(index: number) {
    return this.icons[index];
  }

  isLast(index: number): boolean {
    return index === this.steps.length - 1;
  }
}
