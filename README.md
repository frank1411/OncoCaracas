# OncoCaracas - Plataforma de Aprendizaje

Una plataforma moderna construida con React, TypeScript y Vite para gestionar contenido educativo.

## 🚀 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 8.0.0

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/frank1411/OncoCaracas.git
cd OncoCaracas
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de variables de entorno:
```bash
cp .env.example .env
```

4. Configura tus variables de entorno en el archivo `.env`

## 🛠️ Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:5173`

## 🏗️ Construcción

Para construir el proyecto para producción:

```bash
npm run build
```

Para previsualizar la construcción:

```bash
npm run preview
```

## 📚 Stack Tecnológico

- ⚛️ React 18
- 🔷 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔥 Firebase
- 💳 Stripe
- 🪝 React Hook Form
- 🌐 React Router
- 📡 TanStack Query
- 🏪 Zustand

## 📁 Estructura del Proyecto

```
OncoCaracas/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas/Rutas principales
│   ├── services/      # Servicios y APIs
│   ├── store/         # Estado global (Zustand)
│   ├── types/         # Definiciones de TypeScript
│   └── utils/         # Utilidades y helpers
├── public/            # Archivos estáticos
└── ...configuración
```

## 🧪 Testing

Para ejecutar los tests:

```bash
npm run test
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza la construcción
- `npm run lint` - Ejecuta el linter

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de función (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
