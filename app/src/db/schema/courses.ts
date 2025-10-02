import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  youtubeUrl: text("youtube_url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  duration: integer("duration"), // seconds
  creatorName: text("creator_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export default courses;