'use client';
import { TransactionsApi } from "../api/transactions.api";

export default function TransactionCreate() {

    const editTransaction = (e) => {
        e.preventDefault();

        const newTransaction = {
            portfolio_id: e.target.portfolio_id.value,
            instrument_id: e.target.instrument_id.value,
            status: e.target.status.value,
            comments: e.target.comments.value,
            quantity: e.target.quantity.value,
            price: e.target.price.value,
            transaction_costs: e.target.transaction_costs.value,
            trade_date: e.target.trade_date.value,
            fx_rate: e.target.fx_rate.value,
            settlement_date: e.target.settlement_date.value,
            transaction_type: e.target.transaction_type.value,
            sale_method: e.target.sale_method.value,
        };

        //TODO: I am not sure what type is required. JSON or JSON stringify or FormData ???
        TransactionsApi.postTransaction(JSON.stringify(newTransaction)).then((res) => {
            console.log('res: ', res);
        });

    }

    return (
        <section className="container mx-auto">
            <h4 className="text-center text-3xl">Create New Transaction</h4>
            <form onSubmit={editTransaction} className="w-full md:w-[50%] mx-auto my-4 border-1 p-4 rounded-lg">
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="portfolio_id">Portfolio Id</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="portfolio_id" placeholder="Portfolio Id" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="instrument_id">Instrument Id</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="instrument_id" placeholder="Instrument Id" />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="status">Status</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="status" placeholder="Status" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="comments">Comments</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="comments" placeholder="Comments" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="quantity">Quantity</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="quantity" placeholder="Quantity" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="price">Price</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="price" placeholder="Price" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="transaction_costs">Transaction Costs</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="transaction_costs" placeholder="Transaction Costs" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="trade_date">Trade Date</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="trade_date" placeholder="Trade Date" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="fx_rate">FX Rate</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="fx_rate" placeholder="FX Rate" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="settlement_date">Settlement Date</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="settlement_date" placeholder="Settlement Date" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="transaction_type">Transaction Type</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="transaction_type" placeholder="Transaction Type" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="sale_method">Sale Method</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="sale_method" placeholder="Transaction Type" />
                </div>
                <button className="w-full bg-blue-500 text-white cursor-pointer rounded-xl py-2" type="submit">Save</button>
            </form>
        </section>
    )
}