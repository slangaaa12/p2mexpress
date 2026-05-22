import type { IncomingMessage, ServerResponse } from "http";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw);
    const { name, email, message } = body;

    if (!name || name.length < 2) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Nome deve ter pelo menos 2 caracteres" }));
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Email inválido" }));
      return;
    }
    if (!message || message.length < 10) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Mensagem deve ter pelo menos 10 caracteres" }));
      return;
    }

    res.statusCode = 201;
    res.end(JSON.stringify({ success: true, message: "Mensagem enviada com sucesso!" }));
  } catch {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Erro ao processar mensagem" }));
  }
}
