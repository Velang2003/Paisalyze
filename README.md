# Paisalyze - Expense Tracker App
Project under developement

## Techstacks used
- React 19+
- Papaparse (CSV parse tool)
- Vite (module bundler)
- CSS
- React-Router-Dom

## Project Structure (in future)

```
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

```