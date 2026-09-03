# Recipe Roulette

Веб-приложение, которое помогает выбрать случайный рецепт. Можно фильтровать рецепты по кухне и времени, сохранять в избранное и добавлять ингредиенты в список покупок.

## Что делает проект

- Показывает список рецептов
- Показывает случайный рецепт
- Фильтры: кухня, максимальное время приготовления
- Можно сохранить рецепт в избранное
- Можно добавить ингредиенты в список покупок и удалить их

## Технологии

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express
- **База данных:** PostgreSQL, pg
- **Тесты:** Jest
- **Качество кода:** ESLint, Prettier

## Как запустить проект

### 1. Клонировать репозиторий

```bash
git clone https://github.com/TashaStav/Recipe_Roulette.git
cd Recipe_Roulette
```

### 2. Установить зависимости

Frontend:

```bash
npm install
```

Backend:

```bash
cd server
npm install
cd ..
```

### 3. Настроить базу данных

Создать базу данных PostgreSQL:

```sql
CREATE DATABASE recipe_roulette;
```

Создать таблицу `recipes`:

```sql
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  ingredients TEXT[],
  instructions TEXT[],
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER,
  difficulty VARCHAR(50),
  cuisine VARCHAR(100),
  image TEXT,
  tags TEXT[],
  meal_type TEXT[]
);
```

Создать таблицу `shopping_items`:

```sql
CREATE TABLE shopping_items (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  ingredient TEXT NOT NULL
);
```

Создать файл `.env` в папке `server` на основе `.env.example`.

В `.env` указать данные для подключения к PostgreSQL:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=recipe_roulette
DB_PASSWORD=your_password
DB_PORT=5432
```

После создания таблиц импортировать рецепты:

```bash
cd server
npm run import
cd ..
```

### 4. Запустить проект

Backend запускается в одном терминале:

```bash
cd server
npm run dev
```

Backend работает на:

```text
http://localhost:3000
```

Frontend запускается в другом терминале:

```bash
npm run dev -- -p 3001
```

Frontend работает на:

```text
http://localhost:3001
```

### 5. Production-сборка

```bash
npm run build
npm run start
```

## Проверка качества кода

ESLint:

```bash
npm run lint
```

Prettier:

```bash
npm run format
```

Проверка форматирования:

```bash
npm run format:check
```

## Тесты

Тесты backend находятся в папке `server`.

```bash
cd server
npm test
```

Тесты проверяют работу сервисов рецептов и списка покупок.

## API

Основные endpoints:

- `GET /api/recipes` — список рецептов
- `GET /api/recipes/random` — случайный рецепт
- `GET /api/recipes/:id` — рецепт по ID
- `GET /api/shopping-items` — список покупок
- `POST /api/shopping-items` — добавить ингредиент
- `DELETE /api/shopping-items/:id` — удалить ингредиент
