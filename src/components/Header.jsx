import { NavLink } from "react-router-dom";
import logoPrimary from "../assets/logoPrimary.png";
function Header() {
  return (
    <>
      <header>
        <img src={logoPrimary} alt="Primary Logo" style={{ width: "200px" }} />
        <nav>
          <NavLink to={"/dashboard"}>
            <p>Dashboard</p>
          </NavLink>
          <NavLink to={"/transactions"}>
            <p>Transactions</p>
          </NavLink>
          <NavLink to={"/budget"}>
            <p>Budget</p>
          </NavLink>
        </nav>
        <NavLink to={"/"}>
          <button>Upload New CSV</button>
        </NavLink>
      </header>
    </>
  );
}

export default Header;
