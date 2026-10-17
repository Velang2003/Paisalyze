import Header from "./Header";
import FilterContainer from "./FilterContainer";
import highlights from "../utils/highlights";
function Transactions() {
  const transactionTable = highlights();
  // console.log(transactionTable.filteredTransactions)
 

  const tableData = transactionTable.filteredTransactions.map(
    (value, index) => (
      <tr key={index}>
        <td>{value.date}</td>
        <td>{value.category}</td>
        <td>{value.amount}</td>
      </tr>
    )
  );  
  return (
    <>
      <Header />
      <FilterContainer />
      <div className="tableData" style={{ height: "70vh", 
    overflow: "auto" }}>
      <h3 style={{position:"sticky"}}>Transactions</h3>
        <table>
          <thead style={{ position: "sticky", top: 0, background: "#fff" }}>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    </>
  );
}

export default Transactions