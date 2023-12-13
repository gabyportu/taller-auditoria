import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-account-plan',
  templateUrl: './account-plan.component.html',
  styleUrls: ['./account-plan.component.css']
})
export class AccountPlanComponent {

  @Input() flag: boolean = false;
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  accountPlan: any[] = []; // Plan de cuentas

  constructor(private ConfigurationService: ConfigurationService) {
    this.ConfigurationService.getAccountsPlan().subscribe(
      (data: any) => {
        this.accountPlan = data.data;
      }
    );
  }

}
