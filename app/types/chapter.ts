import type { Tables } from "./supabase";

export type Chapter = Tables<"chapters">;

export type ChapterInsert = Pick<
  Chapter,
  "biography_id" | "title" | "position" | "permission_required"
>;

export type ChapterUpdate = Partial<
  Pick<Chapter, "title" | "position" | "permission_required">
>;

export type ChapterWithBiography = Chapter & {
  biography: {
    id: string;
    title: string;
    owner_id: string;
  };
};
