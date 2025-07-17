# Clona el repositorio
git clone https://github.com/noemvy/lyrics-api
cd lyrics-api

# Instala las dependencias
npm install

# Crea el archivo de variables de entorno
touch .env.local

# Abre el archivo .env.local y agrega tu conexión a MongoDB
echo "MONGODB_URI=tu-cadena-de-conexion" > .env.local

# Corre el proyecto en modo desarrollo
npm run dev

# -------------------------
# Estructura del proyecto 📂
# -------------------------

# Rutas y archivos principales
/app
├── /search/page.tsx               # Página para buscar canciones, letras y ver resultados
├── /favorites/page.tsx            # Página para ver, eliminar favoritos
├── layout.tsx                     # Layout general
└── page.tsx                       # Redirección a /search

/models
└── Favorite.ts                    # Modelo Favorite (title, artist, cover)

/middlewares
└── dbConnect.ts                   # Conexión MongoDB

/pages/api
├── itunes.ts                      # API iTunes
└── /favorites
    ├── [id].ts                    # DELETE por ID
    ├── index.ts                   # GET, POST favoritos
    └── check.ts                   # Verifica si ya está en favoritos

/public
└── /...                            # Archivos públicos opcionales

/services
├── fetchLyrics.ts                 # API Lyrics.ovh
├── fetchItunes.ts                 # API iTunes
└── favoritesAPI.ts                # API favoritos

/types
└── Track.ts                       # Tipado TypeScript

/styles
└── globals.css                    # Tailwind CSS

# Configuración y dependencias
next.config.js                     # Configuración Next.js
tsconfig.json                      # Configuración TypeScript
package.json                       # Dependencias

# -------------------------
# Indicaciones Finales ✅
# -------------------------

# 1️⃣ Haz el login y agregalo como ruta y su pag.tsx.
# 2️⃣ Crea la conexión a la base de datos (.env.local)
# 3️⃣ Corre npm run dev y verifica que funcione correctamente.

# -------------------------
