import type { FAQ, Order, Promotion, RecentProduct, Step, Store, Testimonial } from "./schema";

/** Imagens Unsplash alinhadas ao produto (600×600, crop). */
const IMG = {
  casacoLinho:
    "https://images.unsplash.com/photo-1539533018447-63fcce807166?auto=format&fit=crop&w=600&h=600&q=80",
  vestidoFloral:
    "https://images.unsplash.com/photo-1572804013307-27e3b7b0a632?auto=format&fit=crop&w=600&h=600&q=80",
  tenisNike:
    "https://images.unsplash.com/photo-1606107557195-0aefce9b36d7?auto=format&fit=crop&w=600&h=600&q=80",
  conjuntoDesportivo:
    "https://images.unsplash.com/photo-1518315833808-867c75bb4f95?auto=format&fit=crop&w=600&h=600&q=80",
  malaCouro:
    "https://images.unsplash.com/photo-1584917865442-89f1b506ce51?auto=format&fit=crop&w=600&h=600&q=80",
  kitMaquilhagem:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&h=600&q=80",
  jeansWideLeg:
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&h=600&q=80",
  blazer:
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&h=600&q=80",
} as const;

export const stores: Store[] = [
  { id: "1", name: "Zara", url: "https://www.zara.com", color: "#A38D5B", description: "Moda atual para mulher, homem e criança" },
  { id: "2", name: "Stradivarius", url: "https://www.stradivarius.com", color: "#A38D5B", description: "Tendências jovens e acessíveis" },
  { id: "3", name: "Mango", url: "https://shop.mango.com", color: "#A38D5B", description: "Design mediterrâneo com qualidade" },
  { id: "4", name: "Bershka", url: "https://www.bershka.com", color: "#A38D5B", description: "Moda urbana e streetwear" },
  { id: "5", name: "Pull&Bear", url: "https://www.pullandbear.com", color: "#A38D5B", description: "Casual e relaxado para o dia-a-dia" },
  { id: "6", name: "Primark", url: "https://www.primark.com", color: "#A38D5B", description: "Moda acessível para toda a família" },
  { id: "7", name: "ASOS", url: "https://www.asos.com", color: "#A38D5B", description: "Moda online com milhares de marcas" },
  { id: "8", name: "H&M", url: "https://www2.hm.com", color: "#A38D5B", description: "Moda sustentável a preços acessíveis" },
  { id: "9", name: "Kiko Milano", url: "https://www.kikocosmetics.com", color: "#A38D5B", description: "Cosméticos italianos de qualidade" },
  { id: "10", name: "Weekday", url: "https://www.weekday.com", color: "#A38D5B", description: "Moda escandinava minimalista" },
  { id: "11", name: "Nike", url: "https://www.nike.com/pt", color: "#A38D5B", description: "Calçado e vestuário desportivo" },
  { id: "12", name: "Adidas", url: "https://www.adidas.pt", color: "#A38D5B", description: "Líder mundial em artigos desportivos" },
  { id: "13", name: "Apple", url: "https://www.apple.com/pt", color: "#A38D5B", description: "Tecnologia e inovação" },
  { id: "14", name: "Samsung", url: "https://www.samsung.com/pt", color: "#A38D5B", description: "Líder em tecnologia móvel e eletrónica" },
  { id: "15", name: "Boss", url: "https://www.hugoboss.com/pt", color: "#A38D5B", description: "Moda de luxo e alfaiataria" },
  { id: "16", name: "Lacoste", url: "https://www.lacoste.com/pt", color: "#A38D5B", description: "Elegância desportiva clássica" },
  { id: "17", name: "JD Sports", url: "https://www.jdsports.pt", color: "#A38D5B", description: "O rei das sapatilhas e moda urbana" },
  { id: "18", name: "C&A", url: "https://www.cea.pt", color: "#A38D5B", description: "Moda de qualidade para todos" },
  { id: "19", name: "Aldo", url: "https://www.aldoshoes.com/pt", color: "#A38D5B", description: "Calçado e acessórios de tendência" },
  { id: "20", name: "JBL", url: "https://pt.jbl.com", color: "#A38D5B", description: "Som de alta fidelidade e colunas" },
  { id: "21", name: "Seaside", url: "https://www.seaside.pt", color: "#A38D5B", description: "Calçado português para todas as ocasiões" },
  { id: "22", name: "Puma", url: "https://pt.puma.com", color: "#A38D5B", description: "Performance e estilo desportivo" },
];

