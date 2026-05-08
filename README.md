# Raíz — Plataforma de Legado Familiar

Plataforma mexicana de deathtech que acompaña a familias en dos momentos: organizar el legado en vida, y gestionar la herencia al morir.

## Arquitectura — Los 5 Cerebros

Cada servicio de la plataforma está construido sobre uno de estos 5 principios de diseño:

| Cerebro | Responsabilidad | Implementación |
|---------|----------------|----------------|
| **El Intérprete** | Convierte respuestas simples en mapa de patrimonio | `POST /api/interprete/mapear` |
| **El Anticipador** | Genera plan de trámites según el patrimonio | `GET /api/anticipador/plan/:userId` |
| **El Coordinador** | Asigna notarios, agenda citas, prepara docs | `POST /api/coordinador/asignar-notario` |
| **El Guardián** | Bóveda con contexto, alertas proactivas | `GET /api/guardian/boveda` + alertas |
| **El Acompañante** | Modo heredero — un paso a la vez | `POST /api/heredero/activar` |

## Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Base de datos:** PostgreSQL + Drizzle ORM
- **Autenticación:** JWT (tokens Bearer)
- **APIs externas:** Mifiel (firma electrónica), Verificamex (CURP/RENAPO)

## Estructura del monorepo

```
raiz/
├── apps/
│   ├── web/          # Frontend React (Vite)
│   └── api/          # Backend Express
├── packages/
│   └── types/        # Tipos compartidos TypeScript
├── package.json      # Workspace root
└── README.md
```

## Setup rápido

```bash
# Instalar dependencias
npm install

# Variables de entorno
cp apps/api/.env.example apps/api/.env
# Editar .env con tus valores

# Base de datos
cd apps/api && npm run db:push

# Desarrollo
npm run dev        # Corre frontend + backend en paralelo
```

## Variables de entorno (apps/api/.env)

```
DATABASE_URL=postgresql://user:password@localhost:5432/raiz
JWT_SECRET=tu-secreto-aqui
PORT=3001

# APIs externas (cuando estés listo para conectar)
MIFIEL_APP_ID=
MIFIEL_APP_SECRET=
VERIFICAMEX_API_KEY=
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Registro
- `POST /api/auth/login` — Login  
- `GET /api/auth/me` — Usuario actual
- `POST /api/auth/logout` — Cerrar sesión

### Cerebro 1 — El Intérprete
- `POST /api/interprete/mapear` — Procesa respuesta del chat y actualiza patrimonio

### Cerebro 2 — El Anticipador  
- `GET /api/anticipador/plan` — Plan de trámites personalizado
- `GET /api/anticipador/alertas` — Alertas proactivas (e.firma, testamento viejo)

### Cerebro 3 — El Coordinador
- `POST /api/coordinador/asignar-notario` — Asigna notario según estado y bienes
- `GET /api/coordinador/servicios` — Marketplace de funerarias y servicios

### Cerebro 4 — El Guardián
- `GET /api/guardian/boveda` — Bóveda con contexto por documento
- `POST /api/guardian/boveda` — Agregar documento con contexto
- `GET /api/guardian/alertas` — Alertas activas

### Cerebro 5 — El Acompañante
- `POST /api/heredero/activar` — Activa modo heredero
- `GET /api/heredero/plan` — Plan post-muerte priorizado
- `PATCH /api/heredero/tramite/:id` — Actualizar estado de trámite

### Recursos principales
- `GET/POST /api/bienes` — Patrimonio
- `GET/POST /api/beneficiarios` — Herederos
- `GET /api/dashboard` — Dashboard del usuario
- `POST /api/testamento` — Generar borrador

## Roadmap de integraciones

- [ ] **Mifiel** — Firma electrónica avanzada (e.firma SAT)
- [ ] **Verificamex** — Validación CURP + acta de defunción
- [ ] **SAT** — Verificación vigencia e.firma  
- [ ] **Open Banking CNBV** — Cuando esté disponible
- [ ] **Notarías CDMX** — Agenda digital vía Colegio de Notarios

## Principio de diseño — El lenguaje

La plataforma NUNCA usa lenguaje legal. Siempre traduce:

| ❌ Nunca | ✅ Siempre |
|---------|----------|
| "Proceso sucesorio intestamentario" | "Lo que hay que hacer para que los bienes sean tuyos" |
| "Juicio de jurisdicción voluntaria" | "El trámite ante el juez" |
| "Declaratoria de herederos ab intestato" | "El papel que dice que eres el heredero" |
