import type { Tables } from "./supabase";

export type Biography = Tables<"biographies">;

export type BiographyInsert = Pick<Biography, "title" | "summary" | "owner_id">;

export type BiographyUpdate = Partial<Pick<Biography, "title" | "summary">>;

export type BiographyWithOwner = Biography & {
  owner: {
    id: string;
    email: string;
  };
};
