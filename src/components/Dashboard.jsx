import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import Header from "./Header";
import FilterContainer from "./FilterContainer";
import Highlights from "./Highlights.jsx";
import highlights from "../utils/highlights.js";
import { NavLink } from "react-router-dom";

function Dashboard() {
  // highlights utility function returns total spent, average spent, category rank and no. of transactions from the source of truth or filters
  const highlightsProps = highlights();

  const COLORS = [
    "#3B82F6",
    "#14B8A6",
    "#F59E0B",
    "#8B5CF6",
    "#EF4444",
    "#EC4899",
    "#64748B",
  ];

  const categories = [];
  for(let key in highlightsProps.categoryTotals){
    const value = highlightsProps.categoryTotals[key];
    categories.push({
      category: key,
      amount: value
    });
  }
  
  // for Line chart to show month wise graph instead of per transaction 
  const monthsName = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

 const monthlyTotals = highlightsProps.filteredTransactions.reduce(
   (totals, transaction) => {
     const monthNumber = new Date(transaction.date).getMonth();

     const monthName = monthsName[monthNumber];
     const paise = Math.round(transaction.amount * 100)

     totals[monthName] = (totals[monthName] || 0) + paise;

     return totals;
   },
   {}
 );
 
 for (const month in monthlyTotals){
  monthlyTotals[month] = monthlyTotals[month]/100;
 }

 const monthlyData = Object.entries(monthlyTotals).map(([month, amount])=>({
  month, amount
 }))


  return (
    <>
      <Header />
      <FilterContainer />
      <Highlights {...highlightsProps} />

      <div style={{ width: "300px", height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "300px", height: "250px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              dataKey="amount"
              nameKey="category"
              outerRadius={75}
              innerRadius={40}
              cx="50%"
              cy="42%"
            >
              {categories.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${(Number(value) / 100).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}`,
                name,
              ]}
            />

            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <section className="bottomNavigation">
        <p>Want the details behind these numbers?</p>
        <NavLink to={"/transactions"}>View all transactions</NavLink>
        <NavLink to={"/budget"}>Set budgets</NavLink>
      </section>
    </>
  );
}

export default Dashboard;
