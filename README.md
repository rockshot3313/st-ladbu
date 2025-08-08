## Laravel + React Starter Kit

Opinionated starter kit for Laravel 12 + Inertia React 19 + Tailwind CSS 4.

### Features
- Authentication scaffolding (login, register, reset password, email verification)
- Settings pages (profile, password, appearance)
- Inertia SSR-ready build scripts
- Vite + React + TypeScript + ESLint + Prettier

### Requirements
- PHP >= 8.2
- Node >= 20
- Composer, npm

### Quick start
1. Copy `.env.example` to `.env` and update values.
2. Install dependencies:
   - `composer install`
   - `npm install`
3. Generate app key & run migrations:
   - `php artisan key:generate`
   - `php artisan migrate`
4. Start dev:
   - `composer run dev`

### Testing
```bash
composer test
```

### Building assets
```bash
npm run build
```

### License
This project is open-sourced under the MIT license.


