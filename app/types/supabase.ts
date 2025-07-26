export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      biographies: {
        Row: {
          created_at: string;
          id: string;
          owner_id: string;
          summary: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          owner_id: string;
          summary?: string | null;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          owner_id?: string;
          summary?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      block_group_permissions: {
        Row: {
          block_id: string;
          group_id: number;
        };
        Insert: {
          block_id: string;
          group_id: number;
        };
        Update: {
          block_id?: string;
          group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "block_group_permissions_block_id_fkey";
            columns: ["block_id"];
            isOneToOne: false;
            referencedRelation: "content_blocks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "block_group_permissions_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
      block_user_permissions: {
        Row: {
          block_id: string;
          user_id: string;
        };
        Insert: {
          block_id: string;
          user_id: string;
        };
        Update: {
          block_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "block_user_permissions_block_id_fkey";
            columns: ["block_id"];
            isOneToOne: false;
            referencedRelation: "content_blocks";
            referencedColumns: ["id"];
          },
        ];
      };
      chapter_group_permissions: {
        Row: {
          chapter_id: string;
          group_id: number;
        };
        Insert: {
          chapter_id: string;
          group_id: number;
        };
        Update: {
          chapter_id?: string;
          group_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "chapter_group_permissions_chapter_id_fkey";
            columns: ["chapter_id"];
            isOneToOne: false;
            referencedRelation: "chapters";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chapter_group_permissions_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
      chapter_user_permissions: {
        Row: {
          chapter_id: string;
          user_id: string;
        };
        Insert: {
          chapter_id: string;
          user_id: string;
        };
        Update: {
          chapter_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chapter_user_permissions_chapter_id_fkey";
            columns: ["chapter_id"];
            isOneToOne: false;
            referencedRelation: "chapters";
            referencedColumns: ["id"];
          },
        ];
      };
      chapters: {
        Row: {
          biography_id: string;
          created_at: string;
          id: string;
          permission_required: number;
          position: number;
          title: string;
        };
        Insert: {
          biography_id: string;
          created_at?: string;
          id?: string;
          permission_required?: number;
          position: number;
          title: string;
        };
        Update: {
          biography_id?: string;
          created_at?: string;
          id?: string;
          permission_required?: number;
          position?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chapters_biography_id_fkey";
            columns: ["biography_id"];
            isOneToOne: false;
            referencedRelation: "biographies";
            referencedColumns: ["id"];
          },
        ];
      };
      content_blocks: {
        Row: {
          chapter_id: string;
          created_at: string;
          id: string;
          media_id: string | null;
          permission_required: number | null;
          position: number;
          text_content: string | null;
          type: string;
        };
        Insert: {
          chapter_id: string;
          created_at?: string;
          id?: string;
          media_id?: string | null;
          permission_required?: number | null;
          position: number;
          text_content?: string | null;
          type: string;
        };
        Update: {
          chapter_id?: string;
          created_at?: string;
          id?: string;
          media_id?: string | null;
          permission_required?: number | null;
          position?: number;
          text_content?: string | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "content_blocks_chapter_id_fkey";
            columns: ["chapter_id"];
            isOneToOne: false;
            referencedRelation: "chapters";
            referencedColumns: ["id"];
          },
        ];
      };
      groups: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      user_groups: {
        Row: {
          group_id: number;
          user_id: string;
        };
        Insert: {
          group_id: number;
          user_id: string;
        };
        Update: {
          group_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_groups_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_view_block: {
        Args: { block_id_param: string };
        Returns: boolean;
      };
      can_view_chapter: {
        Args: { chapter_id_param: string };
        Returns: boolean;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      user_in_group: {
        Args: { group_id_param: number };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
