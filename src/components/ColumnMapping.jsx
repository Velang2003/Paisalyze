import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Provider } from "../context/DataProvider";

function ColumnMapping() {

    const {state, dispatch} = useContext(Provider);
    const navigate = useNavigate();

    const {rawHeaders, rawRows} = state;

    const [mapping, setMapping] = useState({
        date: "",
        amount: "",
        category: "",
        description: ""
    });

    function updateMapping(field, column){
        setMapping(prev => ({
            ...prev,
            [field] : column
        }));
    }

    function handleContinue(){
        const requiredFields = ["date", "amount", "category"];

        const missingFields = requiredFields.filter(field => !mapping[field]);
        if(missingFields.length > 0){
            alert(`Please map ${missingFields.join(", ")}`);
            return;
        }

        // save mapping
        dispatch({
            type: "SET_COLUMN_MAPPING",
            payload: mapping
        });

        //  Process rows
        const transactions = [];
        let skippedRows = 0;

        for(const row of rawRows){
            const date = String(row[mapping.date] ?? "").trim();
            const amountText = String(row[mapping.amount] ?? "").trim();
            const category = String(row[mapping.category] ?? "").trim();
            const description = mapping.description ? String(row[mapping.description] ?? "").trim() : "";
            const amount = Number(amountText.replace(/,/g, ""));

            // validate individual row
            if(!date || Number.isNaN(Date.parse(date)) || !amountText || !Number.isFinite(amount) || !category){
                skippedRows++;
                continue;
            }

            transactions.push({
                date, amount, category, description
            });

            if(transactions.length === 0){
                alert("No Valid Transactions found. Check your column mapping and CSV values.");
                return;
            }

            dispatch({
                type: "SET_PROCESSED_DATA",
                payload: {
                    transactions, skippedRows
                }
            });
            navigate("/dashboard");
        }

        if(!rawHeaders.length || !rawRows.length){
            return(<p>Please Upload a CSV file first.</p>)
        }
    }

    const fields = [
        {key: "date", label: "Date", required: true},
        {key: "amount", label: "Amount", required: true},
        {key: "category", label: "Category", required: true},
        {key: "desccription", label: "Description", required: false},
    ];

  return (<>
    <section>
        <h2>Map your CSV columns</h2>

        {
            fields.map(field => (
                <div key={field.key}>
                    <label>
                        {field.label}{field.required ? " *": " (optional)"}
                    </label>

                    <select value={mapping[field.key]} onChange={event=> updateMapping(field.key, event.target.value)}>

                        <option value="">Select a column</option>
                        {rawHeaders.map(header => (
                            <option key={header} value={header}>{header}</option>
                        ))}

                    </select>

                </div>
            ))
        }

        <button onClick={handleContinue}>Validate and Continue</button>
    </section>
  </>);
}

export default ColumnMapping;
