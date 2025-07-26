import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import type { ContentBlock } from "~/types";

export function useContentBlocks(chapterId?: string) {
  return useQuery({
    queryKey: ["content-blocks", chapterId],
    queryFn: async () => {
      let query = supabase
        .from("content_blocks")
        .select("*")
        .order("position", { ascending: true });

      if (chapterId) {
        query = query.eq("chapter_id", chapterId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ContentBlock[];
    },
    enabled: !!chapterId,
  });
}

export function useContentBlock(id: string) {
  return useQuery({
    queryKey: ["content-block", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_blocks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as ContentBlock;
    },
    enabled: !!id,
  });
}
