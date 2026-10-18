// Logo
import logoPrimary from "../assets/logoPrimary.png" ;
import logoSecondary from "../assets/logoSecondary.png";

// Components
import FileUpload from "../components/FileUpload";
import ColumnMapping from "../components/ColumnMapping";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Transactions from "../components/Transactions";

//Context
import DataProvider from "../context/DataProvider";

// hooks
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Budget from "../components/Budget";

function App() {
  return (
    <>
      {/* Body content */}

      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* CSV upload Section */}
            <Route path="/" element={<FileUpload />} />

            {/* Column Mapping Section */}
            <Route path="/mapping" element={<ColumnMapping />} />

            {/* Dashboard Section */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Transaction Section */}
            <Route path="/transactions" element={<Transactions />} />

            {/* Budget Allocation Section */}
            <Route path="/budget" element={<Budget />} />

            <Route path="*" element={<FileUpload />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>

      <footer>
          <img
            src={logoSecondary}
            alt="Secondary Logo"
          />
        <div className="contactFootor">
          <a href="mailto:velang2003@gmail.com">Mail</a>
          <a href="https://github.com/Velang2003">GitHub</a>
        <p>Build with ❤️ by Ashwamedha ({new Date().getFullYear()})</p> 
        </div>
      </footer>
    </>
  );
}

export default App