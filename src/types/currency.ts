export interface CurrencyRates {
  USD: { EUR: number; AUD: number; CAD: number; JPY: number };
  EUR: { USD: number; AUD: number; CAD: number; JPY: number };
  AUD: { EUR: number; USD: number; CAD: number; JPY: number };
  CAD: { EUR: number; USD: number; AUD: number; JPY: number };
  JPY: { EUR: number; USD: number; AUD: number; CAD: number };
}
