import { Component, Input } from '@angular/core';
import { AccountDto } from 'src/app/dto/account.dto';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  @Input() accounts: AccountDto[];
  
  constructor() { }

  toggle(account: AccountDto) {
    account.isHidden = !account.isHidden;
  }
  
}
