import { Component, Input } from '@angular/core';
import { AccountDto } from 'src/app/dto/account.dto';

@Component({
  selector: 'app-account-plan-view',
  templateUrl: './account-plan-view.component.html',
  styleUrls: ['./account-plan-view.component.css']
})
export class AccountPlanViewComponent {

  @Input() accounts: AccountDto[];
  
  constructor() { }

  toggle(account: AccountDto) {
    account.isHidden = !account.isHidden;
  }

}
