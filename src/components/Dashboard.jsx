
import Header from "./Header";
import FilterContainer from "./FilterContainer";
import Highlights from "./Highlights.jsx";
import highlights from "../utils/highlights.js";

function Dashboard() {
  
    // highlights utility function returns total spent, average spent, category rank and no. of transactions from the source of truth or filters
  const highlightsProps = highlights();
  return (
    <>
      <Header />
      <FilterContainer />
        <Highlights {...highlightsProps}/>
     

      {/* <p>Total Transactions: {transactions.length}</p>
        <p>Total amount: {total.toFixed(2)}</p> */}
    </>
  );
}

export default Dashboard;
