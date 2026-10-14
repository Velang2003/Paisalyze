// Logo
import logoPrimary from "../assets/logoPrimary.png"
import logoSecondary from "../assets/logoSecondary.png"

// Components
import FileUpload from "../components/FileUpload";
import ColumnMapping from "../components/ColumnMapping";
import Dashboard from "../components/Dashboard";

//Context
import DataProvider from "../context/DataProvider";

// hooks
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <header>
        <img src={logoPrimary} alt="Primary Logo" style={{ width: "200px" }} />
      </header>

      {/* Body content */}

      <DataProvider>
        <BrowserRouter>
            <Routes>
                    {/* CSV upload Section */}
                    <Route path="/" element={<FileUpload />} />
                    
                    {/* Column Mapping Section */}
                    <Route path="/mapping" element={<ColumnMapping/>}/>
                    
                    {/* Dashboard Section */}
                    <Route path="/Dashboard" element={<Dashboard/>}/>

                    
                    {/* Transaction Section */}
                    <Route />
                    
                    {/* Budget Allocation Section */}
                    <Route />
                    
                    <Route path="*" element={<FileUpload/>}/>
            </Routes>
        </BrowserRouter>
      </DataProvider>




      <footer>
        <img
          src={logoSecondary}
          alt="Secondary Logo"
          style={{ width: "100px" }}
        />
      </footer>
    </>
  );
}

export default App