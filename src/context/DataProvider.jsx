import { createContext, useEffect, useReducer } from "react"

export const Provider = createContext(null);

const initialState = {
    status: "idle",

    rawHeaders: [],
    rawRows: [],

    columnMapping:{
        date: null,
        amount: null,
        category: null,
        description: null
    },
    transactions: [],

    error: null,
    skippedRows: [],

    filters: {
        startDate: "",
        endDate: "",
        category: "all",
        // method: "all",
        // search: ""
    }
};

function reducer(state, action){
    switch(action.type){
        case "NEW_DATA_UPLOADED":
            return {
              ...state,
              status: "mapping",
              rawHeaders: action.payload.headers,
              rawRows: action.payload.rows,
              columnMapping: {
                date: null,
                amount: null,
                category: null,
                description: null,
              },
              transactions: [],
              error: null,
              skippedRows: [],
            };

        case "SET_RAW_DATA":
            return {
                ...state,
                rawHeaders: action.payload.headers,
                rawRows: action.payload.rows,
                status: "mapping",
                error: null
            };
        
        case "SET_COLUMN_MAPPING":
            return {
                ...state,
                columnMapping: action.payload,
                error: null
            };

        case "SET_PROCESSED_DATA":
            return{
                ...state,
                status: "ready",
                transactions: action.payload.transactions,
                skippedRows: action.payload.skippedRows,
                error: null
            };

        case "SET_FILTER":
            return{
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                },
            };

        case "RESET_FILTER":
            return {
              ...state,
              filters: {
                startDate: "",
                endDate: "",
                category: "all",
                // method: "all",
                // search: "",
              },
            };

        case "SET_ERROR":
            return {
                ...state,
                status: "error",
                error: action.payload
            };

        default:
            return state;
    }
}

function DataProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState, ()=>{
        try{
            const saved = localStorage.getItem("paisalyze_transactions");
            if(saved){
                const parsed = JSON.parse(saved);
                return{
                    ...initialState,
                    transactions: parsed.transactions ?? [],
                    status: parsed.transactions?.length > 0 ? "ready" : "idle"
                };
            }
        }catch{
            
        }
        return initialState;
    });

    useEffect(()=>{
        try{
            if(state.transactions.length > 0){
                localStorage.setItem(
                  "paisalyze_transactions",
                  JSON.stringify({ transactions: state?.transactions })
                );
            }else{
                localStorage.removeItem("paisalyze_transactions");
            }
        }catch{
           
        }
    }, [state.transactions]);


  return (
        <Provider value={{state, dispatch}}>
            {children}
        </Provider>
  )
}

export default DataProvider;