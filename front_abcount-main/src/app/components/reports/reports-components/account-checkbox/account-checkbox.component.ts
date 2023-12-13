import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-checkbox',
  templateUrl: './account-checkbox.component.html',
  styleUrls: ['./account-checkbox.component.css']
})
export class AccountCheckboxComponent {

  @Input() accounts: any[];
  
  constructor() { }

  toggle(account: any) {
    account.isHidden = !account.isHidden;
  }

  updateChildAccounts(account: any, isChecked: boolean) {
    account.isChecked = isChecked;
    if (account.childrenAccounts && account.childrenAccounts.length > 0) {
      account.childrenAccounts.forEach((childAccount: any) => {
        this.updateChildAccounts(childAccount, isChecked);
      });
    }
  }  

}
