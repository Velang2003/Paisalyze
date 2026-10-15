
export default function filterTransactions(transactions, filters) {
    return transactions.filter(transaction => {
        const date = transaction.date;
        const category = transaction.category;
        // const method = transaction.method;
        // const description = transaction.description ?? "";

        const matchesStartDate =
            !filters.startDate || date >= filters.startDate;

        const matchesEndDate =
            !filters.endDate || date <= filters.endDate;

        const matchesCategory =
            filters.category === "all" ||
            category === filters.category;

        // const matchesMethod =
        //     filters.method === "all" ||
        //     method === filters.method;

        // const matchesSearch =
        //     description.toLowerCase().includes(
        //         filters.search.trim().toLowerCase()
        //     );

        return (
            matchesStartDate &&
            matchesEndDate &&
            matchesCategory
            // matchesMethod &&
            // matchesSearch
        );
    });
}
