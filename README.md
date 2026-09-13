# 🩸 Insulin Inside — India's Biggest Diabetes Platform & Local Chemist Network

> **India's biggest diabetes platform — empowering diabetes warriors with a daily management buddy while saving neighborhood pharmacy stores against corporate monopolies.**

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## 🌟 Overview

**Insulin Inside** is a full-stack digital health management platform designed specifically for India's diabetes care ecosystem. It addresses two critical national challenges:
1. **High Chronic Medication Costs & Cold-Chain Integrity**: Bringing down diabetes medication costs by 20% to 80% through transparent price comparison against standard market retail prices (MRP), while connecting patients directly with verified neighborhood chemist counters and government Pradhan Mantri Jan Aushadhi (PMBJP) Kendras.
2. **Daily Practical Diabetes Buddy**: Providing an intuitive daily logging interface for blood glucose, medication/insulin adherence schedules, smart refill prediction, Indian carbohydrate exchanges, and 1-click **Doctor-Ready Clinical Summary PDF Reports** for endocrinologist visits.

---

## 🚀 Key Modules & Capabilities

### 1. 🔍 Find My Medicine & Price Reducer Engine (`/marketplace`)
- **Transparent Price Comparison**: Side-by-side pricing comparing standard market MRPs, neighborhood chemist partner rates, and government Jan Aushadhi generic alternatives.
- **50+ Master Diabetes Items**:
  - *Basal Insulins*: Lantus SoloStar, Basaglar, Toujeo, Tresiba.
  - *Bolus Insulins*: NovoRapid, Humalog, Actrapid HM, Fiasp.
  - *Premix Insulins*: Ryzodeg 70/30, Mixtard 30 HM.
  - *Oral Medications*: Glycomet-GP 2 Forte, Metformin 500 SR, Forxiga 10mg, Jardiance, Galvus Met, Rybelsus.
  - *Monitoring & Supplies*: Accu-Chek Active 50s, FreeStyle Libre CGMs, BD Ultra-Fine pen needles, Frio cooling wallets, and emergency Glucagon rescue kits.
- **Hyderabad Pilot Network (8 Verified Chemist Partners)**:
  - Banjara Hills, Madhapur / Hitec City, Secunderabad, Ameerpet, Kukatpally, Koti Medical Market, Dilsukhnagar, and Osmania General Hospital Jan Aushadhi Kendra.
- **4-Hour Counter Hold & Prescription Upload**:
  - Mandatory prescription validation for Schedule H medications by Telangana DCA verified registered pharmacists.
  - 100% cold-chain (2°C–8°C) monitoring verification.

### 2. 🏪 Chemist Partner Portal (`/pharmacy-portal`)
- **Incoming Reservations Queue**: Real-time review with prescription preview and 1-tap "Verify & Hold Stock (4 Hours)".
- **Stock & Freshness Manager**: Instant stock availability toggle (In Stock / Low Stock / Out of Stock).
- **Hyderabad Local Demand Radar**: 5km radius real-time patient search trends alerting chemists which items to stock.
- **Telangana DCA Compliance & Cold-Chain Logging**: Form 20/21 license tracker and digital refrigerator temperature logger (2°C–8°C).

### 3. 📊 "Today Dashboard" & Daily Management (`/dashboard`)
- **Fast Vitals Logging**: FBS, PBS, Pre/Post Meal, Bedtime blood sugar with instant clinical target range feedback (70–180 mg/dL).
- **Medication & Insulin Schedule**: Adherence timeline with "Mark Taken", "Snooze 15m", and "Skip" actions.
- **Smart Refill Prediction Engine**: Predicts when insulin supplies will run low (~4 days remaining) with direct 1-tap local pharmacy reservations.
- **Doctor-Ready Clinical Summary PDF Report**: Generates an endocrinologist-ready summary including 14-day history, Time-in-Range (TIR), fasting averages, and adherence statistics.

### 4. 📚 Community, Library & Clinical Downloads (`/community`, `/library`, `/resources`)
- **Medically Reviewed Guides**: Indian carb exchanges (Roti, Rice, Dosa, Idli, Dals), summer insulin storage without refrigeration, and hypo 15-15 rules.
- **Peer Community**: Safe, moderated discussion spaces for Type 1, Type 2, and Parents.
- **Emergency Medical ID Generator**: Printable wallet card for travel and hypoglycemia emergencies.
- **Emergency Helpline Integration**: 108 (Ambulance) and 112 (National Emergency).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **UI & Styling**: [React 19](https://react.dev/), [TailwindCSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Data Visualizations**: [Recharts](https://recharts.org/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Authentication & Integrations**: NextAuth, Google Sheets API (`googleapis`)

---

## 💻 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm / yarn / pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Sreyaskomala/DMS.git
cd DMS/health-log-ai

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env.local` file in `health-log-ai/`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Running the Application
```bash
# Development server
npm run dev

# Production build & verification
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Project Structure

```
health-log-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global layout, Google Translate, headers & footers
│   │   ├── page.tsx              # Homepage with hero search & pilot showcase
│   │   ├── marketplace/          # Find My Medicine & Hyderabad Local Pharmacy Network
│   │   ├── pharmacy-portal/      # Chemist Partner Portal & Demand Radar
│   │   ├── dashboard/            # Today Dashboard & Daily Diabetes Buddy
│   │   │   └── analytics/        # Time-in-Range & Glycemic Charts
│   │   ├── library/              # Medically reviewed Indian diabetes guides
│   │   ├── community/            # Moderated peer community
│   │   ├── resources/            # Clinical logs & Emergency Medical ID card generator
│   │   ├── about/                # Mission, principles & local chemist advocacy
│   │   ├── contact/              # Support & Hyderabad chemist onboarding
│   │   └── api/                  # NextAuth & Google Sheets sync endpoints
│   ├── components/               # UI components, header, footer, charts, modal sheets
│   └── lib/
│       ├── pharmacy-data.ts      # 50+ master medicines & 8 Hyderabad partner pharmacies
│       ├── demo-data.ts          # Health logs, glucose points, and stats engine
│       ├── clinical-tools.ts     # Indian food database & bolus calculation helper
│       └── schemas.ts            # Zod validation schemas
```

---

## 🇮🇳 Pilot Market: Hyderabad, Telangana
Launch partners include independent licensed pharmacies across Banjara Hills, Madhapur, Secunderabad, Ameerpet, Kukatpally, Koti, Dilsukhnagar, and Osmania Jan Aushadhi Kendra under Telangana DCA regulatory guidelines.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
