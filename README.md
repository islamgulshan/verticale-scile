# Vertical Slice Challenge

## Run Instructions

```bash
docker compose up -d db
cd backend
npm install
env-cmd -f .env.dev npm run start:dev
cd ../frontend
npm install
npm run dev
```
