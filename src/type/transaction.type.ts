export interface Transaction {
    id: string;
    portfolio_id: number;
    instrument_id: number;
    status: 'SETTLED' | 'PENDING',
    comments?: string;
    quantity: number;
    price: number;
    transaction_costs: number;
    trade_date: string | Date;
    fx_rate: string;
    price_uses_market_data?: number;
    settlement_date: string | Date;
    transaction_type: 'BUY' | 'SELL',
    sale_method?: 'FIFO' | 'LIFO' | '',
    portfolio?: string,
    total_amount?: number;
};

export interface GetTransactions {
    last_evaluated_key: string;
    transactions: Transaction[];
}

export const mapTransaction = (t: Transaction) => {
    return {
        ...t,
        trade_date: new Date(t.trade_date),
        settlement_date: new Date(t.settlement_date)
    }
}