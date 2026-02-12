import React from 'react';
import './NavBar.css';
import { MenuItem } from './SideMenu';
export interface AppConfig {
    id: string;
    name: string;
    description: string;
    icon: string;
    url: string;
    color?: string;
}
export interface NavBarProps {
    children?: React.ReactNode;
    user?: any;
    onLogout?: () => void;
    menuItems?: MenuItem[];
    logoUrl?: string;
    systemTitle?: string;
    onNavigate?: (path: string) => void;
    applications?: AppConfig[];
    currentAppId?: string;
    /** IDs de apps deshabilitadas manualmente (alternativa al backend) */
    disabledAppIds?: string[];
    /** Si es true, obtiene las apps desde el backend en lugar de usar las por defecto */
    fetchAppsFromBackend?: boolean;
}
declare const NavBar: React.FC<NavBarProps>;
export default NavBar;
//# sourceMappingURL=NavBar.d.ts.map