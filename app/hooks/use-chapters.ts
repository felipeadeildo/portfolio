import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import type { Chapter } from "~/types";

export function useChapters(biographyId?: string) {
  return useQuery({
    queryKey: ["chapters", biographyId],
    queryFn: async () => {
      let query = supabase
        .from("chapters")
        .select("*")
        .order("position", { ascending: true });

      if (biographyId) {
        query = query.eq("biography_id", biographyId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Chapter[];
    },
    enabled: !!biographyId,
  });
}

export function useChapter(id: string) {
  return useQuery({
    queryKey: ["chapter", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Chapter;
    },
    enabled: !!id,
  });
}
