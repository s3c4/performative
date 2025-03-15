import TransactionBarChart from "../components/TransactionBarChart";
import TransactionsTable from "../components/TransactionsTable";

export default function Page() {
    return (
        <>
            <TransactionBarChart />
            <br /><br />
            <TransactionsTable />
        </>
    )
}