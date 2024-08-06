import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const note = sqliteTable("notes", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").default("PENDENTE"),
});
