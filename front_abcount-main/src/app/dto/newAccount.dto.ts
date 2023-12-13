export interface newAccountDto {
    accountCode: number;
    nameAccount: string;
    moneyRub: boolean;
    report: boolean;
    classificator: boolean;
    level: number;
    childrenAccounts: newAccountDto[];
    expanded: boolean;
    digitsOfLevel: number;
    showAddPopup: boolean;
    showEditPopup: boolean;
    parent?: newAccountDto;
}