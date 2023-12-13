import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})

export class ComboBoxComponent {
  
  @Input() selectedOption: any;
  @Input() options: any[];
  @Output() optionSelected = new EventEmitter<any>();

  isOpen = false;

  toggleOptions() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.isOpen = false;
    this.optionSelected.emit(option);
  }
}