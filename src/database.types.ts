export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  congreso: {
    Tables: {
      tbl_administradores: {
        Row: {
          contrasena: string | null
          correo: string | null
          id_administrador: number
        }
        Insert: {
          contrasena?: string | null
          correo?: string | null
          id_administrador: number
        }
        Update: {
          contrasena?: string | null
          correo?: string | null
          id_administrador?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_administradores_id_administrador_fkey"
            columns: ["id_administrador"]
            isOneToOne: true
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
        ]
      }
      tbl_asistencias: {
        Row: {
          hora_entrada: string
          hora_salida: string
          id_asistencia: number
          id_conferencia: number
          id_usuario: number
          validacion: boolean
        }
        Insert: {
          hora_entrada?: string
          hora_salida: string
          id_asistencia?: number
          id_conferencia: number
          id_usuario: number
          validacion?: boolean
        }
        Update: {
          hora_entrada?: string
          hora_salida?: string
          id_asistencia?: number
          id_conferencia?: number
          id_usuario?: number
          validacion?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "tbl_asistencias_id_conferencia_fkey"
            columns: ["id_conferencia"]
            isOneToOne: false
            referencedRelation: "tbl_conferencias"
            referencedColumns: ["id_conferencia"]
          },
          {
            foreignKeyName: "tbl_asistencias_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_conferencias: {
        Row: {
          cupos: number | null
          descripcion: string
          direccion: string
          fecha_conferencia: string
          hora_final: string
          hora_inicio: string
          id_conferencia: number
          id_ponente: number
          nombre: string
        }
        Insert: {
          cupos?: number | null
          descripcion: string
          direccion: string
          fecha_conferencia: string
          hora_final: string
          hora_inicio: string
          id_conferencia?: number
          id_ponente: number
          nombre: string
        }
        Update: {
          cupos?: number | null
          descripcion?: string
          direccion?: string
          fecha_conferencia?: string
          hora_final?: string
          hora_inicio?: string
          id_conferencia?: number
          id_ponente?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_conferencias_id_ponente_fkey"
            columns: ["id_ponente"]
            isOneToOne: false
            referencedRelation: "tbl_ponentes"
            referencedColumns: ["id_ponente"]
          },
        ]
      }
      tbl_diplomas: {
        Row: {
          fecha_creacion: string
          id_diploma: number
          id_usuario: number
          url_diploma: string | null
        }
        Insert: {
          fecha_creacion?: string
          id_diploma?: number
          id_usuario: number
          url_diploma?: string | null
        }
        Update: {
          fecha_creacion?: string
          id_diploma?: number
          id_usuario?: number
          url_diploma?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_diplomas_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_personas: {
        Row: {
          apellidos: string
          id_persona: number
          nombres: string
        }
        Insert: {
          apellidos: string
          id_persona?: number
          nombres: string
        }
        Update: {
          apellidos?: string
          id_persona?: number
          nombres?: string
        }
        Relationships: []
      }
      tbl_ponentes: {
        Row: {
          descripcion: string | null
          id_ponente: number
          img_perfil: string | null
          nacionalidad: string | null
          nivel_academico: string | null
        }
        Insert: {
          descripcion?: string | null
          id_ponente: number
          img_perfil?: string | null
          nacionalidad?: string | null
          nivel_academico?: string | null
        }
        Update: {
          descripcion?: string | null
          id_ponente?: number
          img_perfil?: string | null
          nacionalidad?: string | null
          nivel_academico?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_ponentes_id_ponente_fkey"
            columns: ["id_ponente"]
            isOneToOne: true
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
        ]
      }
      tbl_qr_codes: {
        Row: {
          id_qr: number
          id_usuario: number
          url_qr: string
        }
        Insert: {
          id_qr?: number
          id_usuario: number
          url_qr: string
        }
        Update: {
          id_qr?: number
          id_usuario?: number
          url_qr?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_qr_codes_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      tbl_recursos: {
        Row: {
          descripcion: string | null
          id_conferencia: number
          id_recurso: number
          url_recurso: string
        }
        Insert: {
          descripcion?: string | null
          id_conferencia: number
          id_recurso?: number
          url_recurso: string
        }
        Update: {
          descripcion?: string | null
          id_conferencia?: number
          id_recurso?: number
          url_recurso?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_recursos_id_conferencia_fkey"
            columns: ["id_conferencia"]
            isOneToOne: false
            referencedRelation: "tbl_conferencias"
            referencedColumns: ["id_conferencia"]
          },
        ]
      }
      tbl_usuarios: {
        Row: {
          codigo_recibo: string
          contrasena: string
          correo: string
          dni: string
          estudiante: boolean
          externo: boolean
          fecha_nacimiento: string | null
          genero: string | null
          id_usuario: number
          identificador_unah: number | null
          img_recibo: string
          telefono: number
        }
        Insert: {
          codigo_recibo: string
          contrasena: string
          correo: string
          dni: string
          estudiante: boolean
          externo: boolean
          fecha_nacimiento?: string | null
          genero?: string | null
          id_usuario: number
          identificador_unah?: number | null
          img_recibo: string
          telefono: number
        }
        Update: {
          codigo_recibo?: string
          contrasena?: string
          correo?: string
          dni?: string
          estudiante?: boolean
          externo?: boolean
          fecha_nacimiento?: string | null
          genero?: string | null
          id_usuario?: number
          identificador_unah?: number | null
          img_recibo?: string
          telefono?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_usuarios_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: true
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
        ]
      }
      tbl_verificaciones: {
        Row: {
          codigo_verificacion: string | null
          estado: boolean | null
          fecha_expiracion: string | null
          fecha_validacion: string | null
          id_usuario: number
          id_verificacion: number
        }
        Insert: {
          codigo_verificacion?: string | null
          estado?: boolean | null
          fecha_expiracion?: string | null
          fecha_validacion?: string | null
          id_usuario: number
          id_verificacion?: number
        }
        Update: {
          codigo_verificacion?: string | null
          estado?: boolean | null
          fecha_expiracion?: string | null
          fecha_validacion?: string | null
          id_usuario?: number
          id_verificacion?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_verificaciones_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      p_select_tabla: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_persona: number
          nombres: string
          apellidos: string
        }[]
      }
      p_select_tabla_parametro: {
        Args: {
          p_id_persona: number
        }
        Returns: {
          id_persona: number
          nombres: string
          apellidos: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
