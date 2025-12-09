import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './NavBar.css';
import SideMenu, { MenuItem } from './SideMenu';

export interface NavBarProps {
  children?: React.ReactNode;
  user?: any;
  onLogout?: () => void;
  menuItems?: MenuItem[];
  logoUrl?: string;
  systemTitle?: string;
  onNavigate?: (path: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ 
  children, 
  user,
  onLogout,
  menuItems,
  logoUrl,
  systemTitle,
  onNavigate
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cargar el estado del sidebar desde localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const handleToggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    } else {
      alert('Cerrar sesión (demo)');
    }
  };

  // Usuario por defecto
  const showUser = user || { given_name: 'Usuario', family_name: 'Demo', name: 'Usuario Demo' };

  return (
    <div className="app-container">
      <>
        <SideMenu 
          user={showUser} 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          menuItems={menuItems}
          logoUrl={logoUrl}
          systemTitle={systemTitle}
          onNavigate={onNavigate}
        />

        <Navbar 
          bg="dark" 
          variant="dark" 
          className={`top-navbar ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
        >
          <Nav className="ms-auto">
            <div className="user-info-header">
              <div className="user-details-nav">
                <span className="user-name">
                  Hola, {showUser.given_name && showUser.family_name ? `${showUser.given_name} ${showUser.family_name}` : (showUser.given_name || showUser.name)}
                </span>
              </div>
              <Button 
                onClick={handleLogout}
                className="logout-btn-header"
              > 
                {!isMobile && <span className="ms-2"> Cerrar sesión</span>}
              </Button>
            </div>
          </Nav>
        </Navbar>
      </>
      <main className={`main-content with-navbar ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default NavBar;
