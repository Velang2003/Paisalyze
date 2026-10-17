import filterTransactions from "../utils/filterTransactions";
import { useContext, useEffect } from "react";
import { Provider } from "../context/DataProvider";

function FilterContainer() {
  const { state, dispatch } = useContext(Provider);

  function handleFilters(event){
    
    const {name, value }= event.target;
    
    dispatch({
      type: "SET_FILTER",
      payload: {
        [name]: value,
      },
    });
  }

//   useEffect(()=>console.log(state.filters), [state.filters])

  const categories = [
    ...new Set(state.transactions.map((field) => field.category)),
  ];
//   console.log(categories);

  return (
    <>
    <section className="filterContainer">

      <label>
        Date Range
        <input
          type="date"
          name="startDate"
          id="startDate"
          onChange={handleFilters}
        />
        <input
          type="date"
          name="endDate"
          id="endDate"
          onChange={handleFilters}
        />
      </label>

      <label>
        Category
        <select name="category" onChange={handleFilters}>
          <option value="all">All</option>
          {categories.map((item, key) => {
            return (
              <option key={key} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </label>

          <div>

      <button
        onClick={()=>dispatch({type: "RESET_FILTER"})}
        >Reset Filters</button>
        </div>
    </section>
    </>
  );
}

export default FilterContainer;
