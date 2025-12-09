import React from 'react';
import './SideMenu.css';
export interface SideMenuProps {
    user: any;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    menuItems?: MenuItem[];
    logoUrl?: string;
    systemTitle?: string;
    onNavigate?: (path: string) => void;
}
export interface MenuItem {
    id: string;
    menu: string;
    description: string;
    icon: string;
    path: string;
    level: number;
    order: number;
    items?: MenuItem[];
}
declare const SideMenu: React.FC<SideMenuProps>;
export default SideMenu;
//# sourceMappingURL=SideMenu.d.ts.map