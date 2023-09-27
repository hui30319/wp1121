# Web Programming HW#1

## Run the project

If you only want to run the project, you can follow the steps below.

### 1. Install dependencies

```bash
cd frontend && yarn
cd ../backend && yarn
cd ..
```

### 2. Setup backend `.env`

Start by copying the `.env.example` file to `.env`.

```bash
cd backend
cp .env.example .env
```

`.env`
```bash
PORT=8000
MONGO_URL="mongodb+srv://<username>:<password>@<cluster>.example.mongodb.net/?retryWrites=true&w=majority"
```

### 3. Run the server

```bash
yarn start
```

### 4. Open the frontend

Open `frontend/index.html` by clicking it in your file explorer.
