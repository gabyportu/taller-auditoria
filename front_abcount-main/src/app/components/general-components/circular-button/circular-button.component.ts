import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-circular-button',
  templateUrl: './circular-button.component.html',
  styleUrls: ['./circular-button.component.css']
})
export class CircularButtonComponent {

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

}
