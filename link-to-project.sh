#!/bin/bash

# Script para vincular mpa-shared-components a un proyecto usando npm link
# Uso: ./link-to-project.sh /ruta/absoluta/al/proyecto

if [ -z "$1" ]; then
  echo "Error: Debes proporcionar la ruta al proyecto"
  echo "Uso: ./link-to-project.sh /ruta/absoluta/al/proyecto"
  echo "Ejemplo: ./link-to-project.sh /home/joseserna/template-front/frontend"
  exit 1
fi

PROJECT_PATH="$1"

if [ ! -d "$PROJECT_PATH" ]; then
  echo "Error: La ruta '$PROJECT_PATH' no existe"
  exit 1
fi

if [ ! -d "$PROJECT_PATH/node_modules/react" ]; then
  echo "Error: No se encontró node_modules/react en '$PROJECT_PATH'"
  echo "Asegúrate de haber ejecutado 'npm install' en el proyecto primero"
  exit 1
fi

echo "🔗 Vinculando mpa-shared-components a $PROJECT_PATH"
echo ""

# Paso 1: Eliminar React existente
echo "1️⃣  Eliminando versiones de React del paquete..."
rm -rf node_modules/react node_modules/react-dom

# Paso 2: Crear symlinks
echo "2️⃣  Creando enlaces simbólicos a React del proyecto..."
ln -s "$PROJECT_PATH/node_modules/react" node_modules/react
ln -s "$PROJECT_PATH/node_modules/react-dom" node_modules/react-dom

# Paso 3: Build
echo "3️⃣  Construyendo el paquete..."
npm run build

# Paso 4: npm link
echo "4️⃣  Creando link global..."
npm link

echo ""
echo "✅ Configuración completada!"
echo ""
echo "Ahora ejecuta en tu proyecto:"
echo "  cd $PROJECT_PATH"
echo "  npm link mpa-shared-components"
echo "  npm start"
