📦 Instalación del Proyecto

1️⃣ Instalar dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
npm install

2️⃣ Iniciar sesión en Supabase
Asegúrate de estar autenticado con tu cuenta de Supabase:
npx supabase login

3️⃣ Inicializar Supabase
Configura tu entorno local con:
npx supabase init

🛠 Generar Tipos del Esquema
Para mantener el esquema de la base de datos sincronizado y generar los tipos de TypeScript, utiliza:
npx supabase gen types typescript --project-id "qlxfbquojsmjxhmguhbr" --schema congreso > src/database.types.ts

📌 Nota: Este comando es esencial para que las definiciones de la base de datos estén actualizadas y listas para usar en el proyecto.

🔄 Compilación de TypeScript a JavaScript
Durante el desarrollo, puedes traducir automáticamente tu código de TypeScript a JavaScript ejecutando:
npx tsc --watch
Esto iniciará un proceso que compilará tu código cada vez que realices cambios.


🚀 Ejecutar el Proyecto
Para iniciar el servidor en modo desarrollo, simplemente ejecuta:
npm run dev
