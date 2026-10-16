function calculateBudget(transactions = [], savedBudgets = {}) {
  // 1. Group transaction spending by month and category.
  const monthlySpending = transactions.reduce((months, transaction) => {
    const month = transaction.date.slice(0, 7);
    const category = transaction.category;
    const amountInPaise = Math.round(Number(transaction.amount) * 100);

    if (!months[month]) {
      months[month] = {};
    }

    months[month][category] = (months[month][category] || 0) + amountInPaise;

    return months;
  }, {});

  // 2. Include months with transactions or saved budgets.
  const months = new Set([
    ...Object.keys(monthlySpending),
    ...Object.keys(savedBudgets),
  ]);

  // 3. Combine spending and saved budget data for each month.
  const budgetData = [...months].sort().map((month) => {
    const spending = monthlySpending[month] || {};

    const saved = savedBudgets[month] || {
      totalBudget: 0,
      categories: {},
    };

    // Include categories with spending OR a saved budget.
    const categoryNames = new Set([
      ...Object.keys(spending),
      ...Object.keys(saved.categories),
    ]);

    const categories = [...categoryNames].sort().map((name) => {
      const spentPaise = spending[name] || 0;
      const spent = spentPaise / 100;
      const budget = Number(saved.categories[name] || 0);

      const remaining = budget - spent;

      const percentageUsed =
        budget > 0 ? Number(((spent / budget) * 100).toFixed(2)) : 0;

      let status;

      if (budget === 0) {
        status = "no-budget";
      } else if (spent > budget) {
        status = "over-budget";
      } else if (spent === budget) {
        status = "at-limit";
      } else {
        status = "under-budget";
      }

      return {
        name,
        budget,
        spent,
        remaining,
        percentageUsed,
        status,
      };
    });

    // 4. Calculate monthly totals.
    const totalSpentPaise = Object.values(spending).reduce(
      (sum, amount) => sum + amount,
      0
    );

    const totalSpent = totalSpentPaise / 100;

    const totalAllocated = categories.reduce(
      (sum, category) => sum + category.budget,
      0
    );

    const totalBudget = Number(saved.totalBudget || 0);

    const unallocated = totalBudget - totalAllocated;

    // 5. Return the month and its calculated data.
    return {
      month,
      totalBudget,
      totalSpent,
      totalAllocated,
      unallocated,
      categories,
    };
  });

  return budgetData;
}

export default calculateBudget;
