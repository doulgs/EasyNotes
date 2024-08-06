import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm/expressions";
import * as notesSchema from "@/database/schemas/notesSchema";

export type NotesType = {
  id: number;
  name: string;
  status: string | null;
};

type CreateNoteType = Pick<NotesType, "name">;

export function useNotes() {
  const db = useSQLiteContext();
  const database = drizzle(db, { schema: notesSchema });

  async function createNote({ name }: CreateNoteType) {
    try {
      const response = await database.insert(notesSchema.note).values({ name });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  async function updateNote({ id, name, status }: NotesType) {
    try {
      if (status === "PENDENTE") {
        await database
          .update(notesSchema.note)
          .set({ status: "FINALIZADO" })
          .where(eq(notesSchema.note.id, id));
      } else if (status === "FINALIZADO") {
        await database
          .update(notesSchema.note)
          .set({ status: "PENDENTE" })
          .where(eq(notesSchema.note.id, id));
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  async function deleteNote(id: number) {
    try {
      await database.delete(notesSchema.note).where(eq(notesSchema.note.id, id));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  async function fetchNotes(): Promise<NotesType[]> {
    try {
      const response = await database.query.note.findMany();
      return response;
    } catch (error) {
      console.error("Error fetching notes:", error);
      return [];
    }
  }

  return { createNote, updateNote, deleteNote, fetchNotes };
}
