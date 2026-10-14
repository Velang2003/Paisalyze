# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


expense-analytics-dashboard/
├── public/
│   └── sample-expenses.csv
│
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── AppProvider.jsx
│   │   └── appReducer.js
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Navigation.jsx
│   │   │
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── EmptyState.jsx
│   │       └── LoadingState.jsx
│   │
│   ├── features/
│   │   ├── import/
│   │   │   ├── components/
│   │   │   │   ├── UploadZone.jsx
│   │   │   │   ├── ColumnMapper.jsx
│   │   │   │   └── ImportReport.jsx
│   │   │   └── utils/
│   │   │       ├── parseCsv.js
│   │   │       ├── mapColumns.js
│   │   │       ├── validateExpenses.js
│   │   │       └── normalizeExpenses.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── SummaryCards.jsx
│   │   │   │   ├── MonthlyTrendChart.jsx
│   │   │   │   └── CategoryChart.jsx
│   │   │   └── utils/
│   │   │       └── calculateSummary.js
│   │   │
│   │   ├── transactions/
│   │   │   ├── components/
│   │   │   │   ├── TransactionTable.jsx
│   │   │   │   └── TransactionFilters.jsx
│   │   │   └── utils/
│   │   │       ├── filterExpenses.js
│   │   │       └── sortExpenses.js
│   │   │
│   │   ├── budget/
│   │   │   ├── components/
│   │   │   │   ├── BudgetSummary.jsx
│   │   │   │   └── BudgetAllocation.jsx
│   │   │   └── utils/
│   │   │       └── calculateBudget.js
│   │   │
│   │   └── export/
│   │       └── exportCsv.js
│   │
│   ├── hooks/
│   │   ├── useExpenses.js
│   │   └── useTheme.js
│   │
│   ├── utils/
│   │   ├── dates.js
│   │   └── formatCurrency.js
│   │
│   ├── styles/
│   │   └── index.css
│   │
│   └── main.jsx
│
├── tests/
├── index.html
├── package.json
├── vite.config.js
└── README.md