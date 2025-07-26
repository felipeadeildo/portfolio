import type { Tables } from "./supabase";

export type Group = Tables<"groups">;

export type GroupInsert = Pick<Group, "name">;

export type GroupUpdate = Partial<Pick<Group, "name">>;

export type UserGroup = Tables<"user_groups">;

export type GroupWithUsers = Group & {
  user_groups: Array<{
    user_id: string;
    user: {
      id: string;
      email: string;
    };
  }>;
};
