import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Nav, Collapse, Navbar, Dropdown, Button } from 'react-bootstrap';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "/* NavBar Styles - Fixed sidebar layout */\n.app-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n\n.dark-theme {\n  background-color: #000000;\n  color: #ffffff;\n}\n\n.top-navbar {\n  background: linear-gradient(135deg, #252525 0%, #000000 100%) !important;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  padding: 12px 20px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  position: fixed;\n  top: 0;\n  left: 280px;\n  right: 0;\n  height: 70px;\n  z-index: 999;\n  transition: left 0.3s ease;\n}\n\n.top-navbar.sidebar-collapsed {\n  left: 70px;\n}\n\n.breadcrumb-section {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 14px;\n}\n\n.breadcrumb-section .separator {\n  color: rgba(255, 255, 255, 0.4);\n}\n\n.user-info-header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.user-avatar-nav {\n  width: 35px;\n  height: 35px;\n  background: #ff8c42;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: bold;\n  font-size: 12px;\n}\n\n.user-details-nav {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\n.user-name {\n  color: white;\n  font-size: 1rem; \n  white-space: nowrap;\n}\n\n.user-role {\n  color: rgba(255, 255, 255, 0.6);\n  font-size: 11px;\n}\n\n/* Estilos del botón de logout con mayor especificidad */\n.top-navbar .logout-btn-header,\n.top-navbar .logout-btn-header.btn {\n  background-color: #F7941D !important;\n  border: none !important;\n  padding: 8px 16px;\n  color: white !important;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background-color .3s;\n}\n\n.top-navbar .logout-btn-header:hover,\n.top-navbar .logout-btn-header.btn:hover {\n  background-color: #e57f14 !important;\n  color: white !important;\n}\n\n.main-content {\n  flex: 1;\n  padding: 20px;\n  background: #f8f9fa;\n  margin-left: 280px;\n  margin-top: 70px;\n  min-height: calc(100vh - 70px);\n  transition: margin-left 0.3s ease;\n}\n\n.main-content.sidebar-collapsed {\n  margin-left: 70px;\n}\n\n.main-content.with-navbar {\n  padding-top: 0;\n}\n\n/* Navbar brand customization */\n.navbar-brand {\n  color: white !important;\n  font-weight: 600;\n}\n\n.navbar-brand:hover {\n  color: rgba(255, 255, 255, 0.9) !important;\n}\n\n/* App Switcher Styles */\n.app-switcher-dropdown {\n  margin-right: 1rem;\n}\n\n.app-switcher-toggle {\n  background: rgba(255, 255, 255, 0.1) !important;\n  border: 1px solid rgba(255, 255, 255, 0.2) !important;\n  border-radius: 8px !important;\n  padding: 8px 12px !important;\n  color: white !important;\n  text-decoration: none !important;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.app-switcher-toggle:hover,\n.app-switcher-toggle:focus,\n.app-switcher-toggle:active {\n  background: rgba(255, 140, 66, 0.2) !important;\n  border-color: rgba(255, 140, 66, 0.4) !important;\n  box-shadow: none !important;\n  color: #ff8c42 !important;\n}\n\n.app-switcher-toggle::after {\n  display: none !important;\n}\n\n.app-switcher-toggle i {\n  font-size: 1.25rem;\n}\n\n.app-switcher-menu {\n  background: #1a1a1a !important;\n  border: 1px solid rgba(255, 255, 255, 0.1) !important;\n  border-radius: 12px !important;\n  padding: 0 !important;\n  min-width: 320px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;\n  margin-top: 0.5rem !important;\n  right: 0 !important;\n  left: auto !important;\n}\n\n.app-switcher-header {\n  padding: 16px 20px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.app-switcher-header h6 {\n  color: white;\n  font-size: 0.875rem;\n  font-weight: 600;\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.app-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n  padding: 16px;\n}\n\n.app-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 16px 8px;\n  border-radius: 8px;\n  text-decoration: none;\n  transition: all 0.3s ease;\n  cursor: pointer;\n  background: transparent;\n}\n\n.app-item:hover {\n  background: rgba(255, 255, 255, 0.05);\n  transform: translateY(-2px);\n}\n\n.app-item.active {\n  background: rgba(255, 140, 66, 0.15);\n  border: 1px solid rgba(255, 140, 66, 0.3);\n}\n\n.app-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.5rem;\n  transition: transform 0.3s ease;\n}\n\n.app-item:hover .app-icon {\n  transform: scale(1.1);\n}\n\n.app-name {\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 0.75rem;\n  text-align: center;\n  line-height: 1.2;\n  max-width: 100%;\n  word-wrap: break-word;\n}\n\n.app-item:hover .app-name {\n  color: white;\n}\n\n.app-item.active .app-name {\n  color: #ff8c42;\n  font-weight: 600;\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n  .top-navbar {\n    left: 0;\n  }\n  \n  .top-navbar.sidebar-collapsed {\n    left: 0;\n  }\n  \n  .main-content {\n    margin-left: 0;\n  }\n  \n  .main-content.sidebar-collapsed {\n    margin-left: 0;\n  }\n  \n  .user-details-nav {\n    display: none;\n  }\n  \n  .logout-btn-header .ms-2 {\n    display: none;\n  }\n  \n  .app-switcher-dropdown {\n    margin-right: 0.5rem;\n  }\n  \n  .app-switcher-menu {\n    min-width: 280px;\n    right: 0 !important;\n    left: auto !important;\n  }\n  \n  .app-grid {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 8px;\n    padding: 12px;\n  }\n  \n  .app-item {\n    padding: 12px 4px;\n  }\n  \n  .app-icon {\n    width: 40px;\n    height: 40px;\n    font-size: 1.25rem;\n  }\n  \n  .app-name {\n    font-size: 0.7rem;\n  }\n}\n";
styleInject(css_248z$1);

