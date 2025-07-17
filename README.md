# 🎵 Music Search App 🎧

---

## 🚀 Instalación Rápida

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

# Instala las dependencias
npm install

# Crea tu archivo de entorno para la conexión a MongoDB
echo "MONGODB_URI=tu-cadena-de-conexion" > .env.local

# Corre el proyecto en modo desarrollo
npm run dev

/app
├── /search/page.tsx         # Buscar canciones, letras y ver resultados
├── /favorites/page.tsx      # Ver y eliminar favoritos
├── layout.tsx               # Layout general
└── page.tsx                 # Redirección a /search

/models
└── Favorite.ts              # Esquema Favorite (title, artist, cover)

/middlewares
└── dbConnect.ts             # Conexión a MongoDB

/pages/api
├── itunes.ts                # API de iTunes
└── /favorites
    ├── [id].ts              # DELETE por ID
    ├── index.ts             # GET y POST favoritos
    └── check.ts             # Verifica si ya está en favoritos

/public
└── ...                      # Archivos públicos opcionales

/services
├── fetchLyrics.ts           # API Lyrics.ovh
├── fetchApi.ts              # API iTunes
└── favoritesAPI.ts          # API Favoritos

/types
└── Track.ts                 # Tipado TypeScript para Track

/styles
└── globals.css              # Estilos con Tailwind CSS

next.config.js               # Configuración Next.js (dominios externos imágenes)
tsconfig.json                # Configuración TypeScript
package.json                 # Dependencias del proyecto


MONGODB_URI=tu-cadena-de-conexion

✅ Instrucciones Finales
1️⃣ Realiza login y agregalo como ruta 
3️⃣ Verifica que redirija correctamente a /search.