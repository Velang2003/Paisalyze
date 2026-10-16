import { useContext, useState, useMemo } from "react";
import { Provider } from "../context/DataProvider";
import calculateBudget from "../utils/budget.js";

function Budget() {
  const { state } = useContext(Provider);

  // Replace this with your saved budget state when implemented.
  const savedBudgets = {};

  const budgetData = useMemo(
    () => calculateBudget(state.transactions, savedBudgets),
    [state.transactions]
  );

  // Default to the latest available month.
  const [selectedMonth, setSelectedMonth] = useState("");

  const currentMonth =
    selectedMonth || budgetData[budgetData.length - 1]?.month || "";

  const selectedBudget = budgetData.find((item) => item.month === currentMonth);

  return (
    <div>
      <label htmlFor="budget-month">Select month: </label>

      <select
        id="budget-month"
        value={currentMonth}
        onChange={(event) => setSelectedMonth(event.target.value)}
      >
        {budgetData.map((item) => (
          <option key={item.month} value={item.month}>
            {new Date(`${item.month}-15T12:00:00`).toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </option>
        ))}
      </select>

      {selectedBudget ? (
        <section>
          <h2>{selectedBudget.month}</h2>

          <p>Total budget: ₹{selectedBudget.totalBudget}</p>
          <p>Total spent: ₹{selectedBudget.totalSpent}</p>
          <p>Total allocated: ₹{selectedBudget.totalAllocated}</p>
          <p>Unallocated: ₹{selectedBudget.unallocated}</p>

          <h3>Budget by category</h3>

          {selectedBudget.categories.map((category) => (
            <div key={category.name}>
              <h4>{category.name}</h4>
              <p>Budget: ₹{category.budget}</p>
              <p>Spent: ₹{category.spent}</p>
              <p>Remaining: ₹{category.remaining}</p>
              <p>Budget used: {category.percentageUsed}%</p>
              <p>Status: {category.status}</p>
            </div>
          ))}
        </section>
      ) : (
        <p>
          No budget data available for this month. Import transactions or create
          a budget to get started.
        </p>
      )}
    </div>
  );
}

export default Budget;
