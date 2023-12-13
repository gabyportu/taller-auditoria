import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-my-button-squared',
  templateUrl: './my-button-squared.component.html',
  styleUrls: ['./my-button-squared.component.css']
})
export class MyButtonSquaredComponent {

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }


}
