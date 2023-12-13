import { Component, Input } from '@angular/core';
import { newAccountDto } from 'src/app/dto/newAccount.dto';

@Component({
  selector: 'app-account-tree',
  templateUrl: './account-tree.component.html',
  styleUrls: ['./account-tree.component.css']
})
export class AccountTreeComponent {
  @Input() accounts: newAccountDto[]; // Recibe la lista de cuentas desde el componente padre

  constructor() {}

  accountName: string = "";
  digitsLevel: number = 1;
  accountMoneyRub: boolean = true;
  newAccount: newAccountDto = {
    accountCode: 0,
    nameAccount: '',
    moneyRub: false,
    report: false,
    classificator: false,
    level: 0,
    childrenAccounts: [],
    expanded: false,
    digitsOfLevel: 0,
    showAddPopup: false,
    showEditPopup: false,
    parent: undefined
  };

  // Función para mostrar el popup de agregar una nueva cuenta
  showAddPopupChange(parentAccount: newAccountDto) {
    //console.log(parentAccount);
    parentAccount.showAddPopup = !parentAccount.showAddPopup;
  }

  // Función para agregar un nuevo nivel
  addLevel(parentAccount: newAccountDto) {
    parentAccount.expanded = true;
    this.newAccount.nameAccount = this.accountName;
    if(parentAccount.childrenAccounts.length == 0) {
      if (this.digitsLevel == undefined){
        this.digitsLevel = 1;
      }
      this.newAccount.digitsOfLevel = this.digitsLevel;
      const codeAccount = parentAccount.accountCode+""+Math.pow(10, this.digitsLevel - 1);
      this.newAccount.accountCode = parseInt(codeAccount);
    } else {
      this.newAccount.digitsOfLevel = parentAccount.childrenAccounts[0].digitsOfLevel;
      const lastAccount = parentAccount.childrenAccounts[parentAccount.childrenAccounts.length - 1];
      this.newAccount.accountCode = lastAccount.accountCode + 1;
    }
    this.newAccount.moneyRub = this.accountMoneyRub;
    this.newAccount.report = parentAccount.report;
    parentAccount.classificator = true;
    this.newAccount.level = parentAccount.level + 1;
    this.newAccount.parent = parentAccount;
    parentAccount.childrenAccounts.push(this.newAccount);
    this.reset();
    this.showAddPopupChange(parentAccount);
  }

  reset(){
    this.newAccount = {
      accountCode: 0,
      nameAccount: '',
      moneyRub: false,
      report: false,
      classificator: false,
      level: 0,
      childrenAccounts: [],
      expanded: false,
      digitsOfLevel: 0,
      showAddPopup: false,
      showEditPopup: false,
      parent: undefined
    }
    this.accountName = "";
    this.digitsLevel = 1;
    this.accountMoneyRub = true;
  }
  

  // Función para expandir/ocultar hijos
  toggleChildrenVisibility(account: newAccountDto) {
    account.expanded = !account.expanded;
  }

  showEditPopup: boolean = false;
  accountReport: boolean = false;
  // Función para mostrar el popup de editar cuenta
  showEditPopupChange(account: newAccountDto) {
    this.accountReport = account.report;
    console.log(account);
    if (account.showEditPopup == false) {
      this.accountName = account.nameAccount;
      this.accountMoneyRub = account.moneyRub;
    } else {
      this.accountName = "";
      this.accountMoneyRub = true;
    }
    account.showEditPopup = !account.showEditPopup;
  }

  // Función para editar una cuenta
  editAccount(account: newAccountDto) {
    account.nameAccount = this.accountName;
    account.moneyRub = this.accountMoneyRub;
    if (account.level == 0) {
      if (account.report != this.accountReport) {
        this.changeReport(account, this.accountReport);
      }
    }
    this.showEditPopupChange(account);
  }
  changeReport(account: newAccountDto, report: boolean) {
    account.report = report;
    if (account.childrenAccounts.length > 0) {
      for (let i = 0; i < account.childrenAccounts.length; i++) {
        this.changeReport(account.childrenAccounts[i], report);
      }
    }
  }

  // Función para eliminar un nivel (cuenta o padre)
  deleteAccount(account: newAccountDto) {
    const parentAccount = account.parent;
    if (parentAccount != undefined) {
      const index = parentAccount.childrenAccounts.indexOf(account);
      parentAccount.childrenAccounts.splice(index, 1);
      if (parentAccount.childrenAccounts.length === 0) {
        parentAccount.classificator = false;
      } else {
        this.recalculateCodes(parentAccount.childrenAccounts, parentAccount.accountCode);
      }
    } else {
      // No hay padre, es una cuenta de nivel superior (primer nivel)
      const index = this.accounts.indexOf(account);
      this.accounts.splice(index, 1);

      // Si es una cuenta de primer nivel, también necesitas reorganizar los códigos de las cuentas restantes
      this.recalculateTopLevelCodes();
    }
  }

  recalculateCodes(accounts: newAccountDto[], parentCode: number) {
    //console.log(accounts);
    const digitsLevel = accounts[0].digitsOfLevel;
    const firstCode = parseInt(parentCode+""+Math.pow(10, digitsLevel - 1));
    for (let i = 0; i < accounts.length; i++) {
      if (i == 0){
        accounts[i].accountCode = firstCode;
      } else {
        accounts[i].accountCode = accounts[i-1].accountCode + 1;
      }
      if (accounts[i].childrenAccounts.length > 0) {
        this.recalculateCodes(accounts[i].childrenAccounts, accounts[i].accountCode);
      }
    }
  }

  recalculateTopLevelCodes() {
    const digitsLevel = this.accounts[0].digitsOfLevel;
    const firstCode = Math.pow(10, digitsLevel - 1);
  
    for (let i = 0; i < this.accounts.length; i++) {
      this.accounts[i].accountCode = firstCode + i;
      if (this.accounts[i].childrenAccounts.length > 0) {
        this.recalculateCodes(this.accounts[i].childrenAccounts, this.accounts[i].accountCode);
      }
    }
  }
}
