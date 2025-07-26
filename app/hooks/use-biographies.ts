import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import type { Biography } from "~/types";

export function useBiographies() {
  return useQuery({
    queryKey: ["biographies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("biographies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Biography[];
    },
  });
}

export function useBiography(id: string) {
  return useQuery({
    queryKey: ["biography", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("biographies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Biography;
    },
    enabled: !!id,
  });
}
