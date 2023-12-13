import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-config-navbar',
  templateUrl: './config-navbar.component.html',
  styleUrls: ['./config-navbar.component.css']
})
export class ConfigNavbarComponent {

  @Input() numberOption: number = 1;
  
}
