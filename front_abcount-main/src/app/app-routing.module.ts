import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCompaniesComponent } from './components/my-companies/my-companies.component';
import { HomeComponent } from './components/home/home.component';
import { Tap1Component } from "./components/initial-config/tap1/tap1.component";
import { Tap2Component } from './components/initial-config/tap2/tap2.component';
import { Tap3Component } from "./components/initial-config/tap3/tap3.component";
import { Tap4Component } from "./components/initial-config/tap4/tap4.component";
import { ConfigurationTap1Component } from "./components/configuration/configuration-tap1/configuration-tap1.component";
import { ConfigurationTap2Component } from './components/configuration/configuration-tap2/configuration-tap2.component';
import { ConfigurationTap3Component } from './components/configuration/configuration-tap3/configuration-tap3.component';
import { ConfigurationTap4Component } from './components/configuration/configuration-tap4/configuration-tap4.component';
import { ConfigurationTap5Component } from './components/configuration/configuration-tap5/configuration-tap5.component';
import { AddUsersAndPermissionsComponent } from './components/configuration/add-users-and-permissions/add-users-and-permissions.component';
import { UsersAndPermissionsComponent } from './components/configuration/users-and-permissions/users-and-permissions.component';
import { AccountingVoucherViewComponent } from "./components/accounting-voucher/accounting-voucher-view/accounting-voucher-view.component";
import { AccountingVoucherAddComponent } from "./components/accounting-voucher/accounting-voucher-add/accounting-voucher-add.component";
import { ReportsComponent } from './components/reports/reports/reports.component';
import { StatementOfIncomeComponent } from './components/reports/statement-of-income/statement-of-income.component';
import { HelpAndSupportComponent } from './components/help-and-support/help-and-support.component';
import { ClosingSheetComponent } from './components/closing-sheet/closing-sheet.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/my-companies', pathMatch: 'full'},
  //{ path: 'my-companies', component: MyCompaniesComponent, data: { roles: ['USER'], useCompany:true }, canActivate: [AuthGuard]},
  { path: 'my-companies', component: MyCompaniesComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'initial-config',
    children: [
      { path: 'tap1', component: Tap1Component },
      { path: 'tap2', component: Tap2Component },
      { path: 'tap3', component: Tap3Component },
      { path: 'tap4', component: Tap4Component }
    ],
  },
  {
    path: 'configuration-tap' ,data: { roles: ['CAN_ACCESS_CONFIGURATION'], useCompany:true }, canActivate: [AuthGuard] ,
    //path: 'configuration-tap' ,
    children: [
      { path: '1', component: ConfigurationTap1Component },
      { path: '2', component: ConfigurationTap2Component },
      { path: '3', component: ConfigurationTap3Component },
      { path: '4', component: ConfigurationTap4Component },
      { path: '5', component: ConfigurationTap5Component },
    ],
  },
  { path: 'add-users-and-permissions', component: AddUsersAndPermissionsComponent , data: { roles: ['CAN_MANAGE_USERS'], useCompany:true }, canActivate: [AuthGuard] },
  //{ path: 'add-users-and-permissions', component: AddUsersAndPermissionsComponent  },
  { path: ':user/users-and-permissions', component: UsersAndPermissionsComponent , data: { roles: ['CAN_MANAGE_USERS'], useCompany:true }, canActivate: [AuthGuard]},
  {
    path: 'accounting-voucher',
    children: [
      { path: 'view', component: AccountingVoucherViewComponent, data: { roles: ['CAN_VIEW_EXCHANGE'], useCompany:true }, canActivate: [AuthGuard] },
      { path: 'add', component: AccountingVoucherAddComponent , data: { roles: ['CAN_ADD_EXCHANGE'], useCompany:true }, canActivate: [AuthGuard] },
    ],
  },
  { path: 'reports', component: ReportsComponent, data: { roles: ['CAN_DO_ANYTHING_WITH_REPORTS'], useCompany:true }, canActivate: [AuthGuard]},
  { path: 'statement-of-income', component: StatementOfIncomeComponent},
  { path: 'help-and-support',component: HelpAndSupportComponent},
  { path: 'closing-sheet', component: ClosingSheetComponent,  data: { roles: ['CAN_CLOSE_ANY'], useCompany:true }, canActivate: [AuthGuard]},
  { path: 'error', component: UnauthorizedComponent},
  { path: 'my-profile', component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
