export interface AccountDto {
    isHidden: any;
    accountId: number;
    codeAccount: string;
    nameAccount: string;
    clasificator: boolean;
    level: number;
    report: boolean;
    moneyRub: boolean;
    childrenAccounts: AccountDto[];
}