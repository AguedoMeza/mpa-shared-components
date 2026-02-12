// Tipos para el sistema de aplicaciones y permisos

export interface App {
  id_aplicacion: number;
  app_id: string;
  nombre: string;
  descripcion: string | null;
  icono: string | null;
  color: string | null;
  url: string;
  orden: number;
  visible: boolean;
  activo: boolean;
  fecha_registro: string;
  fecha_modificacion: string | null;
}

export interface AppListResponse {
  total: number;
  aplicaciones: App[];
}

export interface UserAppsResponse {
  user_id: string;
  user_email: string;
  user_display_name: string | null;
  apps: App[];
  total_apps: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
