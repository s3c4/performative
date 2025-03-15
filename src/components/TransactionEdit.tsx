'use client';

import { useEffect, useState } from "react";
import { Transaction } from "../type/transaction.type";
import { TransactionsApi } from "../api/transactions.api";

export default function TransactionEdit() {

    const [transaction, setTransaction] = useState<Transaction>(null);

    useEffect(() => {
        const transactionId = window?.location.pathname.split('/').slice(-1)[0];
        TransactionsApi.getTransaction(transactionId).then((res) => {
            setTransaction(res);
        });
    }, []);

    const editTransaction = (e) => {
        e.preventDefault();

        const newTransaction = {
            id: transaction.id,
            portfolio_id: transaction.portfolio_id,
            instrument_id: transaction.instrument_id,
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

        // const formData = new FormData();
        // formData.append('id', transaction.id);
        // formData.append('portfolio_id', transaction.portfolio_id + '');
        // formData.append('instrument_id', transaction.instrument_id + '');
        // formData.append('status', e.target.status.value);
        // formData.append('comments', e.target.comments.value);
        // formData.append('quantity', e.target.quantity.value);
        // formData.append('price', e.target.price.value);
        // formData.append('transaction_costs', e.target.transaction_costs.value);
        // formData.append('trade_date', e.target.trade_date.value);
        // formData.append('fx_rate', e.target.fx_rate.value);
        // formData.append('settlement_date', e.target.settlement_date.value);
        // formData.append('transaction_type', e.target.transaction_type.value);
        // formData.append('sale_method', e.target.sale_method.value);

        //TODO: I am not sure what type is required. JSON or JSON stringify or FormData ???
        TransactionsApi.putTransaction(JSON.stringify(newTransaction)).then((res) => {
            console.log('res: ', res);
        });

    }

    return (
        <section className="container mx-auto">
            <h4 className="text-center text-3xl">Edit transaction</h4>
            <form onSubmit={editTransaction} className="w-full md:w-[50%] mx-auto my-4 border-1 p-4 rounded-lg">
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="status">Status</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="status" placeholder="Status" defaultValue={transaction?.status} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="comments">Comments</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="comments" placeholder="Comments" defaultValue={transaction?.comments} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="quantity">Quantity</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="quantity" placeholder="Quantity" defaultValue={transaction?.quantity} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="price">Price</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="price" placeholder="Price" defaultValue={transaction?.price} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="transaction_costs">Transaction Costs</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="transaction_costs" placeholder="Transaction Costs" defaultValue={transaction?.transaction_costs} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="trade_date">Trade Date</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="trade_date" placeholder="Trade Date" defaultValue={transaction?.trade_date as string} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="fx_rate">FX Rate</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="fx_rate" placeholder="FX Rate" defaultValue={transaction?.fx_rate} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="settlement_date">Settlement Date</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="settlement_date" placeholder="Settlement Date" defaultValue={transaction?.settlement_date as string} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="transaction_type">Transaction Type</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="transaction_type" placeholder="Transaction Type" defaultValue={transaction?.transaction_type} />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label className="text-md" htmlFor="sale_method">Sale Method</label>
                    <input className="border-1 rounded-sm p-1 text-sm" type="text" id="sale_method" placeholder="Transaction Type" defaultValue={transaction?.sale_method} />
                </div>
                <button className="w-full bg-blue-500 text-white cursor-pointer rounded-xl py-2" type="submit">Save</button>
            </form>
        </section>
    )
}