# MPA Shared Components

Librería de componentes compartidos para las aplicaciones web de MPA Group.

## Instalación

### Local (usando npm link)

> **Nota importante**: Para evitar conflictos de versiones de React al usar npm link, necesitamos crear enlaces simbólicos para que el paquete use la misma versión de React del proyecto consumidor.

#### Método 1: Usando el script automático (recomendado)

```bash
cd mpa-shared-components
npm install
./link-to-project.sh /ruta/absoluta/a/tu/proyecto
```

Por ejemplo:
```bash
./link-to-project.sh /home/joseserna/template-front/frontend
```

Luego en tu proyecto:
```bash
cd /home/joseserna/template-front/frontend
npm link mpa-shared-components
npm start
```

#### Método 2: Manual

1. Instala las dependencias en el paquete:
```bash
cd mpa-shared-components
npm install
```

2. Crea enlaces simbólicos a React del proyecto consumidor:
```bash
# Reemplaza /ruta/a/tu/proyecto con la ruta real de tu proyecto
rm -rf node_modules/react node_modules/react-dom
ln -s /ruta/a/tu/proyecto/node_modules/react node_modules/react
ln -s /ruta/a/tu/proyecto/node_modules/react-dom node_modules/react-dom
```

3. Construye y enlaza el paquete:
```bash
npm run build
npm link
```

4. En tu proyecto (ej: `template-front/frontend`):
```bash
npm link mpa-shared-components
```

5. Si encuentras errores, limpia el cache de webpack:
```bash
rm -rf node_modules/.cache
npm start
```

**Importante**: Cada vez que cambies algo en `mpa-shared-components`, ejecuta `npm run build` y los cambios se reflejarán automáticamente en tu proyecto vinculado.

**⚠️ Limitación de npm link**: Si trabajas con múltiples proyectos simultáneamente, necesitas cambiar los symlinks de React cada vez que cambies de proyecto:

```bash
# Para trabajar con otro proyecto:
cd mpa-shared-components
./link-to-project.sh /ruta/a/otro/proyecto
cd /ruta/a/otro/proyecto
npm link mpa-shared-components
```

**Recomendación**: Usa `npm link` solo durante el desarrollo activo del componente. Para uso regular, instala desde GitHub (ver siguiente sección).

### Desde GitHub (Producción)

Para instalar en proyectos de producción, usa la URL del repositorio:

```bash
npm install git+https://github.com/AguedoMeza/mpa-shared-components.git
```

O agrega a tu `package.json`:
```json
{
  "dependencies": {
    "mpa-shared-components": "git+https://github.com/AguedoMeza/mpa-shared-components.git"
  }
}
```

Para instalar una versión específica (tag):
```bash
npm install git+https://github.com/AguedoMeza/mpa-shared-components.git#v1.0.0
```

#### Actualizar a la última versión

Cuando se publiquen cambios en GitHub:

```bash
npm update mpa-shared-components
# o
npm install git+https://github.com/AguedoMeza/mpa-shared-components.git --force
```

### ¿Cuándo usar cada método?

| Método | Cuándo usar | Ventajas | Desventajas |
|--------|-------------|----------|-------------|
| **npm link** | Desarrollo activo del componente | Cambios en tiempo real | Requiere cambiar symlinks por proyecto |
| **GitHub** | Uso regular en producción/desarrollo | Sin configuración de symlinks, funciona en todos los proyectos | Requiere push + update para ver cambios |

**Recomendación**: Desarrolla con `npm link`, luego cambia a GitHub cuando el componente esté estable.

## Uso

### Importar componentes

```tsx
import { NavBar, SideMenu } from 'mpa-shared-components';
import type { MenuItem } from 'mpa-shared-components';
```

### Ejemplo básico

```tsx
import React from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { NavBar } from 'mpa-shared-components';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  
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
      onNavigate={navigate}
    >
      <Routes>
        <Route path="/" element={<div>Tu contenido aquí</div>} />
      </Routes>
    </NavBar>
  );
};

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
```

> **Nota importante**: NavBar requiere la prop `onNavigate` para la navegación interna del menú. Debes pasar la función `navigate` de `useNavigate()` dentro del contexto del Router.
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
