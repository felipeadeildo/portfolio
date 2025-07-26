import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import type { Group, UserGroup } from "~/types";

export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Group[];
    },
  });
}

export function useGroup(id: number) {
  return useQuery({
    queryKey: ["group", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Group;
    },
    enabled: typeof id === "number",
  });
}

export function useUserGroups(userId?: string) {
  return useQuery({
    queryKey: ["user-groups", userId],
    queryFn: async () => {
      let query = supabase.from("user_groups").select(`
          *,
          groups (
            id,
            name,
            created_at
          )
        `);

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as (UserGroup & { groups: Group })[];
    },
    enabled: !!userId,
  });
}
