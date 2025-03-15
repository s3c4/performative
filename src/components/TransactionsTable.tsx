'use client';
import { useEffect, useState } from "react"
import { PageTokenStore, TransactionsStore } from "../store/transactions.store";
import { GetTransactions, mapTransaction, Transaction } from "../type/transaction.type";
import { ArrowDown, ArrowUp, Check, ChevronDown, X } from "lucide-react";
import { TransactionsApi } from "../api/transactions.api";
import Link from "next/link";

export default function TransactionsTable() {

    const [transactions, setTransactions] = useState<Transaction[]>(TransactionsStore.transactions);
    const [pageToken, setPageToken] = useState('');

    // Take care of the transactions store if there are any changes in real time
    useEffect(() => {
        // Pick the new data from the store
        const transactionEvent = () => {
            setTransactions(TransactionsStore.transactions);
        };
        // Set: event listner
        document.addEventListener('TransactionsEvent', transactionEvent);
        // Remove: the event listener
        return () => document.removeEventListener('TransactionsEvent', transactionEvent);
    }, []);

    // Take care of the pageToken store if there are any changes in real time - pagination
    useEffect(() => {
        // Pick the new data from the store
        const pageTokenEvent = () => {
            setPageToken(PageTokenStore.pageToken);
        };
        // Set: event listner
        document.addEventListener('PageTokenEvent', pageTokenEvent);
        // Remove: the event listener
        return () => document.removeEventListener('PageTokenEvent', pageTokenEvent);
    }, []);

    useEffect(() => {
        if (TransactionsStore.transactions.length === 0) {
            // Get first time the transactions
            TransactionsApi.getTransactions().then((data: GetTransactions) => {
                // Set the transaction in the store
                TransactionsStore.setTransactions(data.transactions.map(t => mapTransaction(t)));
                // Set page token in the store
                PageTokenStore.setPageToken(data.last_evaluated_key);
            });
        }
    }, []);

    // Show or hide the select list toggle of columns.
    const [listToggleColumn, setListToggleColumn] = useState(false);

    // Keep the table header
    const [columns, setColumns] = useState<{ id: string, label: string, active: boolean }[]>([
        {
            id: 'index',
            label: 'Index',
            active: true,
        },
        {
            id: 'comments',
            label: 'Comments',
            active: true,
        },
        {
            id: 'fx_rate',
            label: 'FX Rate',
            active: true,
        },
        {
            id: 'portfolio',
            label: 'Portfolio',
            active: true,
        },
        {
            id: 'price',
            label: 'Price',
            active: true,
        },
        {
            id: 'quantity',
            label: 'Quantity',
            active: true,
        },
        {
            id: 'sale_method',
            label: 'Sale Method',
            active: true,
        },
        {
            id: 'settlement_date',
            label: 'Settlement Date',
            active: true,
        },
        {
            id: 'status',
            label: 'Status',
            active: true,
        },
        {
            id: 'total_amount',
            label: 'Total Amount',
            active: true,
        },
        {
            id: 'trade_date',
            label: 'Trade Date',
            active: true,
        },
        {
            id: 'transaction_costs',
            label: 'Transaction Costs',
            active: true,
        },
        {
            id: 'transaction_type',
            label: 'Transaction Type',
            active: true,
        }
    ]);

    const toggleColumn = (id: string) => {
        // Hide the column based on hidden class
        const columnElements = document.getElementsByClassName(id);
        for (const columnElement of columnElements) {
            columnElement.classList.toggle('hidden');
        }

        // Set the new values for columns
        setColumns([
            ...columns.map(c => {
                if (c.id === id) {
                    c.active = !c.active;
                }
                return c;
            })
        ]);
        // Hide the list toggle for columns
        setListToggleColumn(false);
    };

    const showAllColumns = () => {
        // Show all columns, select by selectors
        const columnElements = document.querySelectorAll('th, td');
        for (const columnElement of columnElements) {
            columnElement.classList.remove('hidden');
        }

        // set all columns active
        setColumns([
            ...columns.map(c => {
                return {
                    ...c,
                    active: true
                }
            })
        ]);
        // Hide the list toggle for columns
        setListToggleColumn(false);
    }

    // Sort columns
    // First argument is the key of the column
    // Second argument it can have 3 values: n - normal, a - ascendent, d - descendent
    const [sortColumn, setSortColumn] = useState(['index', 'n']);

    const sortColumnOnClick = (id: string) => {
        if (typeof transactions[0][id] === 'string') {
            sortString(id);
        } else if (['number', 'object'].includes(typeof transactions[0][id])) { // Number or Date
            sortNumbersAndDates(id);
        }
    };

    const sortString = (id: string) => {
        if (id === sortColumn[0]) {
            if (sortColumn[1] === 'n') {
                // sort asc per id
                setTransactions([
                    ...transactions.toSorted((a, b) => b[id].localeCompare(a[id], undefined, { sensitivity: 'base' }))
                ]);
                setSortColumn([id, 'a']);
            } else if (sortColumn[1] === 'a') {
                setTransactions([
                    ...transactions.toSorted((a, b) => a[id].localeCompare(b[id], undefined, { sensitivity: 'base' }))
                ]);
                // sort desc per id
                setSortColumn([id, 'd']);
            } else if (sortColumn[1] === 'd') {
                // set initial transactions from store
                setTransactions(TransactionsStore.transactions);
                setSortColumn([id, 'n']);
            }
        } else {
            // sort asc per id
            setTransactions([
                ...transactions.toSorted((a, b) => b[id].localeCompare(a[id], undefined, { sensitivity: 'base' }))
            ]);
            setSortColumn([id, 'a']);
        }
    }

    const sortNumbersAndDates = (id: string) => {
        if (id === sortColumn[0]) {
            if (sortColumn[1] === 'n') {
                // sort asc per id
                setTransactions([
                    ...transactions.toSorted((a, b) => b[id] - a[id])
                ]);
                setSortColumn([id, 'a']);
            } else if (sortColumn[1] === 'a') {
                setTransactions([
                    ...transactions.toSorted((a, b) => a[id] - b[id])
                ]);
                // sort desc per id
                setSortColumn([id, 'd']);
            } else if (sortColumn[1] === 'd') {
                // set initial transactions from store
                setTransactions(TransactionsStore.transactions);
                setSortColumn([id, 'n']);
            }
        } else {
            // sort asc per id
            setTransactions([
                ...transactions.toSorted((a, b) => b[id] - a[id])
            ]);
            setSortColumn([id, 'a']);
        }
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // No of rows
    const [listToggleNoOfRows, setListToggleNoOfRows] = useState(false);
    const [limit, setLimit] = useState(10);

    const toggleNoOfRows = (limit: number) => {
        TransactionsApi.getTransactions(limit).then((data: GetTransactions) => {
            TransactionsStore.setTransactions(data.transactions.map(t => mapTransaction(t)));
            PageTokenStore.setPageToken(data.last_evaluated_key);
        });
        setLimit(limit);
        setListToggleNoOfRows(false);
    };

    // Go to next page - based on how many rows selected
    const nextPage = () => {
        TransactionsApi.getTransactions(limit, pageToken).then((data: GetTransactions) => {
            TransactionsStore.setTransactions(data.transactions.map(t => mapTransaction(t)));
            PageTokenStore.setPageToken(data.last_evaluated_key);
        });
    };

    const deleteTransaction = (transactionId: string) => {
        TransactionsApi.deleteTransaction(transactionId).then((res) => {
            // make an api call to get the first limit transactions
            toggleNoOfRows(limit);
        });
    };

    return (
        <>
            <section className="container px-4 sm:px-6 lg:px-8 mx-auto py-2">
                <div className="relative flex flex-row gap-2">
                    <div>
                        <button className="flex flex-row justify-between items-center w-[150px] text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer" onClick={() => setListToggleColumn(!listToggleColumn)}>
                            <span>Toggle Columns</span>
                            <span><ChevronDown size={16} /></span>
                        </button>
                        {
                            listToggleColumn &&
                            <ul className=" absolute bg-white top-[35px] flex flex-col justify-between w-[150px] text-sm border-1 rounded-sm">
                                <li className="border-b-1 p-1 cursor-pointer hover:bg-[#eee]" onClick={showAllColumns}>Show All</li>
                                {
                                    columns.map(column =>
                                        <li className="flex flex-row justify-between border-b-1 p-1 cursor-pointer hover:bg-[#eee]" key={column.id} onClick={() => toggleColumn(column.id)}>
                                            <span>{column.label}</span>
                                            <span>{column.active === true ? <Check size={16} color="green" /> : <X size={16} color="red" />}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        }
                    </div>
                    <div>
                        <button className="flex flex-row justify-between items-center w-[150px] text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer" onClick={() => setListToggleNoOfRows(!listToggleNoOfRows)}>
                            <span>No of Rows: {limit}</span>
                            <span><ChevronDown size={16} /></span>
                        </button>
                        {
                            listToggleNoOfRows &&
                            <ul className=" absolute bg-white top-[35px] flex flex-col justify-between w-[150px] text-sm border-1 rounded-sm">
                                {
                                    [10, 20, 30, 40, 50].map(n =>
                                        <li key={n} className="border-b-1 p-1 cursor-pointer hover:bg-[#eee]" onClick={() => toggleNoOfRows(n)}>{n}</li>
                                    )
                                }
                            </ul>
                        }
                    </div>
                    <div className='flex flex-row gap-2'>
                        <button className="w-[150px] text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer" onClick={() => toggleNoOfRows(limit)}>First Page</button>
                        <button className='w-[150px] text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer' onClick={nextPage}>Next page</button>
                    </div>
                </div>
            </section >
            <div className='container px-4 sm:px-6 lg:px-8 mx-auto py-4'>
                <table className="w-full text-left table-fixed border-1">
                    <thead>
                        <tr>
                            {
                                columns.map(column =>
                                    <th className={"border-1 p-1 cursor-pointer hover:bg-[#eee] " + column.id} key={column.id} onClick={() => sortColumnOnClick(column.id)}>
                                        <div className='flex flex-row items-center justify-between'>
                                            <span>{column.label}</span>
                                            {sortColumn[0] === column.id && sortColumn[1] === 'a' && <span><ArrowUp size={16} /></span>}
                                            {sortColumn[0] === column.id && sortColumn[1] === 'd' && <span><ArrowDown size={16} /></span>}
                                        </div>
                                    </th>
                                )
                            }
                            <th className="border-1 p-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((transaction, index) =>
                                <tr key={transaction.id} className="border-1">
                                    <td className="border-1 p-1 index">{index + 1}</td>
                                    <td className="border-1 p-1 comments">{transaction.comments || '-'}</td>
                                    <td className="border-1 p-1 fx_rate">{transaction.fx_rate || '-'}</td>
                                    <td className="border-1 p-1 portfolio">{transaction.portfolio || '-'}</td>
                                    <td className="border-1 p-1 price">{transaction.price || '-'}</td>
                                    <td className="border-1 p-1 quantity">{transaction.quantity || '-'}</td>
                                    <td className="border-1 p-1 sale_method">{transaction.sale_method || '-'}</td>
                                    <td className="border-1 p-1 settlement_date">{formatDate(transaction.settlement_date as Date) || '-'}</td>
                                    <td className="border-1 p-1 status">{transaction.status || '-'}</td>
                                    <td className="border-1 p-1 total_amount">{transaction.total_amount || '-'}</td>
                                    <td className="border-1 p-1 trade_date">{formatDate(transaction.trade_date as Date) || '-'}</td>
                                    <td className="border-1 p-1 transaction_costs">{transaction.transaction_costs || '-'}</td>
                                    <td className="border-1 p-1 transaction_type">{transaction.transaction_type || '-'}</td>
                                    <td className="border-1 p-1">
                                        <Link href={'/edit/' + transaction.id} className="w-full text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer bg-blue-500 text-white block text-center">Edit</Link>
                                        <button className="w-full text-sm border-1 rounded-sm mb-4 p-1 cursor-pointer bg-red-500 text-white" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>

    )
}