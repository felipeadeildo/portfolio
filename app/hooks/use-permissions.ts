import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import type {
  BlockGroupPermission,
  BlockUserPermission,
  ChapterGroupPermission,
  ChapterUserPermission,
} from "~/types";

export function useChapterUserPermissions(chapterId?: string) {
  return useQuery({
    queryKey: ["chapter-user-permissions", chapterId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chapter_user_permissions")
        .select("*")
        .eq("chapter_id", chapterId!);

      if (error) throw error;
      return data as ChapterUserPermission[];
    },
    enabled: !!chapterId,
  });
}

export function useChapterGroupPermissions(chapterId?: string) {
  return useQuery({
    queryKey: ["chapter-group-permissions", chapterId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chapter_group_permissions")
        .select(
          `
          *,
          groups (
            id,
            name
          )
        `,
        )
        .eq("chapter_id", chapterId!);

      if (error) throw error;
      return data as (ChapterGroupPermission & {
        groups: { id: number; name: string };
      })[];
    },
    enabled: !!chapterId,
  });
}

export function useBlockUserPermissions(blockId?: string) {
  return useQuery({
    queryKey: ["block-user-permissions", blockId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("block_user_permissions")
        .select("*")
        .eq("block_id", blockId!);

      if (error) throw error;
      return data as BlockUserPermission[];
    },
    enabled: !!blockId,
  });
}

export function useBlockGroupPermissions(blockId?: string) {
  return useQuery({
    queryKey: ["block-group-permissions", blockId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("block_group_permissions")
        .select(
          `
          *,
          groups (
            id,
            name
          )
        `,
        )
        .eq("block_id", blockId!);

      if (error) throw error;
      return data as (BlockGroupPermission & {
        groups: { id: number; name: string };
      })[];
    },
    enabled: !!blockId,
  });
}
