import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
// Modulos
import { AleModule } from "./modules/AleModule";
import { AndreModule } from "./modules/AndreModule";
import { CarlosModule } from "./modules/CarlosModule";
import { MicaModule } from "./modules/MicaModule";
import { SebastianModule } from "./modules/SebastianModule";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Keycloak
import { initializeKeycloak } from '../app/config/keycloak.init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

// Componentes
// Navbar
import { NavbarComponent } from './components/navbar/navbar.component';

// General Componentes
import { ProfileCardComponent } from './components/general-components/profile-card/profile-card.component';
import { AdviceModalComponent } from './components/general-components/advice-modal/advice-modal.component';
// Configuración inicial
import { ProgressComponent } from './components/general-components/progress/progress.component';
import { Tap1Component } from './components/initial-config/tap1/tap1.component';
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import { Tap3Component } from './components/initial-config/tap3/tap3.component';
import { Tap4Component } from './components/initial-config/tap4/tap4.component';
import { CircularButtonComponent } from './components/general-components/circular-button/circular-button.component';
import { MyCompaniesComponent } from './components/my-companies/my-companies.component';
// Configuración
import { ConfigNavbarComponent } from './components/configuration/config-navbar/config-navbar.component';
import { ConfigurationTap1Component } from './components/configuration/configuration-tap1/configuration-tap1.component';
import { ConfigurationTap2Component } from './components/configuration/configuration-tap2/configuration-tap2.component';
import { ConfigurationTap3Component } from './components/configuration/configuration-tap3/configuration-tap3.component';
import { ConfigurationTap4Component } from './components/configuration/configuration-tap4/configuration-tap4.component';
import { ConfigurationTap5Component } from './components/configuration/configuration-tap5/configuration-tap5.component';
import { AddUsersAndPermissionsComponent } from './components/configuration/add-users-and-permissions/add-users-and-permissions.component';
import { UsersAndPermissionsComponent } from './components/configuration/users-and-permissions/users-and-permissions.component';
import { AccountComponent } from './components/configuration/account/account.component';
// Comprobantes contables
import { AccountingVoucherViewComponent } from './components/accounting-voucher/accounting-voucher-view/accounting-voucher-view.component';
import { AccountingVoucherAddComponent } from './components/accounting-voucher/accounting-voucher-add/accounting-voucher-add.component';
import { ComboBoxComponent } from './components/general-components/combo-box/combo-box.component';
// Reportes
import { ReportsComponent } from './components/reports/reports/reports.component';
import { DiaryBookFormComponent } from './components/reports/diary-book/diary-book-form/diary-book-form.component';
import { BalanceSheetComponent } from './components/reports/balance-sheet/balance-sheet-form/balance-sheet.component';
// Otras configuraciones
import { AuxiliaryAccountComponent } from './components/data/auxiliary-account/auxiliary-account.component';
import { EntityComponent } from './components/data/entity/entity.component';
import { CurrencyExchangeViewComponent } from './components/data/currency-exchange-view/currency-exchange-view.component';
import { CurrencyExchangeAddComponent } from './components/data/currency-exchange-add/currency-exchange-add.component';
import { LoadingComponent } from './components/general-components/loading/loading.component';
import { MessageDialogComponent } from './components/general-components/message.dialog/message.dialog.component';
import { AcceptDialogComponent } from './components/general-components/accept.dialog/accept.dialog.component';
import { GeneralLedgerFormComponent } from './components/reports/general-ledger/general-ledger-form/general-ledger-form.component';
import { StatementOfIncomeComponent } from './components/reports/statement-of-income/statement-of-income.component';
import { AccountCheckboxComponent } from './components/reports/reports-components/account-checkbox/account-checkbox.component';
import { BalanceCheckSumsAndBalancesComponent } from './components/reports/balance-check-sums-and-balances/balance-check-sums-and-balances.component';
import { AccountTreeComponent } from './components/initial-config/account-tree/account-tree.component';
import { HelpAndSupportComponent } from './components/help-and-support/help-and-support.component';
import { HomeComponent } from './components/home/home.component';
import { AccountPlanComponent } from './components/data/account-plan/account-plan.component';
import { AccountPlanViewComponent } from './components/data/account-plan-view/account-plan-view.component';
import { ClosingSheetComponent } from './components/closing-sheet/closing-sheet.component';
import { CurrencyExchangeEditComponent } from './components/data/currency-exchange-edit/currency-exchange-edit.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    CircularButtonComponent,
    ComboBoxComponent,
    ProgressComponent,
    Tap1Component,
    Tap2Component,
    Tap3Component,
    Tap4Component,
    NavbarComponent,
    ConfigNavbarComponent,
    ConfigurationTap1Component,
    ConfigurationTap2Component,
    ConfigurationTap3Component,
    ConfigurationTap4Component,
    AccountComponent,
    ConfigurationTap5Component,
    AddUsersAndPermissionsComponent,
    UsersAndPermissionsComponent,  
    ReportsComponent,
    DiaryBookFormComponent,
    BalanceSheetComponent,
    AccountingVoucherViewComponent,
    AccountingVoucherAddComponent,
    AuxiliaryAccountComponent,
    EntityComponent,
    CurrencyExchangeViewComponent,
    CurrencyExchangeAddComponent,
    ProfileCardComponent,
    AdviceModalComponent,
    LoadingComponent,
    MessageDialogComponent,
    AcceptDialogComponent,
    MyCompaniesComponent,
    GeneralLedgerFormComponent,
    StatementOfIncomeComponent,
    AccountCheckboxComponent,
    BalanceCheckSumsAndBalancesComponent,
    AccountTreeComponent,
    HelpAndSupportComponent,
    HomeComponent,
    AccountPlanComponent,
    AccountPlanViewComponent,
    ClosingSheetComponent,
    CurrencyExchangeEditComponent,
    UnauthorizedComponent,
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatTableModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    AleModule,
    AndreModule,
    CarlosModule,
    MicaModule,
    SebastianModule,
    KeycloakAngularModule,
    MatDialogModule ,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatProgressBarModule,
   ],
   providers: [
     {
       provide: APP_INITIALIZER,
       useFactory: initializeKeycloak,
       multi: true,
       deps: [KeycloakService]
     }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
