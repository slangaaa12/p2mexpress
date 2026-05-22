/** Configuração partilhada — sem process.env (seguro para o browser/Vite). */
export const APP_CONFIG = {
  pricePerKg: 1400,
  currency: "MT",
  sourceCurrency: "EUR",
  exchangeRate: 85,
  deliveryDays: 5,
  whatsappNumber: "258823720155",
  whatsappMessage: "Olá, gostaria de fazer a seguinte encomenda:",
  instagramHandle: "p2mexpress",
};

export const BRAND_NAME = "P2M Express";

export type AppConfigValues = {
  pricePerKg: number;
  currency: string;
  sourceCurrency: string;
  exchangeRate: number;
  deliveryDays: number;
  whatsappNumber: string;
  whatsappMessage: string;
  instagramHandle: string;
};
