import { useContext } from "react";
import { Provider } from "../context/DataProvider";

function Dashboard() {
    const {state} = useContext(Provider);
    const transactions = state.transactions;
    const total = transactions.reduce((total, transaction) => total+transaction.amount, 0);
    console.log("Total amount: ", total.toFixed(2)); 
  return (<>
        <h1>Dashboard</h1>
        <p>Total Transactions: {transactions.length}</p>
        <p>Total amount: {total.toFixed(2)}</p>
  </>);
}

export default Dashboard