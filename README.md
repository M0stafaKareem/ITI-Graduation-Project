
# Angular-Laravel Project

This project is a full-stack web application using **Angular** for the frontend and **Laravel** for the backend. It is structured into two main folders:
- `frontend` - containing the Angular application
- `backend` - containing the Laravel application

## Table of Contents
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Frontend (Angular)](#frontend-angular)
- [Backend (Laravel)](#backend-laravel)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites:
Make sure you have the following installed:
- Node.js (https://nodejs.org/)
- Composer (https://getcomposer.org/)
- PHP (>=7.3)
- MySQL or PostgreSQL

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install backend dependencies (Laravel):
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. Install frontend dependencies (Angular):
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure the environment:
   - Update your `.env` file in the `backend` folder with the correct database credentials and other configurations.
   - Adjust `frontend/src/environments/environment.ts` for API endpoints if necessary.

5. Run the applications:

   - Backend (Laravel):
     ```bash
     cd backend
     php artisan serve
     ```

   - Frontend (Angular):
     ```bash
     cd ../frontend
     ng serve
     ```

   The Angular app should be accessible at `http://localhost:4200` and the Laravel API at `http://localhost:8000`.

## Folder Structure
```
/your-repo
├── /frontend   # Angular application
│   ├── /src
│   ├── /dist
│   └── /node_modules
├── /backend    # Laravel application
│   ├── /app
│   ├── /config
│   ├── /public
│   ├── /routes
│   └── /vendor
├── .gitignore
└── README.md
```

## Frontend (Angular)
The Angular frontend is responsible for rendering the user interface and making API calls to the Laravel backend. It follows the standard Angular project structure.

### Commands:
- **Development server**: `ng serve`
- **Build**: `ng build`
- **Running tests**: `ng test`

## Backend (Laravel)
The Laravel backend serves as the API for the application. It handles data storage, business logic, and authentication.

### Commands:
- **Run development server**: `php artisan serve`
- **Run database migrations**: `php artisan migrate`
- **Run tests**: `php artisan test`

## Environment Variables
Ensure the following environment variables are set in the `backend/.env` file:

```plaintext
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

For Angular, the environment variables are managed in `frontend/src/environments/environment.ts`.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README` provides clear guidance on setting up and running the project, along with an organized folder structure, commands, and environment variable configuration.
