# Paisalyze - Expense Analytics Dashboard

A client-side expense analytics application built with React. Users upload a CSV file containing their transaction history, map the columns to the expected fields, and immediately get an interactive dashboard with spending summaries, charts, a filterable transaction table, and a per-category budget breakdown — all without any backend or data leaving the browser.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [CSV Format](#csv-format)
- [Application Flow](#application-flow)
- [State Management](#state-management)
- [Known Limitations](#known-limitations)

---

## Features

- **CSV Import** — Upload any transaction CSV file. The app validates headers, checks for duplicates or blanks, and normalizes date formats (`dd-mm-yyyy`, `yyyy-mm-dd`, and `/` or `.` separators are all accepted).
- **Column Mapping** — After upload, map your CSV's column names to the required fields (Date, Amount, Category) and an optional Description field.
- **Dashboard** — Displays four summary cards (total spent, average monthly spend, top category, transaction count) alongside a monthly line chart and a category-breakdown donut chart.
- **Filterable Transactions** — Browse the full transaction table filtered by date range and category. Filters are applied globally and shared with the dashboard view.
- **Budget Analysis** — View actual spending per category, per month, compared against configurable budget targets. Each category shows amount spent, remaining budget, percentage used, and an over/under/at-limit status.
- **Demo Mode** — A sample CSV is bundled with the app so you can explore every feature without uploading your own data.
- **Responsive Layout** — The interface adapts to mobile, tablet, and desktop screen sizes.

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 19+ | UI rendering and component model |
| React Router DOM | 7+ | Client-side routing between pages |
| Recharts | 3+ | Line chart and pie/donut chart |
| PapaParse | 5+ | CSV parsing and validation |
| Vite | 8+ | Development server and production bundler |
| CSS (plain) | — | Styling and responsive layout |

---

## Project Structure

```
expense-tracker/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── app/
│   │   └── App.jsx                  # Root component, router setup, footer
│   │
│   ├── assets/
│   │   ├── logoPrimary.png
│   │   └── logoSecondary.png
│   │
│   ├── components/
│   │   ├── FileUpload.jsx            # CSV upload and demo trigger
│   │   ├── ColumnMapping.jsx         # Column-to-field mapping UI
│   │   ├── Header.jsx                # Top navigation bar
│   │   ├── FilterContainer.jsx       # Date range and category filters
│   │   ├── Highlights.jsx            # Summary stat cards
│   │   ├── Dashboard.jsx             # Charts and overview page
│   │   ├── Transactions.jsx          # Filterable transaction table
│   │   ├── Budget.jsx                # Monthly budget breakdown
│   │   └── Transactions.csv          # Bundled demo data
│   │
│   ├── context/
│   │   └── DataProvider.jsx          # Global state via useReducer + Context
│   │
│   ├── utils/
│   │   ├── highlights.js             # Aggregates totals, averages, category ranks
│   │   ├── filterTransactions.js     # Applies date range and category filters
│   │   └── budget.js                 # Groups spending by month and category
│   │
│   ├── styles/
│   │   └── index.css                 # Global styles and responsive breakpoints
│   │
│   └── main.jsx                      # React entry point
│
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd expense-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

The compiled output is written to `dist/`. Serve it with any static file host.

```bash
# Preview the production build locally
npm run preview
```

---

## CSV Format

The application accepts any CSV file that contains at least three columns representing a date, an amount, and a category. Column names do not need to match exactly — you map them to the correct fields during the import step.

**Minimum required fields after mapping:**

| Field | Description |
|---|---|
| Date | Transaction date. Accepts `yyyy-mm-dd`, `dd-mm-yyyy`, and `/` or `.` as separators. |
| Amount | Numeric transaction amount. Commas used as thousand separators are stripped automatically. |
| Category | Expense category label (e.g., Food, Rent, Transport). |
| Description | Optional. A short note or merchant name. |

**Example CSV:**

```
date,category,amount,note
2024-01-05,Food,450,Lunch
2024-01-08,Transport,120,Metro
2024-01-15,Utilities,1800,Electricity bill
```

A sample file with 100 records is bundled in the app and can be loaded via the "Demo CSV" button on the upload screen.

---

## Application Flow

```
Upload CSV  -->  Column Mapping  -->  Dashboard  -->  Transactions / Budget
   /                /mapping            /dashboard       /transactions  /budget
```

1. **Upload (`/`)** — The user selects a `.csv` file or loads the demo. PapaParse reads and validates the file in the browser. On success, raw headers and rows are stored in global state and the app navigates to `/mapping`.

2. **Column Mapping (`/mapping`)** — The user maps their CSV's column names to Date, Amount, Category, and (optionally) Description. On confirmation, each row is validated and normalized into typed transaction objects. Invalid rows are counted as skipped. The app navigates to `/dashboard`.

3. **Dashboard (`/dashboard`)** — Displays the summary cards (`Highlights`), a monthly spending line chart, and a category donut chart, all derived from the filtered transaction set.

4. **Transactions (`/transactions`)** — A scrollable table of all transactions, filtered by the shared `FilterContainer` (date range, category).

5. **Budget (`/budget`)** — A month-by-month breakdown of spending per category. A month selector allows switching between periods. Budget targets are currently derived from actual spending (editable budget input is planned).

Filters set in `FilterContainer` affect both the Dashboard and Transactions views because filter state lives in the global context.

---

## State Management

Global state is managed with React's built-in `useReducer` hook, exposed via Context. There is no third-party state library.

**State shape:**

```js
{
  status: "idle" | "mapping" | "ready" | "error",
  rawHeaders: [],         // Column names from the uploaded CSV
  rawRows: [],            // Parsed but unmapped CSV rows
  columnMapping: {        // User-selected field assignments
    date: null,
    amount: null,
    category: null,
    description: null
  },
  transactions: [],       // Validated, normalized transaction objects
  skippedRows: [],        // Count of rows that failed validation
  error: null,            // Error message string or null
  filters: {
    startDate: "",
    endDate: "",
    category: "all"
  }
}
```

**Reducer actions:**

| Action | Effect |
|---|---|
| `SET_RAW_DATA` | Stores parsed headers and rows, sets status to `mapping` |
| `SET_COLUMN_MAPPING` | Stores the user's field assignments |
| `SET_PROCESSED_DATA` | Stores validated transactions, sets status to `ready` |
| `SET_FILTER` | Merges a partial filter update into the filters object |
| `RESET_FILTER` | Resets all filters to their defaults |
| `SET_ERROR` | Stores an error message, sets status to `error` |

---

## Known Limitations

- **No persistence** — All data is held in memory. Refreshing the page clears the uploaded data and returns the user to the upload screen.
- **Budget targets are read-only** — The budget page displays spending relative to a `savedBudgets` object that is currently empty. Budget input UI is not yet implemented.
- **INR currency only** — Amount formatting and currency display are hardcoded to the Indian Rupee (`en-IN` locale, `INR`).
- **No authentication or server** — The application is entirely client-side. No data is transmitted anywhere.
- **Filter method and search are stubbed** — Payment method and description search filters exist in the state shape and utility code but are not yet exposed in the UI.

---

## Author

Built by Ashwamedha — [velang2003@gmail.com](mailto:velang2003@gmail.com) | [GitHub](https://github.com/Velang2003)