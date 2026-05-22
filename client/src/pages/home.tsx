import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  ShoppingBag,
  Link as LinkIcon,
  MessageCircle,
  Calculator,
  CreditCard,
  Truck,
  Package,
  Clock,
  Shield,
  Heart,
  ExternalLink,
  ChevronRight,
  Star,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Search,
  Send,
  User,
  MapPin,
  Quote,
  Mail,
  Phone,
  PackageCheck,
  PackageSearch,
  Loader2,
  Plus,
  Trash2,
  ArrowLeftRight,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Store, Promotion, FAQ, Step, Testimonial, RecentProduct, Order } from "@shared/schema";
import logoTransparent from "@/assets/logo2_transparent.png";
import { BRAND_NAME } from "@shared/config";
import {
  type AppConfig,
  type OrderItem,
  type PurchaseOptionId,
  PURCHASE_OPTIONS,
  EXCHANGE_FROM,
  EXCHANGE_TO,
  DEFAULT_EXCHANGE_RATE,
  withConfigDefaults,
  createEmptyItem,
  parsePriceEur,
  calculateOrderTotals,
  formatMt,
  buildWhatsAppOrderMessage,
  openWhatsApp,
} from "@/lib/order";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Link: LinkIcon,
  MessageCircle,
  Calculator,
  CreditCard,
  Truck,
};

