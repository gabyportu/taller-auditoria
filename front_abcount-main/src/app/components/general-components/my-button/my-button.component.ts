import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent {

  @Input() isGreen: boolean = true;
  @Input() isRed: boolean = false;

}