var css_248z = ":root {\n  --nav-font: 0.875rem; /* 14px */\n  --nav-icon: 1.375rem; /* 22px */\n  --nav-gap: 0.875rem; /* 14px */\n  --nav-x: 0.5rem; /* 8px */\n  --nav-y: 0.5rem; /* 8px */\n\n  --nav-sub-font: 0.90625rem; /* 14.5px */\n  --nav-sub-icon: 1.125rem; /* 18px */\n  --nav-sub-indent: 3.5rem; /* 56px */\n  --nav-y-sub: 0.75rem; /* 12px */\n\n  --nav-row-gap: 0.25rem; /* 4px */\n  --brand-orange: #ff8c42;\n  \n  /* Variables para el sidebar */\n  --sidebar-width: 280px;\n  --sidebar-collapsed-width: 70px;\n  --sidebar-transition: 0.3s ease;\n}\n\n/* SideMenu Styles - Fixed Sidebar */\n.sidebar-fixed {\n  position: fixed;\n  left: 0;\n  top: 0;\n  height: 100vh;\n  width: var(--sidebar-width);\n  z-index: 1000;\n  transition: width var(--sidebar-transition);\n}\n\n.sidebar-fixed.collapsed {\n  width: var(--sidebar-collapsed-width);\n}\n\n.sidebar-content {\n  height: 100vh;\n  background: linear-gradient(180deg, #313131 0%, #262626 100%);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);\n}\n\n/* Header */\n.sidebar-header {\n  padding: 1.5625rem 1.25rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  min-height: 5rem;\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  position: relative;\n  transition: all 0.3s ease;\n}\n\n.sidebar-fixed.collapsed .sidebar-header {\n  padding: 1rem;\n  min-height: 4rem;\n  align-items: center;\n  justify-content: center;\n}\n\n.logo-section {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  flex-direction: column;\n  width: 100%;\n}\n\n.logo {\n  width: 50px;\n  height: 50px;\n  background: #ff8c42;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: bold;\n  font-size: 16px;\n  flex-shrink: 0;\n}\n\n.logo-link {\n  border: 0;\n  background: transparent;\n  padding: 0;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n}\n\n.logo-img {\n  height: 34px;\n  width: auto;\n  display: block;\n  object-fit: contain;\n  transition: var(--sidebar-transition);\n}\n\n.sidebar-fixed.collapsed .logo-img {\n  height: 28px;\n}\n\n.system-title {\n  opacity: 1;\n  transition: opacity 0.2s ease;\n}\n\n.sidebar-fixed.collapsed .system-title {\n  opacity: 0;\n  display: none;\n}\n\n.system-title h1 {\n  font-size: 18px;\n  font-weight: 600;\n  margin-bottom: 3px;\n  color: white;\n  white-space: nowrap;\n}\n\n.system-title p {\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 12px;\n  margin: 0;\n}\n\n/* Toggle Button */\n.sidebar-toggle {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(255, 140, 66, 0.2);\n  border: 1px solid rgba(255, 140, 66, 0.3);\n  border-radius: 6px;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--brand-orange);\n  transition: all 0.2s ease;\n}\n\n/* Toggle Button cuando el sidebar está colapsado - MÁS GRANDE */\n.sidebar-toggle.collapsed {\n  position: static;\n  transform: none;\n  width: 48px;\n  height: 48px;\n  background: rgba(255, 140, 66, 0.25);\n  border: 2px solid rgba(255, 140, 66, 0.4);\n  border-radius: 10px;\n  box-shadow: 0 2px 8px rgba(255, 140, 66, 0.2);\n}\n\n.sidebar-toggle:hover {\n  background: rgba(255, 140, 66, 0.3);\n  transform: translateY(-50%) scale(1.05);\n  box-shadow: 0 2px 8px rgba(255, 140, 66, 0.15);\n}\n\n.sidebar-toggle.collapsed:hover {\n  background: rgba(255, 140, 66, 0.35);\n  transform: scale(1.08);\n  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);\n}\n\n.sidebar-toggle i {\n  font-size: 14px;\n  transition: transform 0.3s ease;\n}\n\n.sidebar-toggle.collapsed i {\n  font-size: 22px;\n}\n\n/* Navigation */\n.sidebar-nav {\n  padding: 20px 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--nav-row-gap);\n}\n\n.sidebar-nav .nav {\n  --bs-nav-link-padding-x: 0;\n  --bs-nav-link-padding-y: 0;\n}\n\n.nav-item {\n  display: flex;\n  align-items: center;\n  padding: var(--nav-y) var(--nav-x);\n  color: rgba(255, 255, 255, 0.8);\n  text-decoration: none;\n  transition: all 0.3s ease;\n  border: none;\n  background: none;\n  width: 100%;\n  text-align: left;\n  cursor: pointer;\n  font-size: var(--nav-font);\n  border-radius: 0;\n  position: relative;\n}\n\n.nav-item:hover {\n  background: rgba(255, 140, 66, 0.1);\n  padding-left: calc(var(--nav-x) + 0.3125rem); /* +5px */\n  padding-top: var(--nav-y);\n  padding-bottom: var(--nav-y);\n}\n\n.nav-item.active {\n  background: rgba(255, 140, 66, 0.2);\n  border-right: 0.25rem solid #ff8c42;\n}\n\n.nav-icon {\n  margin-right: var(--nav-gap);\n  font-size: var(--nav-icon);\n  width: calc(var(--nav-icon) + 0.25rem); /* +4px para alinear */\n  text-align: center;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n\n/* Cuando el sidebar está colapsado */\n.sidebar-fixed.collapsed .nav-icon {\n  margin-right: 0;\n  font-size: 1.5rem;\n}\n\n.sidebar-fixed.collapsed .nav-item {\n  justify-content: center;\n  padding: var(--nav-y) 0;\n}\n\n.sidebar-fixed.collapsed .nav-item:hover {\n  padding-left: 0;\n}\n\n.nav-text {\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  opacity: 1;\n  transition: opacity 0.2s ease;\n}\n\n.sidebar-fixed.collapsed .nav-text {\n  opacity: 0;\n  width: 0;\n  display: none;\n}\n\n.nav-arrow {\n  margin-left: auto;\n  font-size: 1rem; /* 16px */\n  flex-shrink: 0;\n}\n\n.sidebar-fixed.collapsed .nav-arrow {\n  display: none;\n}\n\n/* Submenu */\n.submenu-container {\n  background: rgba(0, 0, 0, 0.1);\n}\n\n.submenu-item {\n  padding-left: var(--nav-sub-indent) !important;\n  font-size: var(--nav-sub-font);\n  border-right: none;\n  padding-top: var(--nav-y-sub) !important;\n  padding-bottom: var(--nav-y-sub) !important;\n}\n\n.submenu-item:hover {\n  padding-left: calc(var(--nav-sub-indent) + 0.3125rem) !important; /* +5px */\n  background: rgba(255, 140, 66, 0.05);\n  padding-top: var(--nav-y-sub) !important;\n  padding-bottom: var(--nav-y-sub) !important;\n}\n\n.submenu-icon {\n  font-size: var(--nav-sub-icon);\n  margin-right: 0.75rem; /* 12px */\n  width: calc(var(--nav-sub-icon) + 0.125rem); /* +2px */\n}\n\n/* Hover / Activo: naranja */\n.sidebar-nav .nav-item:hover,\n.sidebar-nav .nav-item.active,\n.sidebar-nav .submenu-item:hover,\n.sidebar-nav .submenu-item.active {\n  color: var(--brand-orange) !important;\n}\n\n.sidebar-nav .nav-item:hover .nav-icon,\n.sidebar-nav .nav-item.active .nav-icon,\n.sidebar-nav .nav-item:hover .nav-arrow,\n.sidebar-nav .nav-item.active .nav-arrow,\n.sidebar-nav .submenu-item:hover .submenu-icon,\n.sidebar-nav .submenu-item.active .submenu-icon {\n  color: var(--brand-orange) !important;\n}\n\n/* Transición suave del color */\n.sidebar-nav .nav-item,\n.sidebar-nav .submenu-item,\n.sidebar-nav .nav-icon,\n.sidebar-nav .submenu-icon,\n.sidebar-nav .nav-arrow {\n  transition: color 0.2s ease;\n}\n\n/* Ajustes base para animación suave */\n.nav-icon,\n.nav-text,\n.nav-arrow {\n  transition: transform 0.28s ease, color 0.2s ease;\n}\n\n/* Variable para controlar cuánto se mueve */\n.nav-item {\n  --hover-shift: 0.2rem;\n}\n\n/* Desplazar icono y texto en hover */\n.nav-item:hover .nav-icon,\n.nav-item:hover .nav-text {\n  transform: translateX(var(--hover-shift));\n}\n\n.sidebar-fixed.collapsed .nav-item:hover .nav-icon {\n  transform: translateX(0) scale(1.1);\n}\n\n/* Tooltip para items colapsados */\n.sidebar-fixed.collapsed .nav-item {\n  position: relative;\n}\n\n.sidebar-fixed.collapsed .nav-item::after {\n  content: attr(title);\n  position: absolute;\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  background: #1a1a1a;\n  color: white;\n  padding: 8px 12px;\n  border-radius: 6px;\n  white-space: nowrap;\n  opacity: 0;\n  pointer-events: none;\n  margin-left: 10px;\n  font-size: 0.875rem;\n  transition: opacity 0.2s ease;\n  z-index: 1001;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n}\n\n.sidebar-fixed.collapsed .nav-item:hover::after {\n  opacity: 1;\n}\n\n/* Respeto a reduce motion */\n@media (prefers-reduced-motion: reduce) {\n  .nav-icon,\n  .nav-text,\n  .nav-arrow {\n    transition: none;\n    transform: none !important;\n  }\n}\n\n/* Responsive */\n@media (max-width: 768px) {\n  .sidebar-fixed {\n    transform: translateX(-100%);\n    transition: transform 0.3s ease, width 0.3s ease;\n  }\n\n  .sidebar-fixed.mobile-visible {\n    transform: translateX(0);\n  }\n  \n  .sidebar-toggle {\n    display: none;\n  }\n}\n\n/* Fix for Bootstrap conflicts */\n.sidebar-content .nav-link {\n  color: inherit;\n  padding: var(--nav-y) var(--nav-x);\n}\n\n.sidebar-content .nav-link:hover,\n.sidebar-content .nav-link:focus {\n  color: inherit;\n  text-decoration: none;\n}\n\n@media (min-width: 1200px) {\n  .logo-img {\n    height: 40px;\n  }\n  \n  .sidebar-fixed.collapsed .logo-img {\n    height: 32px;\n  }\n}\n";
styleInject(css_248z);

