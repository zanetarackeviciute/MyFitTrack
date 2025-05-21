# BetterDaily 🏃‍♂️💪

BetterDaily is a full-stack fitness-tracking web application that helps users plan workouts, track runs, log body measurements, set goals, and monitor daily calorie intake – all in one place.

---

## ✨ Core Features
| Category | Planned functionality |
|----------|-----------------------|
| **Authentication** | Email + password login, JWT sessions, optional OAuth (Google) |
| **Workout tracking** | CRUD workouts & exercises, progress graphs |
| **Running tracker** | GPS run logging, pace & distance statistics |
| **Goals** | Create & update personal goals, streaks, reminders |
| **Body metrics** | Weight, body-fat %, circumference logs |
| **Nutrition** | Calorie & macro calculator |
| **Responsive UI** | Mobile-first layout with Bootstrap 5 |

---

## 🛠 Tech Stack

| Layer | Main tools |
|-------|------------|
| **Frontend** | React 18 (via Vite), Bootstrap 5, Sass |
| **Backend** | Node.js, Express|
| **Auth** | JSON Web Tokens, bcrypt |
| **Dev Ops** | GitHub Actions CI, Docker (dev db), Vercel / Railway deploy |

---

## 🚀 Quick Start

```bash
# 1. Clone repo
git clone https://github.com/zanetarackeviciute/betterdaily.git
cd betterdaily

# 2. Install client dependencies
cd frontend
npm install           # or pnpm / yarn

# 3. Start dev server (hot reload on http://localhost:5173)
npm run dev

# 4. Environment variables  
cp .env   # add/adjust values if needed


# 5. Enjoy the app 🎉
