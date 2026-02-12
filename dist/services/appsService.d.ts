import { UserAppsResponse, ApiResponse } from '../types/appTypes';
declare class AppsService {
    private buildErrorMessage;
    getUserAppsByEmail(userEmail: string): Promise<ApiResponse<UserAppsResponse>>;
}
export declare const appsService: AppsService;
export default appsService;
//# sourceMappingURL=appsService.d.ts.map