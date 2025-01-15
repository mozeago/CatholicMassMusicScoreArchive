# CatholicMassMusicScoreArchive

A Laravel-powered platform with React-based SSR for Catholic music composers and liturgical enthusiasts to upload, organize, and access music scores categorized by liturgical seasons and parts of the Mass. This archive aims to enrich worship by providing a centralized resource for sacred music.

---

## Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-usernameCatholicMassMusicScoreArchive.git
   cd CatholicMassMusicScoreArchive
#### Install Backend Dependencies:

composer install
Create the `.env` file:

run `cp .env.example .env`
Generate Application Key:

php artisan key:generate
Run Database Migrations:

php artisan migrate
php artisan migrate:refresh // to clear the migration error on reference keys

Install Frontend Dependencies:

npm install
Or if you're using Yarn:

yarn install
Start Development Servers:

php artisan serve
npm run dev
Create Storage Symlink:

php artisan storage:link
Deployment
For deployment, follow the specific guide for your chosen platform (e.g., Heroku, DigitalOcean, AWS) for deploying a Laravel application with React SSR.

Contributing
Feel free to open issues or submit pull requests. Ensure your code follows the project's code style and that any new features are properly tested.
