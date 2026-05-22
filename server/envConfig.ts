import { APP_CONFIG, type AppConfigValues } from "@shared/config";

/** Configuração para o servidor Express (permite variáveis de ambiente). */
export function getAppConfig(): AppConfigValues {
  return {
    ...APP_CONFIG,
    whatsappNumber: process.env.WHATSAPP_NUMBER || APP_CONFIG.whatsappNumber,
    instagramHandle: process.env.INSTAGRAM_HANDLE || APP_CONFIG.instagramHandle,
  };
}
