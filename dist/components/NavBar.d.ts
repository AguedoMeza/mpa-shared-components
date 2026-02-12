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
}
declare const NavBar: React.FC<NavBarProps>;
export default NavBar;
//# sourceMappingURL=NavBar.d.ts.map