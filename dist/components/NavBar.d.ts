import React from 'react';
import './NavBar.css';
import { MenuItem } from './SideMenu';
export interface NavBarProps {
    children?: React.ReactNode;
    user?: any;
    onLogout?: () => void;
    menuItems?: MenuItem[];
    logoUrl?: string;
    systemTitle?: string;
    onNavigate?: (path: string) => void;
}
declare const NavBar: React.FC<NavBarProps>;
export default NavBar;
//# sourceMappingURL=NavBar.d.ts.map