import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import './NavBar.css';
import SideMenu, { MenuItem } from './SideMenu';

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

const NavBar: React.FC<NavBarProps> = ({ 
  children, 
  user,
  onLogout,
  menuItems,
  logoUrl,
  systemTitle,
  onNavigate,
  applications,
  currentAppId
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);

  // Aplicaciones por defecto
  const defaultApplications: AppConfig[] = [
    {
      id: 'mpa-whse',
      name: 'MPA WHSE',
      description: 'MPA WHSE',
      icon: 'helmet-safety',
      url: 'https://webapplication.mpagroup.mx/trabajos-whse/',
      color: '#FF6B6B'
    },
    {
      id: 'aml',
      name: 'AML',
      description: 'Anti-Money Laundering',
      icon: 'shield-alt',
      url: 'https://webapplication.mpagroup.mx/aml/',
      color: '#4ECDC4'
    },
    {
      id: 'mpa-caf',
      name: 'MPA CAF',
      description: 'MPA CAF',
      icon: 'file-invoice',
      url: 'https://webapplication.mpagroup.mx/mpa-webapp-caf/',
      color: '#45B7D1'
    },
    {
      id: 'mri-data',
      name: 'MRI Data Extraction',
      description: 'MRI Data Extraction',
      icon: 'database',
      url: '#',
      color: '#96CEB4'
    },
    {
      id: 'good-cath',
      name: 'Good Cath',
      description: 'Good Cath',
      icon: 'heart-pulse',
      url: '#',
      color: '#FFEAA7'
    }
  ];

  const apps = applications || defaultApplications;
  const currentApp = apps.find(app => app.id === currentAppId);

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
              {/* App Switcher */}
              <Dropdown 
                show={showAppSwitcher} 
                onToggle={(isOpen) => setShowAppSwitcher(isOpen)}
                className="app-switcher-dropdown"
                align="end"
              >
                <Dropdown.Toggle 
                  variant="link" 
                  className="app-switcher-toggle"
                  id="app-switcher-dropdown"
                >
                  <i className="fa-solid fa-grip" aria-hidden="true"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className="app-switcher-menu" align="end">
                  <div className="app-switcher-header">
                    <h6>WEB APPLICATIONS</h6>
                  </div>
                  <div className="app-grid">
                    {apps.map((app) => (
                      <a
                        key={app.id}
                        href={app.url}
                        className={`app-item ${currentAppId === app.id ? 'active' : ''}`}
                        onClick={(e) => {
                          // Si es la app actual o es un placeholder, no navegar
                          if (app.url === '#' || currentAppId === app.id) {
                            e.preventDefault();
                          }
                          setShowAppSwitcher(false);
                        }}
                      >
                        <div 
                          className="app-icon" 
                          style={{ backgroundColor: app.color || '#ff8c42' }}
                        >
                          <i className={`fa-solid fa-${app.icon}`}></i>
                        </div>
                        <span className="app-name">{app.name}</span>
                      </a>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

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
