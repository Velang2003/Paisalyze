import { useContext } from "react";
import { Provider } from "../context/DataProvider";
import filterTransactions from "./filterTransactions";

function highlights() {
    const { state } = useContext(Provider);
    
      //   default all transactions, else filtered source of truth
      const filteredTransactions = filterTransactions(
        state.transactions,
        state.filters
      );
    
    //   useEffect(() => console.log(filteredTransactions), [filteredTransactions]);
    
      //   Total spent
      const totalAmount =
        filteredTransactions.reduce(
          (sum, transaction) => sum + Math.round(transaction.amount * 100),
          0
        ) / 100;
    
      // extract set of months from the source of truth
      const months = new Set(
        filteredTransactions.map((transaction) => transaction.date.slice(0, 7))
      );

    
      //   start date of earliest transaction by default else from date input
      const startDate =
        state.filters.startDate ||
        state.transactions.reduce(
          (earliest, transaction) =>
            !earliest || transaction.date < earliest ? transaction.date : earliest,
          ""
        );
    
      //   end date of latest transaction by default else from date input
      const endDate =
        state.filters.endDate ||
        state.transactions.reduce(
          (latest, transaction) =>
            !latest || transaction.date > latest ? transaction.date : latest,
          ""
        );
    
      // months count from earliest to latest transaction by default else by user input
    
      let monthsCount = 0;
      if (startDate && endDate) {
        const start = new Date(`${startDate}T12:00:00`);
        const end = new Date(`${endDate}T12:00:00`);
        monthsCount =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth()) +
          1;
      }
    
      const averageMonthSpend = (
        monthsCount > 0 ? totalAmount / monthsCount : 0
      ).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    
      //   Ranking top categories
    
      const categoryTotals = filteredTransactions.reduce(
        (totals, transaction) => {
            const category = transaction.category;
    
            totals[category] =
            (totals[category] || 0) + Math.round(transaction.amount * 100);
    
            return totals;
        }, {});
      const rankedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
      const topCategory = rankedCategories[0]?.[0] ?? "N/A";
    
      const numberOfTransactions = filteredTransactions.length;
      const highlightsProps = {totalAmount, averageMonthSpend, topCategory, numberOfTransactions, categoryTotals, filteredTransactions};


  return highlightsProps;
}

export default highlights