export const promotions: Promotion[] = [
  { id: "1", store: "Zara", date: "Até 31 Jul", discount: "50%", color: "#000000", isHot: true },
  { id: "2", store: "Mango", date: "Até 31 Jul", discount: "40%", color: "#000000", isHot: false },
  { id: "3", store: "H&M", date: "Até 31 Jul", discount: "60%", color: "#E50010", isHot: true },
  { id: "4", store: "ASOS", date: "Até 15 Jul", discount: "70%", color: "#2D2D2D", isHot: true },
  { id: "5", store: "Bershka", date: "Até 20 Jul", discount: "50%", color: "#000000", isHot: false },
  { id: "6", store: "Pull&Bear", date: "Até 20 Jul", discount: "40%", color: "#000000", isHot: false },
  { id: "7", store: "Nike", date: "Até 30 Jun", discount: "30%", color: "#111111", isHot: false },
  { id: "8", store: "Adidas", date: "Até 30 Jun", discount: "35%", color: "#000000", isHot: true },
];

export const faqs: FAQ[] = [
  { id: "1", question: "Como é calculado o preço?", answer: "O preço é calculado com base no peso do artigo. A nossa taxa é de 1400 MT por quilograma. Após escolher o produto, enviamos-lhe um orçamento detalhado com o peso estimado e o valor total." },
  { id: "2", question: "Quanto tempo leva a chegar?", answer: "O prazo de entrega é de 5 dias úteis a partir do momento em que o artigo é enviado de Portugal para Moçambique. Receberá atualizações sobre o estado da sua encomenda." },
  { id: "3", question: "Posso encomendar vários itens?", answer: "Sim! Pode encomendar quantos itens quiser de diferentes lojas. Consolidamos todos numa única encomenda para otimizar os custos de envio." },
  { id: "4", question: "Posso encomendar produtos de cosmética?", answer: "Sim, aceitamos encomendas de cosméticos, incluindo produtos da Kiko Milano e outras marcas. Garantimos embalagem segura para evitar danos durante o transporte." },
  { id: "5", question: "Como confirmo o pagamento?", answer: "Após receber o orçamento, pode confirmar o pagamento via M-Pesa ou transferência bancária. Envie o comprovativo pelo WhatsApp e processamos a sua encomenda imediatamente." },
  { id: "6", question: "E se o produto estiver esgotado?", answer: "Se o produto selecionado estiver esgotado, entramos em contacto consigo para oferecer alternativas ou proceder ao reembolso integral." },
];

export const steps: Step[] = [
  { id: 1, icon: "ShoppingBag", title: "Escolha a Loja", description: "Navegue pelo nosso catálogo e clique na loja desejada." },
  { id: 2, icon: "Link", title: "Selecione o Produto", description: "Escolha o produto e copie o link ou tire um print." },
  { id: 3, icon: "MessageCircle", title: "Envie pelo WhatsApp", description: "Partilhe o link/print connosco via WhatsApp." },
  { id: 4, icon: "Calculator", title: "Receba o Orçamento", description: "Enviamos o preço final com peso estimado + taxa." },
  { id: 5, icon: "CreditCard", title: "Confirme e Pague", description: "Confirme a encomenda e realize o pagamento." },
  { id: 6, icon: "Truck", title: "Receba em Casa", description: "Receba o seu artigo em Moçambique em 5 dias úteis!" },
];

