import type { IncomingMessage, ServerResponse } from "http";
import { sampleOrders } from "../_data";

interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
}

export default function handler(req: VercelRequest, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { trackingCode } = req.query;
  const code = Array.isArray(trackingCode) ? trackingCode[0] : trackingCode;
  const order = sampleOrders[code?.toUpperCase() ?? ""];

  if (!order) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Encomenda não encontrada. Verifique o código de rastreio." }));
    return;
  }

  res.end(JSON.stringify(order));
}
