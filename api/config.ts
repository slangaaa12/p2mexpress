import type { IncomingMessage, ServerResponse } from "http";
import { APP_CONFIG } from "../shared/config";

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(
    JSON.stringify({
      ...APP_CONFIG,
      whatsappNumber: process.env.WHATSAPP_NUMBER ?? APP_CONFIG.whatsappNumber,
      instagramHandle: process.env.INSTAGRAM_HANDLE ?? APP_CONFIG.instagramHandle,
    }),
  );
}
