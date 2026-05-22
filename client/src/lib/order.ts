export interface AppConfig {
  pricePerKg: number;
  currency: string;
  deliveryDays: number;
  whatsappNumber: string;
  whatsappMessage: string;
  instagramHandle: string;
  exchangeRate: number;
  sourceCurrency: string;
}

export type PurchaseOptionId = "personal_shopper" | "online";

export interface OrderItem {
  id: string;
  link: string;
  size: string;
  quantity: number;
  priceEur: string;
}

export const EXCHANGE_FROM = "Euro";
export const EXCHANGE_TO = "Meticais";
export const DEFAULT_EXCHANGE_RATE = 85;
export const DEFAULT_PRICE_PER_KG = 1400;

export const DEFAULT_APP_CONFIG: AppConfig = {
  pricePerKg: DEFAULT_PRICE_PER_KG,
  currency: "MT",
  sourceCurrency: "EUR",
  exchangeRate: DEFAULT_EXCHANGE_RATE,
  deliveryDays: 5,
  whatsappNumber: "258823720155",
  whatsappMessage: "Olá, gostaria de fazer a seguinte encomenda:",
  instagramHandle: "p2mexpress",
};

/** Garante taxa 85 e restantes valores mesmo se a API estiver desatualizada ou em cache. */
export function withConfigDefaults(config?: Partial<AppConfig> | null): AppConfig {
  return {
    ...DEFAULT_APP_CONFIG,
    ...config,
    exchangeRate: config?.exchangeRate ?? DEFAULT_EXCHANGE_RATE,
    pricePerKg: config?.pricePerKg ?? DEFAULT_PRICE_PER_KG,
  };
}

export const PURCHASE_OPTIONS: Record<
  PurchaseOptionId,
  { label: string; description: string }
> = {
  personal_shopper: {
    label: "Compra - personal shopper",
    description: "A empresa realiza a compra e o envio.",
  },
  online: {
    label: "Compra online",
    description:
      "O cliente compra diretamente e envia para o endereço da empresa.",
  },
};

function newItemId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptyItem(): OrderItem {
  return {
    id: newItemId(),
    link: "",
    size: "",
    quantity: 1,
    priceEur: "",
  };
}

export function parsePriceEur(value: string): number {
  const parsed = parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function calculateOrderTotals(
  items: OrderItem[],
  weightKg: number,
  config: Pick<AppConfig, "exchangeRate" | "pricePerKg">,
) {
  const productsEur = items.reduce(
    (sum, item) => sum + parsePriceEur(item.priceEur) * item.quantity,
    0,
  );
  const exchangeRate = config.exchangeRate ?? DEFAULT_EXCHANGE_RATE;
  const pricePerKg = config.pricePerKg ?? DEFAULT_PRICE_PER_KG;
  const productsMt = productsEur * exchangeRate;
  const shippingMt = weightKg * pricePerKg;
  const totalMt = productsMt + shippingMt;

  return { productsEur, productsMt, shippingMt, totalMt };
}

export function formatMt(value: number): string {
  return value.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function buildWhatsAppOrderMessage(params: {
  config: AppConfig;
  purchaseOption: PurchaseOptionId;
  items: OrderItem[];
  weightKg: number;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
}): string {
  const { purchaseOption, items, weightKg, name, phone, email, notes } = params;
  const config = withConfigDefaults(params.config);
  const option = PURCHASE_OPTIONS[purchaseOption];
  const totals = calculateOrderTotals(items, weightKg, config);

  const lines: string[] = [
    config.whatsappMessage,
    "",
    "📦 *NOVA ENCOMENDA — P2M Express*",
    "",
    "*Opções de compra*",
    `✅ ${option.label}`,
    `   ${option.description}`,
    "",
    "*Artigos:*",
  ];

  items.forEach((item, index) => {
    const price = parsePriceEur(item.priceEur);
    const lineMt = price * item.quantity * config.exchangeRate;
    lines.push(
      `${index + 1}. ${item.link || "(link por indicar)"}`,
      `   • Tamanho: ${item.size || "—"}`,
      `   • Quantidade: ${item.quantity}`,
      price > 0
        ? `   • Preço: ${price}€ × ${item.quantity} = ${formatMt(lineMt)} ${EXCHANGE_TO}`
        : `   • Preço: (a confirmar)`,
      "",
    );
  });

  lines.push(
    `*Peso estimado:* ${weightKg} kg`,
    `*Taxa de câmbio:* 1 ${EXCHANGE_FROM} = ${config.exchangeRate} ${EXCHANGE_TO}`,
    `*Valor dos produtos:* ${formatMt(totals.productsMt)} ${EXCHANGE_TO}${totals.productsEur > 0 ? ` (${totals.productsEur.toFixed(2)}€)` : ""}`,
    `*Envio (${config.pricePerKg} ${EXCHANGE_TO}/kg):* ${formatMt(totals.shippingMt)} ${EXCHANGE_TO}`,
    `*TOTAL ESTIMADO DO SERVIÇO:* ${formatMt(totals.totalMt)} ${EXCHANGE_TO}`,
    "",
    `*Prazo de entrega:* ${config.deliveryDays} dias úteis`,
  );

  if (name) lines.push(`*Nome:* ${name}`);
  if (phone) lines.push(`*Telefone:* ${phone}`);
  if (email) lines.push(`*Email:* ${email}`);
  if (notes?.trim()) lines.push(`*Observações:* ${notes.trim()}`);

  lines.push("", "Aguardo confirmação para prosseguir com a encomenda. Obrigado!");

  return lines.join("\n");
}

export function openWhatsApp(config: AppConfig, message: string) {
  const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
