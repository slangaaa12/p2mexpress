import {
  type User,
  type InsertUser,
  type Store,
  type Promotion,
  type FAQ,
  type Step,
  type Testimonial,
  type RecentProduct,
  type ContactMessage,
  type Order,
} from "@shared/schema";
import {
  stores,
  promotions,
  faqs,
  steps,
  testimonials,
  recentProducts,
  sampleOrders,
} from "@shared/catalog";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getStores(): Promise<Store[]>;
  getPromotions(): Promise<Promotion[]>;
  getFAQs(): Promise<FAQ[]>;
  getSteps(): Promise<Step[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getRecentProducts(): Promise<RecentProduct[]>;
  createContactMessage(message: Omit<ContactMessage, "id" | "createdAt">): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getOrderByTrackingCode(trackingCode: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.orders = new Map();
    sampleOrders.forEach((order) => this.orders.set(order.trackingCode, order));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStores(): Promise<Store[]> {
    return stores;
  }

  async getPromotions(): Promise<Promotion[]> {
    return promotions;
  }

  async getFAQs(): Promise<FAQ[]> {
    return faqs;
  }

  async getSteps(): Promise<Step[]> {
    return steps;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials;
  }

  async getRecentProducts(): Promise<RecentProduct[]> {
    return recentProducts;
  }

  async createContactMessage(
    message: Omit<ContactMessage, "id" | "createdAt">,
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getOrderByTrackingCode(trackingCode: string): Promise<Order | undefined> {
    return this.orders.get(trackingCode.toUpperCase());
  }
}

export const storage = new MemStorage();
