import { relations } from "drizzle-orm"
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
} from "drizzle-orm/pg-core"

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("displa_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    image: varchar("image", { length: 100 }),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_id_index").on(table.email),
  })
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToConversationsTable: many(usersToConversationsTable),
}));

export const conversationsTable = pgTable(
  "conversations",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title").notNull(),
    userIds: varchar("user_ids").array(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const conversationsRelations = relations(conversationsTable, ({ many }) => ({
  usersToConversationsTable: many(usersToConversationsTable),
  conversationsToMessagesTable: many(conversationsToMessagesTable),
}));

export const messagesTable = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    content: text("content").notNull(),
    
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const messagesRelations = relations(messagesTable, ({ many }) => ({
  conversationsToMessagesTable: many(conversationsToMessagesTable),
}));

export const usersToConversationsTable = pgTable(
  "users_to_conversations",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
      conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversationsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndDocumentIndex: index("user_and_conversationindex").on(
      table.userId,
      table.conversationId,
    ),
    // This is a unique constraint on the combination of userId and documentId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.userId, table.conversationId),
  }),
);

export const conversationsToMessagesTable = pgTable(
  "conversations_to_messages",
  {
    id: serial("id").primaryKey(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversationsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
      messageId: uuid("message_id")
      .notNull()
      .references(() => messagesTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    conversationAndMessageIndex: index("conversation_and_message_index").on(
      table.conversationId,
      table.messageId,
    ),
    // This is a unique constraint on the combination of userId and documentId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.conversationId, table.messageId),
  }),
);


export const usersToConversationsRelations = relations(
  usersToConversationsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToConversationsTable.userId],
      references: [usersTable.displayId],
    }),
    conversation: one(conversationsTable, {
      fields: [usersToConversationsTable.conversationId],
      references: [conversationsTable.displayId],
    }),
  }),
);
