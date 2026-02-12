import { AppListResponse, UserAppsResponse, ApiResponse } from '../types/appTypes';

// URL fija del backend de apps
const API_BASE_URL = 'https://webapplication.mpagroup.mx/mpa-apps-hub-servicios';

class AppsService {
  private buildErrorMessage(error: any, defaultMessage: string): string {
    if (error.response) {
      return error.response.data?.detail || error.response.data?.message || defaultMessage;
    }
    if (error.request) {
      return 'No se pudo conectar con el servidor.';
    }
    return error.message || defaultMessage;
  }

  async getAllApps(): Promise<ApiResponse<AppListResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/apps`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          response: {
            status: response.status,
            data: errorData,
          },
        };
      }

      const data: AppListResponse = await response.json();

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.buildErrorMessage(error, 'Error al obtener el catalogo de apps'),
      };
    }
  }

  async getUserAppsByEmail(userEmail: string): Promise<ApiResponse<UserAppsResponse>> {
    try {
      console.log(`📱 NavBar: Obteniendo apps del usuario: ${userEmail}`);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/by-email/${encodeURIComponent(userEmail)}/apps`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          response: {
            status: response.status,
            data: errorData,
          },
        };
      }

      const data: UserAppsResponse = await response.json();
      console.log(`✅ NavBar: Usuario tiene ${data.total_apps} apps asignadas`);

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.error('❌ NavBar: Error obteniendo apps del usuario:', error);

      return {
        success: false,
        error: this.buildErrorMessage(error, 'Error al obtener apps del usuario'),
      };
    }
  }
}

export const appsService = new AppsService();
export default appsService;
