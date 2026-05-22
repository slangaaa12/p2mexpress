import type { IncomingMessage, ServerResponse } from "http";
import { recentProducts } from "./_data";

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(JSON.stringify(recentProducts));
}
