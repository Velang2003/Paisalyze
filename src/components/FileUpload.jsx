// Demo data
import Transactions from "./Transactions.csv?url";
import Papa from "papaparse";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Conext
import { Provider } from "../context/DataProvider";

function FileUpload() {

    const { state, dispatch } = useContext(Provider);
    const navigate = useNavigate();

    // checks if the .csv file present to parse else return
   function handleData(event){
    const file = event.target.files[0];

    if(!file) return;

    parseCSV(file);
   }

//    Trigger to use Demo .csv file
   function handleDemo(){
        parseCSV(Transactions, true);
   }

//    Parse the .csv file to array of objects
   function parseCSV(file, isURL=false){
        Papa.parse(file, {
            download: isURL,
            header: true,
            skipEmptyLines: true,
            complete: (result)=> {
                const headers = result.meta.fields ?? [];
                const rows = result.data;

                // Validate headers
                if(headers.length === 0){
                    dispatch({
                        type: "SET_ERROR",
                        payload: "CSV headers are missing"
                    });
                    return;
                }

                // Check blank or duplicate headers
                const normalizedHeaders = headers.map(
                    header => header.trim().toLocaleLowerCase()
                );

                if(normalizedHeaders.some(header => !header)){
                    dispatch({
                        type: "SET_ERROR",
                        payload: "CSV contains empty column name."
                    });
                    return;
                }
                if(new Set(normalizedHeaders).size !== normalizedHeaders.length){
                    dispatch({
                        type: "SET_ERROR",
                        payload: "CSV contains duplicate column names."
                    });
                    return;
                }

                // Check parsing error
                if(result.errors.length > 0){
                    dispatch({
                        type: "SET_ERROR",
                        payload: "Unable to parse the CSV correctly."
                    });
                    return;
                }

                // Check empty data
                if(rows.length===0){
                    dispatch({
                       type: "SET_ERROR",
                       payload: "CSV contains no transaction rows." 
                    });
                    return;
                }

                // Save raw data and navigate
                dispatch({
                    type: "SET_RAW_DATA",
                    payload: {headers, rows}
                });

                // routing to column mapping stage 
                navigate("/mapping");
            },
            error: (error)=>{
                dispatch({
                    type: "SET_ERROR",
                    payload: error.message
                });
            }
        });
   }

  return (
    <>
      <input
        type="file"
        name="csvFile"
        id="csvFile"
        accept=".csv"
        onChange={handleData}
      />

      <button onClick={handleDemo}>Demo CSV</button>
    </>
  );
}

export default FileUpload