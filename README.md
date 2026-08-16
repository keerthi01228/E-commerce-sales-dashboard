# 🛍️ E-commerce Sales Performance Dashboard


🔗 **Live Demo:** [https://vercel.com/keerthi01228s-projects/e-commerce-dashboard-deploy](https://your-vercel-url.vercel.app)

An interactive sales analytics dashboard built with React and TypeScript...

An interactive sales analytics dashboard built with React and TypeScript, 
visualizing revenue trends, product performance, and regional sales data 
through dynamic charts and KPI cards.

---

## 🚀 Features

- 📊 **KPI Overview** — Total revenue, orders, average order value, and conversion rate at a glance
- 📈 **Revenue Trends** — Monthly revenue and order volume visualized as a line chart, filterable by 3/6/12 month periods
- 🗂️ **Category Breakdown** — Sales performance across product categories
- 🌍 **Regional Performance** — Revenue distribution by geographic region
- 📣 **Marketing Channel Insights** — Revenue share by acquisition channel (organic, paid, social, email, referral)
- 🏆 **Top Products Table** — Best-selling products with units sold, revenue, and stock levels
- 📤 **CSV Export** — Download the currently filtered revenue data as a CSV file
- 🎨 **Responsive UI** — Built with Tailwind CSS and shadcn/ui components

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS + shadcn/ui (Radix primitives) |
| **Charts** | Recharts |
| **Routing** | React Router DOM |
| **Data Fetching (configured)** | TanStack React Query |
| **Backend (configured, not yet populated)** | Supabase |

---

## 📊 Current Data

The dashboard currently runs on static, hardcoded sample data 
(`src/lib/mockData.ts`) representing a full year of e-commerce sales 
activity — revenue, orders, categories, regions, marketing channels, 
and top products.

Supabase is integrated and configured (`src/integrations/supabase/`) 
as the backend for future live data, but no database tables are 
connected yet — this is a planned next step.

---

## 🗂️ Project Structure
src/
├── components/ # Reusable UI components (KPICard, ChartCard)
│ └── ui/ # shadcn/ui primitives
├── hooks/ # Custom React hooks
├── integrations/
│ └── supabase/ # Supabase client & generated types
├── lib/
│ └── mockData.ts # Static dashboard data
├── pages/
│ ├── Index.tsx # Main dashboard page
│ └── NotFound.tsx # 404 fallback
├── App.tsx # Routing setup
└── main.tsx # App entry point
---

## ⚙️ Installation & Running Locally

1. Clone this repository
```bash
   git clone https://github.com/keerthi01228/E-commerce-sales-dashboard.git
   cd E-commerce-sales-dashboard
```

2. Install dependencies
```bash
   npm install
```

3. Start the development server
```bash
   npm run dev
```

4. Open the app at `http://localhost:5173`

---

## 🔮 Future Improvements

- [ ] Connect Supabase tables for real, persisted sales data
- [ ] Derive KPI change percentages from actual historical data
- [ ] Add authentication for multi-user access via Supabase Auth
- [ ] Add unit/integration tests

---

## 📄 License

This project is open source and available for personal/educational use.
