🎉 Backend Congreso
Este proyecto utiliza Supabase y está desarrollado con TypeScript para gestionar la lógica del backend del Congreso. ¡Sigue los pasos a continuación para configurarlo y ejecutarlo en tu máquina!

🚀 Instalación
Instala las dependencias del proyecto

bash
Copiar código
npm install
Inicia sesión en Supabase

bash
Copiar código
npx supabase login
Inicializa Supabase

bash
Copiar código
npx supabase init
📂 Actualización del Schema Local
Para generar los tipos de TypeScript según el esquema de Supabase, utiliza el siguiente comando:

bash
Copiar código
npx supabase gen types typescript --project-id "qlxfbquojsmjxhmguhbr" --schema congreso > database.types.ts
🔧 Traducción de TypeScript a JavaScript
Para traducir tu proyecto de TypeScript a JavaScript de forma automática mientras trabajas, ejecuta:

bash
Copiar código
npx tsc --watch
🏃 Ejecución del Proyecto
Para ejecutar el servidor en modo desarrollo, usa:

bash
Copiar código
npm run dev
¡Y listo! 🎉 Ahora estás listo para trabajar en el backend del Congreso. Si tienes alguna duda, revisa la documentación o comunícate con el equipo. 
