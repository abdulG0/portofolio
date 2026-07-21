import { pgTable, text, timestamp, boolean, jsonb, integer, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============ CONSULTATION TABLES ============

export const consultationRequests = pgTable(
  "consultation_requests",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    name: text("name").notNull(),
    phone: text("phone"),
    company: text("company"),
    consultationType: text("consultationType").notNull(), // "web_dev", "mobile", "ai_ml", "architecture", "consulting"
    projectDescription: text("projectDescription").notNull(),
    budget: text("budget"), // "under_5k", "5k_10k", "10k_25k", "25k_50k", "50k_plus"
    timeline: text("timeline"), // "urgent", "1_month", "3_months", "no_deadline"
    chatToken: text("chatToken").notNull().unique(), // unique identifier for the chat session
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    status: text("status").notNull().default("open"), // "open", "in_progress", "closed"
  },
  (table) => ({
    emailIdx: index("consultation_requests_email_idx").on(table.email),
    chatTokenIdx: index("consultation_requests_chatToken_idx").on(table.chatToken),
  })
);

export const consultationMessages = pgTable(
  "consultation_messages",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    consultationId: text("consultationId").notNull(),
    senderType: text("senderType").notNull(), // "user" or "admin"
    senderEmail: text("senderEmail").notNull(),
    senderName: text("senderName").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    consultationIdx: index("consultation_messages_consultationId_idx").on(
      table.consultationId
    ),
    createdAtIdx: index("consultation_messages_createdAt_idx").on(table.createdAt),
  })
);

// Relations
export const consultationRequestsRelations = relations(
  consultationRequests,
  ({ many }) => ({
    messages: many(consultationMessages),
  })
);

export const consultationMessagesRelations = relations(
  consultationMessages,
  ({ one }) => ({
    consultation: one(consultationRequests, {
      fields: [consultationMessages.consultationId],
      references: [consultationRequests.id],
    }),
  })
);

export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type ConsultationMessage = typeof consultationMessages.$inferSelect;
