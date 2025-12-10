import React, { useState, useEffect } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
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

const SideMenu: React.FC<SideMenuProps> = ({ 
  user, 
  isCollapsed, 
  onToggleCollapse,
  menuItems,
  logoUrl = 'https://webapplication.mpagroup.mx/aml/static/media/MPA_Logo_W.4ba3d895c671f7aee8be.png',
  systemTitle = 'WEB APPLICATIONS',
  onNavigate
}) => {
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [userMenu, setUserMenu] = useState<MenuItem[]>([]);

  // Default menu items - can be overridden by props
  const defaultMenu: MenuItem[] = [
    {
      id: '1',
      menu: 'MPA WHSE',
      description: 'MPA WHSE',
      icon: 'helmet-safety',
      path: 'https://webapplication.mpagroup.mx/trabajos-whse/',
      level: 1,
      order: 1
    },
    {
      id: '2',
      menu: 'AML',
      description: 'Anti-Money Laundering',
      icon: 'shield-alt',
      path: 'https://webapplication.mpagroup.mx/aml/',
      level: 1,
      order: 2
    },
    {
      id: '3',
      menu: 'MPA CAF',
      description: 'MPA CAF',
      icon: 'file-invoice',
      path: 'https://webapplication.mpagroup.mx/mpa-webapp-caf/',
      level: 1,
      order: 3
    },
    {
      id: '4',
      menu: 'MRI Data Extraction',
      description: 'MRI Data Extraction',
      icon: 'database',
      path: '#',
      level: 1,
      order: 4
    },
    {
      id: '5',
      menu: 'Good Cath',
      description: 'Good Cath',
      icon: 'heart-pulse',
      path: '#',
      level: 1,
      order: 5
    }
  ];

  useEffect(() => {
    setUserMenu(menuItems || defaultMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItems]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.items && item.items.length > 0) {
      if (isCollapsed) {
        onToggleCollapse();
      }
      setActiveMenu(activeMenu === item.id ? '' : item.id);
    } else {
      if (item.path.startsWith('http://') || item.path.startsWith('https://')) {
        window.open(item.path, '_blank', 'noopener,noreferrer');
      } else if (item.path !== '#') {
        if (onNavigate) {
          onNavigate(item.path);
        } else {
          window.location.hash = item.path;
        }
      }
    }
  };

  const handleSubMenuClick = (item: MenuItem) => {
    if (onNavigate) {
      onNavigate(item.path);
    } else {
      window.location.hash = item.path;
    }
  };

  const getFontAwesomeIcon = (iconName: string) => {
    return <i className={`fa-solid fa-${iconName}`}></i>;
  };

  return (
    <div className={`sidebar-fixed ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        {/* Header */}
        <div className="sidebar-header">
          {!isCollapsed ? (
            <>
              <div className="logo-section">
                <a
                  href="https://webapplication.mpagroup.mx/#/"
                  className="logo-link"
                  aria-label="Ir al inicio"
                  title="Ir al inicio"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.replace('https://webapplication.mpagroup.mx/#/');
                  }}
                >
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="logo-img"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                  />
                </a>

                <div className="system-title">
                  <h1>{systemTitle}</h1>
                </div>
              </div>

              {/* Toggle Button - Normal */}
              <button
                className="sidebar-toggle"
                onClick={onToggleCollapse}
                aria-label="Contraer menú"
                title="Contraer menú"
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </button>
            </>
          ) : (
            /* Toggle Button - Colapsado */
            <button
              className="sidebar-toggle collapsed"
              onClick={onToggleCollapse}
              aria-label="Expandir menú"
              title="Expandir menú"
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="sidebar-nav">
          <Nav className="flex-column">
            {userMenu.map((item) => (
              <div key={item.id}>
                <Nav.Link
                  className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item)}
                  title={isCollapsed ? item.menu : ''}
                >
                  <span className="nav-icon">{getFontAwesomeIcon(item.icon)}</span>
                  {!isCollapsed && (
                    <>
                      <span className="nav-text">{item.menu}</span>
                      {item.items && item.items.length > 0 && (
                        <span className="nav-arrow">
                          {activeMenu === item.id ?
                            <i className="fa-solid fa-chevron-up"></i> :
                            <i className="fa-solid fa-chevron-down"></i>
                          }
                        </span>
                      )}
                    </>
                  )}
                </Nav.Link>

                {/* Submenu */}
                {!isCollapsed && item.items && item.items.length > 0 && (
                  <Collapse in={activeMenu === item.id}>
                    <div className="submenu-container">
                      {item.items.map((subItem) => (
                        <Nav.Link
                          key={subItem.id}
                          className="nav-item submenu-item"
                          onClick={() => handleSubMenuClick(subItem)}
                          title={subItem.menu}
                        >
                          <span className="nav-icon submenu-icon">
                            {getFontAwesomeIcon(subItem.icon)}
                          </span>
                          <span className="nav-text">{subItem.menu}</span>
                        </Nav.Link>
                      ))}
                    </div>
                  </Collapse>
                )}
              </div>
            ))}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
