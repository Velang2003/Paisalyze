
function Highlights({
  totalAmount,
  averageMonthSpend,
  topCategory,
  numberOfTransactions,
}) {
  return (
    <section className="overviewContainer">
      <div className="highlights">
        <p className="headline">Total Spent</p>
        <h1>
          {totalAmount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </h1>
      </div>
      <div className="highlights">
        <p className="headline">Average month spend</p>
        <h1>{averageMonthSpend}</h1>
      </div>
      <div className="highlights">
        <p className="headline">Top Category</p>
        <h1>{topCategory}</h1>
      </div>
      <div className="highlights">
        <p className="headline">Total Transactions</p>
        <h1>{numberOfTransactions}</h1>
      </div>
    </section>
  );
}

export default Highlights