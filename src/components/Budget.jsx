import { useContext, useState, useMemo, useEffect } from "react";
import { Provider } from "../context/DataProvider";
import calculateBudget from "../utils/budget.js";
import Header from "./Header.jsx";

function Budget() {
  const { state } = useContext(Provider);
  const [savedBudgets, setBudget] = useState([]);
  
  // const savedBudgets = {
  //   // dummy data
  //   "2026-10": {
  //     totalBudget: 50000,
  //     categories: {
  //       Bills: 5000,
  //       Education: 1000,
  //       Entertainment: 5000,
  //       Food: 5000,
  //     },
  //   },
  // };

function handleBudgetAllocation(event, categoryName, month) {
  const budget = Number(event.target.value);

  setBudget((prevData) => {
    // Get existing categories or initialize an empty object
    const existingCategories = prevData[month]?.categories || {};

    // Update the selected category
    const updatedCategories = {
      ...existingCategories,
      [categoryName]: budget,
    };

    // Calculate total budget
    const totalBudget = Object.values(updatedCategories).reduce(
      (sum, amount) => sum + amount,
      0
    );

    // Update the state
    return {
      ...prevData,
      [month]: {
        ...prevData[month],
        totalBudget,
        categories: updatedCategories,
      },
    };
  });
}


  const budgetData = useMemo(
    () => calculateBudget(state.transactions, savedBudgets),
    [state.transactions, savedBudgets]
  );

  // Default to the latest available month.
  const [selectedMonth, setSelectedMonth] = useState("");

  const currentMonth =
    selectedMonth || budgetData[budgetData.length - 1]?.month || "";

  const selectedBudget = budgetData.find((item) => item.month === currentMonth);

  return (
    <>
      <Header />
      <div className="budgetContainer">
        <label htmlFor="budget-month">Select month: </label>

        <div>
          <select
            id="budget-month"
            value={currentMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
          >
            {budgetData.map((item) => (
              <option key={item.month} value={item.month}>
                {new Date(`${item.month}-15T12:00:00`).toLocaleDateString(
                  "en-IN",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </option>
            ))}
          </select>
        </div>

        {selectedBudget ? (
          <section>
            <h2>{selectedBudget.month}</h2>
            <div className="budgetHighlights">
              <p>Total budget: ₹{selectedBudget.totalBudget}</p>
              <p>Total spent: ₹{selectedBudget.totalSpent}</p>
              <p>Total allocated: ₹{selectedBudget.totalAllocated}</p>
              <p>Unallocated: ₹{selectedBudget.unallocated}</p>
            </div>

            <h3>Budget by category</h3>

            {selectedBudget.categories.map((category) => (
              <div key={category.name} className="budgets">
                <h4>{category.name}</h4>
                <input
                  type="number"
                  value={
                    savedBudgets[selectedBudget.month]?.categories?.[
                      category.name
                    ] ?? ""
                  }
                  onChange={(event) =>
                    handleBudgetAllocation(
                      event,
                      category.name,
                      selectedBudget.month
                    )
                  }
                />
                <p>Budget: ₹{category.budget}</p>
                <p>Spent: ₹{category.spent}</p>
                <p>Remaining: ₹{category.remaining.toLocaleString("en-IN")}</p>
                <p>Budget used: {category.percentageUsed}%</p>
                <p>Status: {category.status}</p>
              </div>
            ))}

            <button className="budgetSaveBtn">Save Budget</button>
            <button className="budgetResetBtn">Reset</button>
          </section>
        ) : (
          <p>
            No budget data available for this month. Import transactions or
            create a budget to get started.
          </p>
        )}
      </div>
    </>
  );
}

export default Budget;
