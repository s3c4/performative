'use client';
import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
    Area,
    Line,
    Scatter,
} from 'recharts';
import { TransactionsStore } from '../store/transactions.store';

export default function TransactionBarChart() {

    const [transactions, setTransactions] = useState(TransactionsStore.transactions);

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

    return (

        <section className='grid grid-cols-1 md:grid-cols-2'>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={transactions}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="price" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="price" height={30} stroke="#8884d8" />
                    <Bar dataKey="price" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={400}
                    data={transactions}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="price" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="quantity" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="total_amount" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="price" stroke="#ff7300" />
                    <Scatter dataKey="fx_rate" fill="red" />
                    <Brush dataKey="price" height={30} stroke="#8884d8" />
                </ComposedChart>
            </ResponsiveContainer>
        </section>


    )
}