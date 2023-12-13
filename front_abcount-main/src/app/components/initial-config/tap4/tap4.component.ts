import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormStateService } from "../../../services/form-state.service";
import { Router } from '@angular/router';
import { newAccountDto } from 'src/app/dto/newAccount.dto';

interface Account {
  accountCode: number;
  nameAccount: string;
  moneyRub: boolean;
  report: boolean;
  classificator: boolean;
  level: number;
  childrenAccounts: Account[];
}

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.component.html',
  styleUrls: ['./tap4.component.css']
})

export class Tap4Component {

  accountPlan: newAccountDto[] = [
    {
      accountCode: 1,
      nameAccount: 'Activo',
      moneyRub: true,
      report: true,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 101,
          nameAccount: 'Activo Corriente',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 10101,
              nameAccount: 'Disponible',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 1010101,
                  nameAccount: 'Caja',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 1010101001,
                      nameAccount: 'Caja Moneda Nacional',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 1010101002,
                      nameAccount: 'Caja Moneda Extranjera',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 1010102,
                  nameAccount: 'Bancos',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 1010102001,
                      nameAccount: 'Banco Bisa MN',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 1010102002,
                      nameAccount: 'Banco Bisa ME',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            },
            {
              accountCode: 10102,
              nameAccount: 'Creditos O Exigible',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 1010201,
                  nameAccount: 'Cuentas Por Cobrar',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 1010201001,
                      nameAccount: 'Cuentas Por Cobrar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 1010202,
                  nameAccount: 'Impuestos Anticipados',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 1010202001,
                      nameAccount: 'Credito Fiscal IVA',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 1010202002,
                      nameAccount: 'IUE Por Compensar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            },
          ],
        },
        {
          accountCode: 102,
          nameAccount: 'Activo no corriente',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 10201,
              nameAccount: 'Bienes de uso',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 1020101,
                  nameAccount: 'Muebles y Enseres',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 10201001,
                      nameAccount: 'Muebles y Enseres',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 10201002,
                      nameAccount: 'Depreciación Acum. Muebles y Enseres',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 1020102,
                  nameAccount: 'Equipo De Computación',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 1020102001,
                      nameAccount: 'Equipo de computación',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 1020102002,
                      nameAccount: 'Depreciación Acum. Equipo De Computación',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            }
          ],
        }
      ],
    },
    {
      accountCode: 2,
      nameAccount: 'Pasivo',
      moneyRub: true,
      report: true,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 201,
          nameAccount: 'Pasivo Corriente',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 20101,
              nameAccount: 'Deudas Comerciales',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 2010101,
                  nameAccount: 'Cuentas por pagar',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 2010101001,
                      nameAccount: 'Cuentas por pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            },
            {
              accountCode: 20102,
              nameAccount: 'Deudas Fiscales',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 2010201,
                  nameAccount: 'Obligaciones Tributarias',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 2010201001,
                      nameAccount: 'Debito Fiscal IVA',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010201002,
                      nameAccount: 'Impuesto A Las Trans. Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010201003,
                      nameAccount: 'IUE Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            },
            {
              accountCode: 20103,
              nameAccount: 'Deudas Sociales',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 2010301,
                  nameAccount: 'Obligaciones Con El Personal',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 2010301001,
                      nameAccount: 'Sueldos Y Salarios Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010301002,
                      nameAccount: 'Aguinaldos Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 2010302,
                  nameAccount: 'Aportes Laborales Por Pagar',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 2010302001,
                      nameAccount: 'Cuenta Individual A.F.P Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010302002,
                      nameAccount: 'Riesgo Común Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010302003,
                      nameAccount: 'Comisión A.F.P Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010302004,
                      nameAccount: 'Aporte Patronal Solidario Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 2010303,
                  nameAccount: 'Aportes Patronales Por Pagar',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 2010303001,
                      nameAccount: 'Caja Nacional De Salud Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010303002,
                      nameAccount: 'Riesgo Profesional Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010303003,
                      nameAccount: 'Provivienda Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 2010303004,
                      nameAccount: 'Aporte Patronal Por Solidario Por Pagar',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            }
          ],
        },
        {
          accountCode: 202,
          nameAccount: 'Pasivo No Corriente',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 20201,
              nameAccount: 'Reservas Y Provisiones',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 2020101,
                  nameAccount: 'Provisiones',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 2020101001,
                      nameAccount: 'Previsión Para la Indemnización',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            }
          ],
        }
      ],
    },
    {
      accountCode: 3,
      nameAccount: 'Patrimonio',
      moneyRub: true,
      report: true,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 301,
          nameAccount: 'Capital',
          moneyRub: true,
          report: true,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 30101,
              nameAccount: 'Capital Social',
              moneyRub: true,
              report: true,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 3010101,
                  nameAccount: 'Capital Social',
                  moneyRub: true,
                  report: true,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 3010101001,
                      nameAccount: 'Capital Social',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 3010101002,
                      nameAccount: 'Ajuste De Capital',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 3010101003,
                      nameAccount: 'Reservas Patrimoniales',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 3010101004,
                      nameAccount: 'Ajuste De Reservas Patrimoniales',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 3010101005,
                      nameAccount: 'Resultados Acumulados',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 3010101006,
                      nameAccount: 'Resultado De La Gestión',
                      moneyRub: true,
                      report: true,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            }
          ],
        }
      ],
    },
    {
      accountCode: 4,
      nameAccount: 'Ingresos',
      moneyRub: true,
      report: false,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 401,
          nameAccount: 'Ingresos',
          moneyRub: true,
          report: false,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 40101,
              nameAccount: 'Ingresos Ordinarios',
              moneyRub: true,
              report: false,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 4010101,
                  nameAccount: 'Ventas Netas',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 4010101001,
                      nameAccount: 'Ventas',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 4010101002,
                      nameAccount: 'Descuento Sobre Ventas',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            },
            {
              accountCode: 40102,
              nameAccount: 'Ingresos No Operativos',
              moneyRub: true,
              report: false,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 4010201,
                  nameAccount: 'Ingresos No Monetarios',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 4010201001,
                      nameAccount: 'Ajuste Por Inflación Y Tenencia De Bienes',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            }
          ],
        }
      ]
    },
    {
      accountCode: 5,
      nameAccount: 'Gastos',
      moneyRub: true,
      report: false,
      classificator: true,
      level: 0,
      expanded: true,
      digitsOfLevel: 1,
      showAddPopup: false,
      showEditPopup: false,
      childrenAccounts: [
        {
          accountCode: 501,
          nameAccount: 'Costos',
          moneyRub: true,
          report: false,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 50101,
              nameAccount: 'Costo De Ventas',
              moneyRub: true,
              report: false,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 5010101,
                  nameAccount: 'Costos De Ventas',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5010101001,
                      nameAccount: 'Costo De Ventas',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 5010102,
                  nameAccount: 'Compras Netas',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5010102001,
                      nameAccount: 'Compras',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5010102002,
                      nameAccount: 'Descuento Sobre Compras',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            }
          ],
        },
        {
          accountCode: 502,
          nameAccount: 'Gastos Operativos',
          moneyRub: true,
          report: false,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 50201,
              nameAccount: 'Gastos De Operación',
              moneyRub: true,
              report: false,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 5020101,
                  nameAccount: 'Servicios Personales',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5020101001,
                      nameAccount: 'Sueldos Y Salarios',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020101002,
                      nameAccount: 'Honorarios Profesionales',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 5020102,
                  nameAccount: 'Cargas  Sociales',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5020102001,
                      nameAccount: 'Cargas Sociales',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020102002,
                      nameAccount: 'Aguinaldo',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020102003,
                      nameAccount: 'Indemnización',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 5020103,
                  nameAccount: 'Servicios Basicos',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5020103001,
                      nameAccount: 'Energia Electrica',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020103002,
                      nameAccount: 'Agua Y Alcantarillado',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020103003,
                      nameAccount: 'Servicios Telefonicos',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 5020104,
                  nameAccount: 'Gastos Administrativos',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5020104001,
                      nameAccount: 'Gastos Generales',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020104002,
                      nameAccount: 'Material De Escritorio',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 5020105,
                  nameAccount: 'Impositivos',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5020105001,
                      nameAccount: 'Impuesto A Las Transacciones',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020105002,
                      nameAccount: 'Impuestos Sobre La Utilidad',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                },
                {
                  accountCode: 5020106,
                  nameAccount: 'Depreciaciones',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5020106001,
                      nameAccount: 'Depreciación Muebles Y Enseres',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    },
                    {
                      accountCode: 5020106002,
                      nameAccount: 'Depreciación Equipo De Computación',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ],
                }
              ],
            }
          ],
        },
        {
          accountCode: 503,
          nameAccount: 'Gastos No Operativos',
          moneyRub: true,
          report: false,
          classificator: true,
          level: 1,
          expanded: true,
          digitsOfLevel: 2,
          showAddPopup: false,
          showEditPopup: false,
          childrenAccounts: [
            {
              accountCode: 50301,
              nameAccount: 'Gastos No Monetarios',
              moneyRub: true,
              report: false,
              classificator: true,
              level: 2,
              expanded: true,
              digitsOfLevel: 2,
              showAddPopup: false,
              showEditPopup: false,
              childrenAccounts: [
                {
                  accountCode: 5030101,
                  nameAccount: 'Gastos No Monetarios',
                  moneyRub: true,
                  report: false,
                  classificator: true,
                  level: 3,
                  expanded: true,
                  digitsOfLevel: 2,
                  showAddPopup: false,
                  showEditPopup: false,
                  childrenAccounts: [
                    {
                      accountCode: 5030101001,
                      nameAccount: 'Ajuste Por Inflación Y Tenencia De Bienes',
                      moneyRub: true,
                      report: false,
                      classificator: false,
                      level: 4,
                      expanded: true,
                      digitsOfLevel: 3,
                      showAddPopup: false,
                      showEditPopup: false,
                      childrenAccounts: [],
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    }
  ];

  constructor(public formService: FormStateService, private router: Router) { }

  ngOnInit() {
    const accountPlan = localStorage.getItem('accountPlan');
    if (accountPlan != null) {
      this.accountPlan = JSON.parse(accountPlan);
      this.createAccountPlan(this.accountPlan);
    } else {
      localStorage.setItem('accountPlan', JSON.stringify(this.accountPlan));
      this.createAccountPlan(this.accountPlan);
    }
  }

  createAccountPlan (account: any[]) {
    for (let i = 0; i < account.length; i++) {
      if (account[i].childrenAccounts.length > 0) {
        account[i].childrenAccounts.forEach((element: any) => {
          element.parent = account[i];
        });
        this.createAccountPlan(account[i].childrenAccounts);
      }
    }
  }

  @ViewChild("accountName") accountName: string = "";
  accountMoneyRub: boolean = false;
  accountReport: boolean = false;

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
    showEditPopup: false
  };

  showAddPopupParent: boolean = false;
  // Función para mostrar el popup de agregar nuevo padre
  showAddPopupParentChange() {
    this.showAddPopupParent = !this.showAddPopupParent;
  }
  addParent(){
    this.newAccount.accountCode = this.accountPlan.length + 1;
    this.newAccount.nameAccount = this.accountName;
    this.newAccount.moneyRub = this.accountMoneyRub;
    this.newAccount.report = this.accountReport;
    this.newAccount.digitsOfLevel = 1;
    this.accountPlan.push(this.newAccount);
    this.reset();
    this.showAddPopupParentChange();
  }
  cancel(){
    this.reset();
    this.showAddPopupParentChange();
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
      showEditPopup: false
    }
    this.accountName = "";
    this.accountMoneyRub = false;
  }

  // FORM GROUP
  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }

  treeData: Account[] = [];

  guardarJSON() {
    this.mostrarPopupConfirm = true;
    console.log('Datos en JSON:');
    this.transformAccountPlan(this.accountPlan);
    const treeData = this.treeData;

    console.log(JSON.stringify(treeData, null, 2));
    console.log('*********************************************');

    const accountPlanArray = this.formService.fb.array(
      treeData.map(account =>
        this.formService.fb.group({
          ...account, // spread para agregar todas las propiedades de la cuenta
          childrenAccounts: this.formService.fb.array(account.childrenAccounts) // childrenAccounts como FormArray
        })
      )
    );

    this.formGroup.setControl('accountablePlan', accountPlanArray);
    this.printValue();
    this.enviarDatos();
  }

  transformAccountPlan(account: newAccountDto[], parent: any = null) {
    for (let i = 0; i < account.length; i++) {
      const accountItem = {
        accountCode: account[i].accountCode,
        nameAccount: account[i].nameAccount,
        moneyRub: account[i].moneyRub,
        report: account[i].report,
        classificator: account[i].classificator,
        level: account[i].level,
        childrenAccounts: []
      };
  
      if (parent) {
        parent.childrenAccounts.push(accountItem);
      } else {
        this.treeData.push(accountItem);
      }
  
      if (account[i].childrenAccounts.length > 0) {
        this.transformAccountPlan(account[i].childrenAccounts, accountItem);
      }
    }
  }  

  printValue() {
    console.log('Datos en el formulario:');
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }
  
  loading: boolean = true;
  titleMessage: string = '¡Enhorabuena!';
  message: string = 'Los datos de la empresa se han guardado correctamente.';
  messageIcon: string = 'fa-regular fa-circle-check gradient';

  enviarDatos() {
    const storedImagen = localStorage.getItem('imagen');
    const formData = new FormData();
    const image= this.formService.getImage();
    if (image) {
      console.log('Imagen en el componente:');
      console.log(image);
      formData.append('image', image);
    }

    formData.append('datos', JSON.stringify(this.formGroup.value));

    this.formService.enviarDatos(formData).subscribe({
      next: response => {
        if(response.success){
          this.titleMessage = '¡Enhorabuena!';
          this.message = 'Los datos de la empresa se han guardado correctamente.';
          this.messageIcon = 'fa-regular fa-circle-check gradient';
        } else {
          this.titleMessage = 'Ocurrio un error!';
          this.message = response.message;
          this.messageIcon = 'fa-regular fa-circle-times gradient-red';
        }
        this.loading = false;
      },
      error: error => {
        this.titleMessage = 'Ocurrio un error!';
        this.message = 'No se pudo comunicar con el servidor, intente de nuevo más tarde.';
        this.messageIcon = 'fa-regular fa-circle-times gradient-red';
        this.loading = false;
      }
    });
  }

  mostrarPopupConfirm = false;

  confirm(){
    localStorage.clear();
    window.location.href = '/my-companies';
  }

  // Función para guardar los datos en el local storage
  accountsLocalStorage: newAccountDto[] = [];
  back(){
    this.accountsLocalStorage = this.accountPlan;
    this.saveLocalStorage(this.accountsLocalStorage);
    localStorage.setItem('accountPlan', JSON.stringify(this.accountsLocalStorage));
    this.router.navigate(['/initial-config/tap3']);
  }
  saveLocalStorage(account: newAccountDto[]) {
    for (let i = 0; i < account.length; i++) {
      account[i].parent = undefined;
      if (account[i].childrenAccounts.length > 0) {
        this.saveLocalStorage(account[i].childrenAccounts);
      }
    }
  }
}