function WhatsAppButton() {
  const { data: config } = useQuery<{
    whatsappNumber: string;
    whatsappMessage: string;
  }>({
    queryKey: ["/api/config"],
  });

  const message = encodeURIComponent(
    config?.whatsappMessage || "Olá, gostaria de fazer uma encomenda de Portugal para Moçambique."
  );
  const whatsappUrl = `https://wa.me/${config?.whatsappNumber || "258823720155"}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp-float"
      aria-label="Contactar via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-green-600 hover:scale-105 group"
    >
      <div className="relative">
        <SiWhatsapp className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full whatsapp-pulse" />
      </div>
      <span className="hidden md:inline font-medium">Fale Connosco</span>
    </a>
  );
}

function HeroSection() {
  const { data: stores } = useQuery<Store[]>({
    queryKey: ["/api/stores"],
  });

  const { data: config } = useQuery<{
    pricePerKg: number;
    currency: string;
    deliveryDays: number;
    whatsappNumber: string;
    whatsappMessage: string;
  }>({
    queryKey: ["/api/config"],
  });

  const message = encodeURIComponent(
    config?.whatsappMessage || "Olá, gostaria de fazer uma encomenda de Portugal para Moçambique."
  );
  const whatsappUrl = `https://wa.me/${config?.whatsappNumber || "258823720155"}?text=${message}`;

  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-background"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div 
            className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in-up"
            data-testid="badge-hero-subtitle"
          >
            <Sparkles className="w-4 h-4" />
            <span>De Portugal para Moçambique</span>
          </div>

          <p 
            className="text-xl md:text-2xl text-muted-foreground font-medium animate-fade-in-up" 
            style={{ animationDelay: "0.2s" }}
            data-testid="text-hero-slogan"
          >
            Encomendas de Portugal para Moçambique — Porque estar longe não significa estar sem
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Card className="flex items-center gap-3 px-6 py-4 bg-card/80 backdrop-blur-sm border-primary/20" data-testid="card-price-info">
              <Package className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground" data-testid="text-price-value">
                  {config?.pricePerKg || 1400} {config?.currency || "MT"}
                </p>
                <p className="text-sm text-muted-foreground">por quilograma</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 px-6 py-4 bg-card/80 backdrop-blur-sm border-primary/20" data-testid="card-delivery-info">
              <Clock className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground" data-testid="text-delivery-days">
                  {config?.deliveryDays || 5} Dias
                </p>
                <p className="text-sm text-muted-foreground">úteis de entrega</p>
              </div>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 text-lg px-8" data-testid="button-hero-whatsapp">
                <SiWhatsapp className="w-5 h-5" />
                Começar Agora
              </Button>
            </a>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2" 
              data-testid="button-hero-stores" 
              onClick={() => document.getElementById("lojas")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Lojas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="pt-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-muted-foreground mb-6" data-testid="text-partners-label">Lojas Parceiras</p>
            <div className="relative overflow-hidden">
              <div className="flex gap-8 animate-marquee">
                {stores && [...stores, ...stores].map((store, i) => (
                  <div
                    key={`${store.name}-${i}`}
                    className="flex-shrink-0 px-6 py-3 bg-card/60 dark:bg-card/40 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                    data-testid={`badge-partner-store-${store.id}-${i}`}
                  >
                    <span className="font-semibold text-foreground whitespace-nowrap">
                      {store.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { data: steps, isLoading } = useQuery<Step[]>({
    queryKey: ["/api/steps"],
  });

  return (
    <section id="como-funciona" className="py-20 bg-background scroll-mt-16" data-testid="section-how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-how-it-works">
            Simples e Rápido
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-how-it-works-title">
            Como Funciona
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-description">
            Em apenas 6 passos simples, receba os seus artigos favoritos de Portugal diretamente em Moçambique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6" data-testid={`skeleton-step-${i}`}>
                <div className="flex flex-col items-center space-y-4">
                  <Skeleton className="w-16 h-16 rounded-2xl" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </Card>
            ))
          ) : (
            steps?.map((step) => {
              const Icon = iconMap[step.icon] || ShoppingBag;
              return (
                <Card
                  key={step.id}
                  className="relative p-6 hover-elevate group transition-all duration-300"
                  data-testid={`card-step-${step.id}`}
                >
                  <div 
                    className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm"
                    data-testid={`badge-step-number-${step.id}`}
                  >
                    {step.id}
                  </div>
                  <div className="flex flex-col items-center text-center space-y-4 pt-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground" data-testid={`text-step-title-${step.id}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`text-step-description-${step.id}`}>
                      {step.description}
                    </p>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

function StoresSection() {
  const { data: stores, isLoading } = useQuery<Store[]>({
    queryKey: ["/api/stores"],
  });

  return (
    <section id="lojas" className="py-20 bg-muted/30 scroll-mt-16" data-testid="section-stores">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-stores">
            <Star className="w-3 h-3 mr-1" />
            Lojas Parceiras
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-stores-title">
            As Melhores Lojas de Portugal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-stores-description">
            Escolha entre as melhores marcas europeias. Clique numa loja para explorar e envie-nos o link do produto desejado.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="p-6" data-testid={`skeleton-store-${i}`}>
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-xl" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </Card>
            ))
          ) : (
            stores?.map((store) => (
              <a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-store-${store.name.toLowerCase().replace(/[&\s]/g, "-")}`}
                className="group"
                aria-label={`Visitar loja ${store.name}`}
              >
                <Card className="p-6 flex flex-col items-center gap-4 hover-elevate transition-all duration-300 group-hover:border-primary/30 h-full" data-testid={`card-store-${store.id}`}>
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:from-primary/10 group-hover:to-primary/5 transition-all">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-center flex-1">
                    <h3 className="font-semibold text-foreground" data-testid={`text-store-name-${store.id}`}>
                      {store.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2" data-testid={`text-store-description-${store.id}`}>
                      {store.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1 w-full" data-testid={`button-visit-store-${store.id}`}>
                    Visitar Loja
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </Card>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function PromotionsSection() {
  const { data: promotions, isLoading } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-07-31T23:59:59");

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="promocoes" className="py-20 bg-gradient-to-br from-primary/5 via-background to-orange-50/50 dark:from-primary/10 dark:via-background dark:to-background scroll-mt-16" data-testid="section-promotions">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" data-testid="badge-summer-sale">
            <Sparkles className="w-3 h-3 mr-1" />
            Saldos de Verão 2026
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-promotions-title">
            Promoções Imperdíveis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="text-promotions-description">
            Os saldos de verão chegaram! Aproveite os melhores descontos nas lojas parceiras antes que acabem.
          </p>

          <div className="flex justify-center gap-4 mb-12 flex-wrap" data-testid="countdown-timer">
            {[
              { label: "Dias", value: timeLeft.days },
              { label: "Horas", value: timeLeft.hours },
              { label: "Minutos", value: timeLeft.minutes },
              { label: "Segundos", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-lg p-4 min-w-[70px] sm:min-w-[80px]"
                data-testid={`countdown-${item.label.toLowerCase()}`}
              >
                <p className="text-2xl md:text-3xl font-bold text-primary" data-testid={`text-countdown-value-${item.label.toLowerCase()}`}>
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="p-6" data-testid={`skeleton-promo-${i}`}>
                <div className="flex flex-col items-center space-y-3">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </Card>
            ))
          ) : (
            promotions?.map((promo) => (
              <Card
                key={promo.id}
                className="relative overflow-visible p-6 hover-elevate transition-all duration-300"
                data-testid={`card-promo-${promo.store.toLowerCase().replace(/[&\s]/g, "-")}`}
              >
                {promo.isHot && (
                  <Badge className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground" data-testid={`badge-hot-deal-${promo.id}`}>
                    Hot Deal
                  </Badge>
                )}
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground" data-testid={`text-promo-store-${promo.id}`}>{promo.store}</h3>
                  <p className="text-3xl font-bold text-primary" data-testid={`text-promo-discount-${promo.id}`}>
                    {promo.discount}
                    <span className="text-lg"> OFF</span>
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground" data-testid={`text-promo-date-${promo.id}`}>
                    <Clock className="w-3 h-3" />
                    <span>{promo.date}</span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function OrderItemsEditor({
  items,
  onChange,
  exchangeRate = DEFAULT_EXCHANGE_RATE,
}: {
  items: OrderItem[];
  onChange: (items: OrderItem[]) => void;
  exchangeRate?: number;
}) {
  const updateItem = (id: string, patch: Partial<OrderItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={item.id} className="p-4 border-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Artigo {index + 1}</span>
            {items.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => removeItem(item.id)}
                aria-label={`Remover artigo ${index + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <Label>Link do artigo</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="https://www.zara.com/pt/pt/..."
                className="pl-10"
                value={item.link}
                onChange={(e) => updateItem(item.id, { link: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Tamanho</Label>
              <Input
                placeholder="Ex: M, 38, 42"
                value={item.size}
                onChange={(e) => updateItem(item.id, { size: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(item.id, {
                    quantity: Math.max(1, parseInt(e.target.value, 10) || 1),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Preço (€)</Label>
              <Input
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={item.priceEur}
                onChange={(e) => updateItem(item.id, { priceEur: e.target.value })}
              />
              {parsePriceEur(item.priceEur) > 0 && (
                <p className="text-xs text-primary font-medium">
                  = {formatMt(parsePriceEur(item.priceEur) * item.quantity * exchangeRate)}{" "}
                  {EXCHANGE_TO}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={() => onChange([...items, createEmptyItem()])}
      >
        <Plus className="w-4 h-4" />
        Adicionar outro artigo
      </Button>
    </div>
  );
}

function PurchaseOptionsPicker({
  value,
  onChange,
  idPrefix = "order-",
}: {
  value: PurchaseOptionId;
  onChange: (v: PurchaseOptionId) => void;
  idPrefix?: string;
}) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
      <h3 className="font-semibold text-foreground">Opções de compra</h3>
      <p className="text-sm text-muted-foreground">Que opção pretende utilizar?</p>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as PurchaseOptionId)}
        className="space-y-3"
      >
        {(Object.entries(PURCHASE_OPTIONS) as [PurchaseOptionId, typeof PURCHASE_OPTIONS.personal_shopper][]).map(
          ([id, opt]) => (
            <label
              key={id}
              htmlFor={`${idPrefix}${id}`}
              className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                value === id
                  ? "border-primary bg-background"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <RadioGroupItem value={id} id={`${idPrefix}${id}`} className="mt-1" />
              <div>
                <p className="font-medium text-foreground">
                  {id === "personal_shopper" ? "1." : "2."} {opt.label}
                </p>
                <p className="text-sm text-muted-foreground">{opt.description}</p>
              </div>
            </label>
          ),
        )}
      </RadioGroup>
    </div>
  );
}

function OrderSummaryCard({
  config,
  items,
  weightKg,
}: {
  config: AppConfig;
  items: OrderItem[];
  weightKg: number;
}) {
  const totals = calculateOrderTotals(items, weightKg, config);

  return (
    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 space-y-3">
      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold text-center">
        Resumo do serviço completo
      </p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Produtos ({totals.productsEur.toFixed(2)}€ × {config.exchangeRate} {EXCHANGE_TO})
          </span>
          <span className="font-medium">{formatMt(totals.productsMt)} {EXCHANGE_TO}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Envio ({weightKg} kg × {config.pricePerKg} {EXCHANGE_TO})
          </span>
          <span className="font-medium">{formatMt(totals.shippingMt)} {EXCHANGE_TO}</span>
        </div>
        <div className="border-t border-primary/20 pt-3 flex justify-between items-center">
          <span className="font-semibold text-foreground">Total estimado</span>
          <span className="text-2xl font-bold text-primary">
            {formatMt(totals.totalMt)} {EXCHANGE_TO}
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground italic text-center">
        * Valores estimados. O total final será confirmado pela {BRAND_NAME} após validação dos artigos.
      </p>
    </div>
  );
}

function ExchangeRateSection() {
  const { toast } = useToast();
  const [items, setItems] = useState<OrderItem[]>([createEmptyItem()]);
  const [weight, setWeight] = useState([1]);
  const [purchaseOption, setPurchaseOption] = useState<PurchaseOptionId>("personal_shopper");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const { data: rawConfig, isLoading } = useQuery<Partial<AppConfig>>({
    queryKey: ["/api/config"],
  });

  const config = withConfigDefaults(rawConfig);
  const exchangeRate = config.exchangeRate;

  const handleWhatsApp = () => {
    if (!items.some((i) => i.link.trim())) {
      toast({
        title: "Artigos em falta",
        description: "Adicione pelo menos um link de artigo antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    const message = buildWhatsAppOrderMessage({
      config,
      purchaseOption,
      items,
      weightKg: weight[0],
      name: customerName.trim() || undefined,
      phone: customerPhone.trim() || undefined,
    });
    openWhatsApp(config, message);
  };

  const totals = calculateOrderTotals(items, weight[0], config);

  return (
    <section id="orcamento" className="py-20 bg-background scroll-mt-16" data-testid="section-calculator">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {isLoading && !rawConfig ? (
            <Skeleton className="h-96 w-full rounded-xl mb-4" />
          ) : null}
          <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4">Taxa de Câmbio & Orçamento</Badge>
              <h2 className="text-3xl font-bold text-foreground">Quanto vai pagar pelo serviço?</h2>
              <p className="text-muted-foreground mt-2">
                Escolha a opção de compra, indique os artigos e veja o total em {EXCHANGE_TO}
              </p>
            </div>

            <Card className="p-5 mb-8 bg-primary/10 border-primary/30">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <ArrowLeftRight className="w-6 h-6 text-primary" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Taxa de câmbio {BRAND_NAME}</p>
                  <p className="text-3xl font-bold text-primary" data-testid="text-exchange-rate">
                    1 {EXCHANGE_FROM} = {exchangeRate} {EXCHANGE_TO}
                  </p>
                  <p className="text-sm text-foreground mt-2 font-medium">
                    1 Euro está para {exchangeRate} Meticais
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    O valor em euros do produto é multiplicado por {exchangeRate} automaticamente
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              <PurchaseOptionsPicker
                value={purchaseOption}
                onChange={setPurchaseOption}
                idPrefix="orcamento-"
              />

              <div>
                <h3 className="font-semibold text-foreground mb-4">Artigos, tamanhos e quantidades</h3>
                <OrderItemsEditor
                  items={items}
                  onChange={setItems}
                  exchangeRate={exchangeRate}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>
                    Peso estimado: <span className="text-primary font-bold">{weight[0]} kg</span>
                  </Label>
                  <span className="text-sm text-muted-foreground">Máx. 50 kg</span>
                </div>
                <Slider value={weight} onValueChange={setWeight} max={50} step={0.5} min={0.5} />
              </div>

              <OrderSummaryCard config={config} items={items} weightKg={weight[0]} />

              {totals.productsEur > 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  Exemplo: {totals.productsEur.toFixed(2)}€ × {exchangeRate} ={" "}
                  <strong className="text-primary">
                    {formatMt(totals.productsMt)} {EXCHANGE_TO}
                  </strong>{" "}
                  (produtos) + envio
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orcamento-name">Nome (para o WhatsApp)</Label>
                  <Input
                    id="orcamento-name"
                    placeholder="O seu nome"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orcamento-phone">Telefone / WhatsApp</Label>
                  <Input
                    id="orcamento-phone"
                    placeholder="+258 84 000 0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 text-lg h-14 bg-green-600 hover:bg-green-700"
                onClick={handleWhatsApp}
              >
                <SiWhatsapp className="w-5 h-5" />
                Enviar encomenda completa via WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function RecentProductsSection() {
  const { data: products, isLoading } = useQuery<RecentProduct[]>({
    queryKey: ["/api/recent-products"],
  });

  return (
    <section className="py-20 bg-background" data-testid="section-recent-products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Entregas Recentes</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Últimas Compras</h2>
          <p className="text-muted-foreground">Artigos que acabaram de chegar aos nossos clientes em Moçambique</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)
          ) : (
            products?.map((p) => (
              <a
                key={p.id}
                href={p.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`card-product-${p.id}`}
                className="block"
                aria-label={`Ver ${p.name} na ${p.store}`}
              >
                <Card className="overflow-hidden group hover-elevate border-primary/10 h-full">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.name} — ${p.store}`}
                        title={`${p.name} (${p.store})`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 bg-muted items-center justify-center"
                      style={{ display: p.image ? "none" : "flex" }}
                    >
                      <Package className="w-12 h-12 text-primary/40" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="text-[10px] bg-background/90 text-foreground border border-border">
                        <ExternalLink className="w-2.5 h-2.5 mr-1" />
                        Ver
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h4 className="font-bold text-sm text-foreground truncate">{p.name}</h4>
                    <div className="flex justify-between items-center mt-2 gap-1 flex-wrap">
                      <Badge variant="outline" className="text-[10px] uppercase">{p.store}</Badge>
                      <span className="text-[10px] text-muted-foreground">{p.purchaseDate}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Comprado por {p.customerName}</p>
                  </div>
                </Card>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section className="py-20 bg-muted/30" data-testid="section-testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Testemunhos</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">O que dizem os nossos clientes</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)
          ) : (
            testimonials?.map((t) => (
              <Card key={t.id} className="p-8 hover-elevate transition-all border-primary/10">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-foreground">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.location} • {t.date}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { data: faqs, isLoading } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

  return (
    <section id="faq" className="py-20 bg-background scroll-mt-16" data-testid="section-faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-faq">
            Dúvidas?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-faq-title">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-faq-description">
            Encontre respostas para as questões mais comuns sobre o nosso serviço.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="p-6" data-testid={`skeleton-faq-${i}`}>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </Card>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs?.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="bg-card border border-border rounded-lg px-6 overflow-visible"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger 
                    className="text-left font-medium text-foreground hover:no-underline py-4"
                    data-testid={`button-faq-trigger-${faq.id}`}
                  >
                    <span data-testid={`text-faq-question-${faq.id}`}>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4" data-testid={`text-faq-answer-${faq.id}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Os seus artigos são tratados com o máximo cuidado e embalados de forma segura.",
    },
    {
      icon: Clock,
      title: "Rapidez",
      description: "Entrega em apenas 5 dias úteis, do momento do envio até à sua porta.",
    },
    {
      icon: Heart,
      title: "Confiança",
      description: "Mais de 1000 clientes satisfeitos confiam no nosso serviço.",
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-muted/30 scroll-mt-16" data-testid="section-about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4" data-testid="badge-about">
              Sobre Nós
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-about-title">
              {BRAND_NAME} — A Sua Ponte Entre Portugal e Moçambique
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-about-paragraph-1">
              A <strong className="text-foreground">{BRAND_NAME}</strong> nasceu da vontade de aproximar as pessoas às marcas e produtos que amam. Somos especialistas em compras e envio de artigos das melhores lojas portuguesas para Moçambique.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed" data-testid="text-about-paragraph-2">
              A nossa missão é simples: tornar as compras internacionais acessíveis, seguras e rápidas para todos. Com uma equipa dedicada e um processo simplificado, garantimos que cada encomenda chega em perfeitas condições.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2" data-testid="stat-clients">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">+1000 Clientes</span>
              </div>
              <div className="flex items-center gap-2" data-testid="stat-satisfaction">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">99% Satisfação</span>
              </div>
              <div className="flex items-center gap-2" data-testid="stat-support">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">Suporte 24/7</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-6 hover-elevate transition-all duration-300"
                  data-testid={`card-feature-${feature.title.toLowerCase()}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1" data-testid={`text-feature-title-${feature.title.toLowerCase()}`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid={`text-feature-description-${feature.title.toLowerCase()}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Indique o seu nome"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string; phone?: string; message: string }) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Mensagem enviada",
        description: "Agradecemos o seu contacto. Responderemos em breve.",
      });
      form.reset();
    },
  });

  return (
    <section id="contacto" className="py-20 bg-muted/30 scroll-mt-16" data-testid="section-contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">Contacto</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Fale com a {BRAND_NAME}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Para fazer uma encomenda com opção de compra, artigos e orçamento completo, utilize a secção{" "}
              <a href="#orcamento" className="text-primary font-medium hover:underline">
                Taxa de Câmbio & Orçamento
              </a>
              . Aqui pode enviar outras dúvidas.
            </p>
          </div>

          <Card className="p-6 mb-6 border-primary/20 bg-primary/5">
            <p className="text-sm text-center text-muted-foreground">
              Quer encomendar?{" "}
              <a href="#orcamento" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                Ir para Orçamento e Encomendar
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </Card>

          <Card className="p-8 border-primary/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="O seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+258 84 000 0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Como podemos ajudar?" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Enviar mensagem
                </Button>
              </form>
            </Form>

            <div className="flex flex-wrap gap-6 pt-6 mt-6 border-t border-border text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                p2mexpress@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <SiWhatsapp className="w-4 h-4 text-primary" />
                +258 82 372 0155
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { data: config } = useQuery<{
    pricePerKg: number;
    currency: string;
    deliveryDays: number;
    whatsappNumber: string;
    whatsappMessage: string;
    instagramHandle: string;
  }>({
    queryKey: ["/api/config"],
  });

  const message = encodeURIComponent(
    config?.whatsappMessage || "Olá, gostaria de fazer uma encomenda de Portugal para Moçambique."
  );
  const whatsappUrl = `https://wa.me/${config?.whatsappNumber || "258823720155"}?text=${message}`;

  return (
    <footer className="bg-card border-t border-border py-12" data-testid="section-footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4" data-testid="img-footer-logo">
              <img
                src={logoTransparent}
                alt={BRAND_NAME}
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm mb-4" data-testid="text-footer-tagline">
              Compras de Portugal para Moçambique com segurança, rapidez e confiança.
            </p>
            <div className="flex items-center gap-2 flex-wrap" data-testid="text-footer-pricing">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {config?.pricePerKg || 1400} {config?.currency || "MT"}/kg
              </span>
              <span className="text-muted-foreground">|</span>
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {config?.deliveryDays || 5} dias úteis
              </span>
            </div>
            {config?.instagramHandle && (
              <a 
                href={`https://instagram.com/${config.instagramHandle}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mt-4"
              >
                <Star className="w-4 h-4" />
                <span className="text-sm">@{config.instagramHandle}</span>
              </a>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4" data-testid="text-footer-links-title">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { label: "Como Funciona", href: "#como-funciona" },
                { label: "Lojas", href: "#lojas" },
                { label: "Orçamento", href: "#orcamento" },
                { label: "FAQ", href: "#faq" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4" data-testid="text-footer-contact-title">Contacto</h4>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              data-testid="button-footer-whatsapp"
              aria-label="Contactar via WhatsApp"
            >
              <SiWhatsapp className="w-5 h-5" />
              <span>Fale Connosco</span>
            </a>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-footer-response-time">
              Respondemos em menos de 1 hora durante o horário comercial.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: config } = useQuery<{
    whatsappNumber: string;
    whatsappMessage: string;
  }>({
    queryKey: ["/api/config"],
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Lojas", href: "#lojas" },
    { label: "Orçamento", href: "#orcamento" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contacto" },
  ];

  const message = encodeURIComponent(
    config?.whatsappMessage || "Olá, gostaria de fazer uma encomenda de Portugal para Moçambique."
  );
  const whatsappUrl = `https://wa.me/${config?.whatsappNumber || "258823720155"}?text=${message}`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Navegação principal"
        data-testid="navbar"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a 
              href="#" 
              className="flex items-center" 
              data-testid="link-logo"
              aria-label={`${BRAND_NAME} - Página inicial`}
            >
              <img
                src={logoTransparent}
                alt={BRAND_NAME}
                className="h-16 w-auto object-contain"
                data-testid="img-logo-navbar"
              />
            </a>

            <div className="hidden md:flex items-center gap-6" data-testid="nav-desktop-links">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  aria-label={`Ir para ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar via WhatsApp"
              >
                <Button size="sm" className="gap-2" data-testid="button-nav-whatsapp">
                  <SiWhatsapp className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid={mobileMenuOpen ? "button-close-menu" : "button-open-menu"}
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação móvel"
        >
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
            data-testid="mobile-menu-backdrop"
          />
          <div 
            id="mobile-menu"
            className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg p-4"
            data-testid="mobile-menu"
          >
            <nav aria-label="Menu móvel">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <RecentProductsSection />
        <ExchangeRateSection />
        <StoresSection />
        <PromotionsSection />
        <TestimonialsSection />
        <FAQSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
