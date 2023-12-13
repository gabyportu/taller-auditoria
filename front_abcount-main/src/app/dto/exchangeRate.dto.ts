export interface ExchangeRateDto {
  id?: number;
  date: string;
  values: { exchangeRateId: number, abbreviation: string, value: number }[];
}

export interface ExchangeMoneyDto {
  exchangeMoneyId: number;
  companyId: number;
  moneyName: string;
  abbreviationName: string;
  isPrincipal: boolean;
}

export interface ExchangeRateCreate {
  moneyName: string;
  abbreviationName: string;
  currency: number;
}

export interface ExchangeRateUpdate {
  exchangeRateId: number;
  abbreviation: string;
  value: number;
}