export const testimonials: Testimonial[] = [
  { id: "1", name: "Ana Silva", location: "Maputo", avatar: "", rating: 5, text: "Serviço excelente! Recebi as minhas encomendas da Zara em apenas 5 dias. Muito profissionais e comunicação clara pelo WhatsApp.", date: "Novembro 2024" },
  { id: "2", name: "João Macuácua", location: "Beira", avatar: "", rating: 5, text: "Já fiz várias encomendas e nunca tive problemas. Preço justo e entrega sempre dentro do prazo. Recomendo a 100%!", date: "Outubro 2024" },
  { id: "3", name: "Maria Tembe", location: "Matola", avatar: "", rating: 5, text: "Finalmente posso comprar roupa de qualidade europeia sem sair de casa. O serviço P2M Express mudou a minha vida!", date: "Novembro 2024" },
  { id: "4", name: "Carlos Mondlane", location: "Maputo", avatar: "", rating: 4, text: "Bom serviço e atenção ao cliente. A embalagem chegou em perfeitas condições. Vou continuar a usar.", date: "Setembro 2024" },
  { id: "5", name: "Fatima Armando", location: "Nampula", avatar: "", rating: 5, text: "Comprei cosméticos da Kiko Milano e chegaram todos intactos. Muito cuidado no manuseamento. Adorei!", date: "Outubro 2024" },
  { id: "6", name: "Pedro Sitoe", location: "Quelimane", avatar: "", rating: 5, text: "Processo simples e rápido. Enviei o link pelo WhatsApp e em menos de uma semana tinha tudo em casa.", date: "Novembro 2024" },
];

export const recentProducts: RecentProduct[] = [
  { id: "1", name: "Casaco Oversize Linho", store: "Zara", image: IMG.casacoLinho, productUrl: "https://www.zara.com/pt/pt/mulher-casacos-l1119.html", customerName: "Ana S.", purchaseDate: "Mai 2026" },
  { id: "2", name: "Vestido Midi Floral", store: "Mango", image: IMG.vestidoFloral, productUrl: "https://shop.mango.com/pt/mulher/vestidos", customerName: "Maria T.", purchaseDate: "Mai 2026" },
  { id: "3", name: "Ténis Air Max 2025", store: "Nike", image: IMG.tenisNike, productUrl: "https://www.nike.com/pt/w/sapatilhas-homem-6ealhzy7ok8", customerName: "João M.", purchaseDate: "Abr 2026" },
  { id: "4", name: "Conjunto Desportivo", store: "Adidas", image: IMG.conjuntoDesportivo, productUrl: "https://www.adidas.pt/treino-e-ginasio", customerName: "Carlos M.", purchaseDate: "Abr 2026" },
  { id: "5", name: "Mala Tiracolo Couro", store: "Stradivarius", image: IMG.malaCouro, productUrl: "https://www.stradivarius.com/pt/mulher/acessorios/bolsas", customerName: "Fatima A.", purchaseDate: "Mar 2026" },
  { id: "6", name: "Kit Maquilhagem Primavera", store: "Kiko Milano", image: IMG.kitMaquilhagem, productUrl: "https://www.kikocosmetics.com/pt-pt/maquilhagem", customerName: "Luisa C.", purchaseDate: "Mar 2026" },
  { id: "7", name: "Jeans Wide Leg", store: "Bershka", image: IMG.jeansWideLeg, productUrl: "https://www.bershka.com/pt/mulher/roupa/jeans", customerName: "Pedro S.", purchaseDate: "Fev 2026" },
  { id: "8", name: "Blazer Estruturado", store: "H&M", image: IMG.blazer, productUrl: "https://www2.hm.com/pt_pt/mulher/produtos/fatos-e-blazers.html", customerName: "Diana R.", purchaseDate: "Jan 2026" },
];

export const sampleOrders: Order[] = [
  { id: "1", trackingCode: "P2M2024001", customerName: "Cliente Teste", status: "delivered", statusDescription: "Encomenda entregue com sucesso", createdAt: "2024-11-01", updatedAt: "2024-11-06", estimatedDelivery: "2024-11-06" },
  { id: "2", trackingCode: "P2M2024002", customerName: "Cliente Demo", status: "in_transit", statusDescription: "Em trânsito para Moçambique", createdAt: "2024-11-20", updatedAt: "2024-11-22", estimatedDelivery: "2024-11-27" },
];

export const sampleOrdersByCode: Record<string, Order> = Object.fromEntries(
  sampleOrders.map((o) => [o.trackingCode, o]),
);
