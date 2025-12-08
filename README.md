# MPA Shared Components

Librería de componentes compartidos para las aplicaciones web de MPA Group.

## Instalación

### Local (usando npm link)

1. En el directorio `mpa-shared-components`:
```bash
npm install
npm run build
npm link
```

2. En tu proyecto (ej: `template-front/frontend`):
```bash
npm link mpa-shared-components
```

### Desde repositorio privado (futuro)
```bash
npm install mpa-shared-components
```

## Uso

### Importar componentes

```tsx
import { NavBar, SideMenu } from 'mpa-shared-components';
import type { MenuItem } from 'mpa-shared-components';
```

### Ejemplo básico

```tsx
import React from 'react';
import { NavBar } from 'mpa-shared-components';

function App() {
  const user = {
    given_name: 'Juan',
    family_name: 'Pérez',
    name: 'Juan Pérez'
  };

  const handleLogout = () => {
    // Tu lógica de logout
    console.log('Logout');
  };

  return (
    <NavBar 
      user={user} 
      onLogout={handleLogout}
    >
      <div>Tu contenido aquí</div>
    </NavBar>
  );
}

export default App;
```

### Con menú personalizado

```tsx
import { NavBar } from 'mpa-shared-components';
import type { MenuItem } from 'mpa-shared-components';

const customMenu: MenuItem[] = [
  {
    id: '1',
    menu: 'Dashboard',
    description: 'Dashboard principal',
    icon: 'dashboard',
    path: '/dashboard',
    level: 1,
    order: 1
  },
  {
    id: '2',
    menu: 'Reportes',
    description: 'Módulo de reportes',
    icon: 'file-alt',
    path: '/reportes',
    level: 1,
    order: 2,
    items: [
      {
        id: '2-1',
        menu: 'Ventas',
        description: 'Reporte de ventas',
        icon: 'chart-line',
        path: '/reportes/ventas',
        level: 2,
        order: 1
      }
    ]
  }
];

<NavBar 
  user={user}
  onLogout={handleLogout}
  menuItems={customMenu}
  logoUrl="https://tu-logo.com/logo.png"
  systemTitle="MI APLICACIÓN"
>
  {children}
</NavBar>
```

## Props

### NavBar

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `children` | `ReactNode` | No | - | Contenido principal de la app |
| `user` | `any` | No | Usuario demo | Objeto de usuario |
| `onLogout` | `() => void` | No | Alert demo | Callback de logout |
| `menuItems` | `MenuItem[]` | No | Menú por defecto | Items del menú |
| `logoUrl` | `string` | No | Logo MPA | URL del logo |
| `systemTitle` | `string` | No | "WEB APPLICATIONS" | Título del sistema |

### SideMenu

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `user` | `any` | Sí | - | Objeto de usuario |
| `isCollapsed` | `boolean` | Sí | - | Estado colapsado |
| `onToggleCollapse` | `() => void` | Sí | - | Toggle collapse |
| `menuItems` | `MenuItem[]` | No | Menú por defecto | Items del menú |
| `logoUrl` | `string` | No | Logo MPA | URL del logo |
| `systemTitle` | `string` | No | "WEB APPLICATIONS" | Título del sistema |

### MenuItem Interface

```typescript
interface MenuItem {
  id: string;
  menu: string;
  description: string;
  icon: string;          // Nombre del icono de FontAwesome
  path: string;
  level: number;
  order: number;
  items?: MenuItem[];    // Submenú (opcional)
}
```

## Dependencias Peer

Asegúrate de tener instaladas estas dependencias en tu proyecto:

- `react` ^18.0.0
- `react-dom` ^18.0.0
- `react-bootstrap` ^2.0.0
- `react-router-dom` ^6.0.0

## Desarrollo

```bash
# Instalar dependencias
npm install

# Compilar en modo desarrollo (watch)
npm run dev

# Compilar para producción
npm run build
```

## Notas

- Los iconos usan FontAwesome. Asegúrate de tener FontAwesome incluido en tu proyecto.
- Los estilos están incluidos en el paquete y se inyectan automáticamente.
- El componente NavBar incluye automáticamente el SideMenu.

## Licencia

ISC - MPA Group
