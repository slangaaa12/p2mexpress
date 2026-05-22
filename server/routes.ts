import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAppConfig } from "./envConfig";
import { z } from "zod";

const contactMessageSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/stores", async (req, res) => {
    try {
      const stores = await storage.getStores();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stores" });
    }
  });

  app.get("/api/promotions", async (req, res) => {
    try {
      const promotions = await storage.getPromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promotions" });
    }
  });

  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  app.get("/api/steps", async (req, res) => {
    try {
      const steps = await storage.getSteps();
      res.json(steps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch steps" });
    }
  });

  app.get("/api/config", async (_req, res) => {
    res.json(getAppConfig());
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/recent-products", async (req, res) => {
    try {
      const products = await storage.getRecentProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent products" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message: "Mensagem enviada com sucesso!", id: message.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  app.get("/api/track/:trackingCode", async (req, res) => {
    try {
      const { trackingCode } = req.params;
      const order = await storage.getOrderByTrackingCode(trackingCode);
      if (!order) {
        res.status(404).json({ error: "Encomenda não encontrada. Verifique o código de rastreio." });
        return;
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to track order" });
    }
  });

  return httpServer;
}
