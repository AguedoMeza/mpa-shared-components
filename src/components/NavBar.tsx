import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import './NavBar.css';
import SideMenu, { MenuItem } from './SideMenu';
import { appsService } from '../services/appsService';
import { App as BackendApp } from '../types/appTypes';
import { resolverUrlApp } from '../utils/urls';

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
  const [allApps, setAllApps] = useState<AppConfig[]>([]);
  const [allowedAppIds, setAllowedAppIds] = useState<string[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);

  const apps = applications || allApps;
  const currentApp = apps.find(app => app.id === currentAppId);

  // Determinar qué apps están deshabilitadas
  const getDisabledApps = (): string[] => {
    if (allowedAppIds.length > 0) {
      return apps.filter(app => !allowedAppIds.includes(app.id)).map(app => app.id);
    }
    return [];
  };

  const disabledApps = getDisabledApps();

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

  // Consultar backend para obtener catalogo y apps habilitadas del usuario
  useEffect(() => {
    const fetchApps = async () => {
      if (!user) return;
      
      // Intentar obtener el email del usuario (soporta diferentes estructuras)
      const userEmail = user.email || user.mail || user.preferred_username;
      if (!userEmail) {
        console.warn('NavBar: No se pudo determinar el email del usuario');
        return;
      }

      setLoadingApps(true);
      try {
        const [allAppsResponse, userAppsResponse] = await Promise.all([
          appsService.getAllApps(),
          appsService.getUserAppsByEmail(userEmail),
        ]);

        if (allAppsResponse.success && allAppsResponse.data) {
          const mappedAllApps: AppConfig[] = allAppsResponse.data.aplicaciones
            .filter((app) => app.visible && app.activo)
            .sort((a, b) => a.orden - b.orden)
            .map((app) => ({
              id: app.app_id,
              name: app.nombre,
              description: app.descripcion || app.nombre,
              icon: app.icono || 'cube',
              url: app.url,
              color: app.color || '#ff8c42',
            }));
          setAllApps(mappedAllApps);
        } else {
          console.warn('NavBar: Error al obtener catalogo de apps:', allAppsResponse.error);
          setAllApps([]);
        }

        if (userAppsResponse.success && userAppsResponse.data) {
          const ids = userAppsResponse.data.apps
            .filter((app: BackendApp) => app.visible && app.activo)
            .map((app: BackendApp) => app.app_id);
          setAllowedAppIds(ids);
        } else {
          console.warn('NavBar: Error al obtener apps del usuario:', userAppsResponse.error);
          setAllowedAppIds([]);
        }
      } catch (error) {
        console.error('NavBar: Error al consultar apps:', error);
        setAllApps([]);
        setAllowedAppIds([]);
      } finally {
        setLoadingApps(false);
      }
    };

    fetchApps();
  }, [user]);

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
                    {apps.map((app) => {
                      const isDisabled = disabledApps.includes(app.id);
                      return (
                        <a
                          key={app.id}
                          href={isDisabled ? undefined : resolverUrlApp(app.url)}
                          className={`app-item ${currentAppId === app.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                          onClick={(e) => {
                            // Si está deshabilitada, no navegar
                            if (isDisabled) {
                              e.preventDefault();
                              return;
                            }
                            // Si es la app actual o es un placeholder, no navegar
                            if (app.url === '#' || currentAppId === app.id) {
                              e.preventDefault();
                            }
                            setShowAppSwitcher(false);
                          }}
                          title={isDisabled ? 'No tienes acceso a esta aplicación' : app.description}
                        >
                          <div 
                            className="app-icon" 
                            style={{ backgroundColor: isDisabled ? '#3a3a3a' : (app.color || '#ff8c42') }}
                          >
                            <i className={`fa-solid fa-${app.icon}`}></i>
                            {isDisabled && <i className="fa-solid fa-lock disabled-lock"></i>}
                          </div>
                          <span className="app-name">{app.name}</span>
                        </a>
                      );
                    })}
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