const SideMenu = ({ user, isCollapsed, onToggleCollapse, menuItems, logoUrl = 'https://webapplication.mpagroup.mx/aml/static/media/MPA_Logo_W.4ba3d895c671f7aee8be.png', systemTitle = 'WEB APPLICATIONS', onNavigate }) => {
    const [activeMenu, setActiveMenu] = useState('');
    const [userMenu, setUserMenu] = useState([]);
    // Default menu items - can be overridden by props
    const defaultMenu = [
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
            path: 'https://webapplication.mpagroup.mx/mpa-fund-etl',
            level: 1,
            order: 4
        },
        {
            id: '5',
            menu: 'Good Cath',
            description: 'Good Cath',
            icon: 'heart-pulse',
            path: 'https://webapplication.mpagroup.mx/good-catch/#/admin',
            level: 1,
            order: 5
        }
    ];
    useEffect(() => {
        setUserMenu(menuItems || defaultMenu);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuItems]);
    const handleMenuClick = (item) => {
        if (item.items && item.items.length > 0) {
            if (isCollapsed) {
                onToggleCollapse();
            }
            setActiveMenu(activeMenu === item.id ? '' : item.id);
        }
        else {
            if (item.path !== '#') {
                if (onNavigate) {
                    // Si el path es absoluto, navega fuera de la SPA
                    if (/^https?:\/\//.test(item.path)) {
                        window.location.href = item.path;
                    }
                    else {
                        onNavigate(item.path);
                    }
                }
                else {
                    // Si es una URL absoluta, navega directo; si es relativa, usa location.hash
                    if (/^https?:\/\//.test(item.path)) {
                        window.location.href = item.path;
                    }
                    else {
                        window.location.hash = item.path;
                    }
                }
            }
        }
    };
    const handleSubMenuClick = (item) => {
        if (onNavigate) {
            if (/^https?:\/\//.test(item.path)) {
                window.location.href = item.path;
            }
            else {
                onNavigate(item.path);
            }
        }
        else {
            if (/^https?:\/\//.test(item.path)) {
                window.location.href = item.path;
            }
            else {
                window.location.hash = item.path;
            }
        }
    };
    const getFontAwesomeIcon = (iconName) => {
        return jsx("i", { className: `fa-solid fa-${iconName}` });
    };
    return (jsx("div", { className: `sidebar-fixed ${isCollapsed ? 'collapsed' : ''}`, children: jsxs("div", { className: "sidebar-content", children: [jsx("div", { className: "sidebar-header", children: !isCollapsed ? (jsxs(Fragment, { children: [jsxs("div", { className: "logo-section", children: [jsx("a", { href: "https://webapplication.mpagroup.mx/#/", className: "logo-link", "aria-label": "Ir al inicio", title: "Ir al inicio", onClick: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log('Logo clicked - redirecting to home');
                                            window.location.href = 'https://webapplication.mpagroup.mx/#/';
                                        }, children: jsx("img", { src: logoUrl, alt: "Logo", className: "logo-img", loading: "lazy", onError: (e) => { e.currentTarget.style.opacity = '0'; } }) }), jsx("div", { className: "system-title", children: jsx("h1", { children: systemTitle }) })] }), jsx("button", { className: "sidebar-toggle", onClick: onToggleCollapse, "aria-label": "Contraer men\u00FA", title: "Contraer men\u00FA", children: jsx("i", { className: "fa fa-bars", "aria-hidden": "true" }) })] })) : (
                    /* Toggle Button - Colapsado */
                    jsx("button", { className: "sidebar-toggle collapsed", onClick: onToggleCollapse, "aria-label": "Expandir men\u00FA", title: "Expandir men\u00FA", children: jsx("i", { className: "fa fa-bars", "aria-hidden": "true" }) })) }), jsx("div", { className: "sidebar-nav", children: jsx(Nav, { className: "flex-column", children: userMenu.map((item) => (jsxs("div", { children: [jsxs(Nav.Link, { className: `nav-item ${activeMenu === item.id ? 'active' : ''}`, onClick: () => handleMenuClick(item), title: isCollapsed ? item.menu : '', children: [jsx("span", { className: "nav-icon", children: getFontAwesomeIcon(item.icon) }), !isCollapsed && (jsxs(Fragment, { children: [jsx("span", { className: "nav-text", children: item.menu }), item.items && item.items.length > 0 && (jsx("span", { className: "nav-arrow", children: activeMenu === item.id ?
                                                        jsx("i", { className: "fa-solid fa-chevron-up" }) :
                                                        jsx("i", { className: "fa-solid fa-chevron-down" }) }))] }))] }), !isCollapsed && item.items && item.items.length > 0 && (jsx(Collapse, { in: activeMenu === item.id, children: jsx("div", { className: "submenu-container", children: item.items.map((subItem) => (jsxs(Nav.Link, { className: "nav-item submenu-item", onClick: () => handleSubMenuClick(subItem), title: subItem.menu, children: [jsx("span", { className: "nav-icon submenu-icon", children: getFontAwesomeIcon(subItem.icon) }), jsx("span", { className: "nav-text", children: subItem.menu })] }, subItem.id))) }) }))] }, item.id))) }) })] }) }));
};

