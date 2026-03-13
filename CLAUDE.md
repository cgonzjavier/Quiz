# IUS - Plataforma de estudio Código Penal

## Stack
- React + Vite
- Supabase (DB + Auth)
- Vercel (deploy)

## Estado actual
- Auth: pendiente de migrar a Supabase Auth (ahora usa fetch a /api/login)
- Estilos: CSS modules con variables en Global.css
- Componentes en src/components, estilos en src/styles

## Próximos pasos
1. Migrar login a Supabase Auth
2. Añadir registro de usuario
3. Proteger rutas (solo usuarios logueados)
4. Integrar Stripe para suscripciones