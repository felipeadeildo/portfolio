import type { Tables } from "./supabase";

export type ChapterUserPermission = Tables<"chapter_user_permissions">;
export type ChapterGroupPermission = Tables<"chapter_group_permissions">;
export type BlockUserPermission = Tables<"block_user_permissions">;
export type BlockGroupPermission = Tables<"block_group_permissions">;

export type PermissionType = "user" | "group";

export interface ChapterPermission {
  chapter_id: string;
  type: PermissionType;
  target_id: string | number;
}

export interface BlockPermission {
  block_id: string;
  type: PermissionType;
  target_id: string | number;
}
