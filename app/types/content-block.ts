import type { Tables } from "./supabase";

export type ContentBlock = Tables<"content_blocks">;

export type ContentBlockType = "TEXT" | "MEDIA";

export type ContentBlockInsert = Pick<
  ContentBlock,
  "chapter_id" | "type" | "position"
> & {
  text_content?: string | null;
  media_id?: string | null;
  permission_required?: number | null;
};

export type ContentBlockUpdate = Partial<
  Pick<
    ContentBlock,
    "text_content" | "media_id" | "position" | "permission_required"
  >
>;

export type ContentBlockWithChapter = ContentBlock & {
  chapter: {
    id: string;
    title: string;
    biography_id: string;
  };
};
