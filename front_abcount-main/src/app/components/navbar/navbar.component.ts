import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  urlPfp = "../.././../assets/pfp.svg";
  isDropdownOpen = false;
  isDropdownOpen2 = false;
  isDropdownOpen3 = false;
  companyId = "0";
  companyName = "Empresa";

  constructor(private keycloak: KeycloakService, private route: Router) { }

  ngOnInit(): void {
    this.companyId = localStorage.getItem('companyId') || "0";
    this.companyName = localStorage.getItem('companyName') || "Empresa";
    this.urlPfp = `${environment.BACKEND_URL}/image/company/${this.companyId}`;
  }

  logout() {
    localStorage.clear();
    //this.route.navigate(["/"])
    this.keycloak.logout("http://localhost:4200");
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdown2() {
    this.isDropdownOpen2 = !this.isDropdownOpen2;
  }

  toggleDropdown3() {
    this.isDropdownOpen3 = !this.isDropdownOpen3;
  }

  auxiliarFlag: boolean = false;
  auxiliarFlagChange() {
    this.auxiliarFlag = !this.auxiliarFlag;
  }

  entityFlag: boolean = false;
  entityFlagChange() {
    this.entityFlag = !this.entityFlag;
  }

  accountPlanFlag: boolean = false;
  accountPlanFlagChange() {
    this.accountPlanFlag = !this.accountPlanFlag;
  }

  exchangeFlag: boolean = false;
  exchangeFlagChange() {
    this.exchangeFlag = !this.exchangeFlag;
  }

}
