# Pastebin Lite

Pastebin Lite is a simple full-stack web application inspired by Pastebin.  
It allows users to create a text paste, generate a shareable link, and view the paste until it expires or reaches a view limit.

This project is built as part of a take-home assignment and is designed to be compatible with automated backend testing.

---

## ✨ Features

- Create a text paste
- Generate a shareable URL
- View paste via browser or API
- Optional time-based expiry (TTL)
- Optional maximum view limit
- Paste becomes unavailable once constraints are met
- Safe rendering (no script execution)
- Health check endpoint for monitoring

---

## 🛠 Tech Stack

- **Frontend & Backend**: Next.js (App Router)
- **Persistence**: Upstash Redis
- **Deployment**: Vercel

---

## 📁 Project Structure
```
app/
├── api/
│ ├── healthz/
│ └── pastes/
├── p/[id]/ # Paste view page
└── page.js # Home UI
lib/
├── redis.js # Redis client
└── time.js # Deterministic time logic

```
---

## 🚀 Running Locally

### 1. Install dependencies
```bash
npm install
```
### 2. Create .env
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```
### 3. Start the dev server
```
npm run dev
```
Open:
👉 http://localhost:3000

## 🌐 Deployed Application

The application is deployed and publicly accessible at:

👉 Deployed Link:
https://pastebin-lite-amber.vercel.app

This live version allows users to create and view pastes without running the project locally.

## 🚀 How to Use the Application (for Users)

- Open the deployed link in any browser.

- Paste or type text into the text area on the home page.

- Click “Create Paste”.

- A unique link will be generated for the paste.

- Share the generated link with others.

- Opening the link displays the pasted content directly in the browser.

- The paste link is publicly accessible and does not require login.

## 🧪 Example Usage

- User enters text:
"Hello, this is my paste"

- Application generates a link like:
https://pastebin-lite-amber.vercel.app/p/ABC123

- Anyone with the link can view the pasted content.

## 🗄 Persistence Layer

- The application uses Upstash Redis for persistence.
- This ensures data survives across serverless requests and works correctly on Vercel.

## 📦 Deployment

- The application is deployed on Vercel using GitHub integration.

- Environment variables are securely configured in the Vercel dashboard and are not committed to the repository.

## ✅ Notes

- No secrets are committed to GitHub

- No in-memory-only storage is used

- Backend logic is serverless-safe

- UI is intentionally simple; backend correctness is prioritized