const NavBar = ({ children, user, onLogout, menuItems, logoUrl, systemTitle, onNavigate, applications, currentAppId }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showAppSwitcher, setShowAppSwitcher] = useState(false);
    // Aplicaciones por defecto
    const defaultApplications = [
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
            url: 'https://webapplication.mpagroup.mx/mpa-fund-etl',
            color: '#96CEB4'
        },
        {
            id: 'good-cath',
            name: 'Good Cath',
            description: 'Good Cath',
            icon: 'heart-pulse',
            url: 'https://webapplication.mpagroup.mx/good-catch/#/admin',
            color: '#FFEAA7'
        }
    ];
    const apps = applications || defaultApplications;
    apps.find(app => app.id === currentAppId);
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
        }
        else {
            alert('Cerrar sesión (demo)');
        }
    };
    // Usuario por defecto
    const showUser = user || { given_name: 'Usuario', family_name: 'Demo', name: 'Usuario Demo' };
    return (jsxs("div", { className: "app-container", children: [jsxs(Fragment, { children: [jsx(SideMenu, { user: showUser, isCollapsed: isSidebarCollapsed, onToggleCollapse: handleToggleSidebar, menuItems: menuItems, logoUrl: logoUrl, systemTitle: systemTitle, onNavigate: onNavigate }), jsx(Navbar, { bg: "dark", variant: "dark", className: `top-navbar ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`, children: jsx(Nav, { className: "ms-auto", children: jsxs("div", { className: "user-info-header", children: [jsxs(Dropdown, { show: showAppSwitcher, onToggle: (isOpen) => setShowAppSwitcher(isOpen), className: "app-switcher-dropdown", align: "end", children: [jsx(Dropdown.Toggle, { variant: "link", className: "app-switcher-toggle", id: "app-switcher-dropdown", children: jsx("i", { className: "fa-solid fa-grip", "aria-hidden": "true" }) }), jsxs(Dropdown.Menu, { className: "app-switcher-menu", align: "end", children: [jsx("div", { className: "app-switcher-header", children: jsx("h6", { children: "WEB APPLICATIONS" }) }), jsx("div", { className: "app-grid", children: apps.map((app) => (jsxs("a", { href: app.url, className: `app-item ${currentAppId === app.id ? 'active' : ''}`, onClick: (e) => {
                                                                // Si es la app actual o es un placeholder, no navegar
                                                                if (app.url === '#' || currentAppId === app.id) {
                                                                    e.preventDefault();
                                                                }
                                                                setShowAppSwitcher(false);
                                                            }, children: [jsx("div", { className: "app-icon", style: { backgroundColor: app.color || '#ff8c42' }, children: jsx("i", { className: `fa-solid fa-${app.icon}` }) }), jsx("span", { className: "app-name", children: app.name })] }, app.id))) })] })] }), jsx("div", { className: "user-details-nav", children: jsxs("span", { className: "user-name", children: ["Hola, ", showUser.given_name && showUser.family_name ? `${showUser.given_name} ${showUser.family_name}` : (showUser.given_name || showUser.name)] }) }), jsx(Button, { onClick: handleLogout, className: "logout-btn-header", children: !isMobile && jsx("span", { className: "ms-2", children: " Cerrar sesi\u00F3n" }) })] }) }) })] }), jsx("main", { className: `main-content with-navbar ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`, children: children })] }));
};

export { NavBar, SideMenu };
//# sourceMappingURL=index.esm.js.map
