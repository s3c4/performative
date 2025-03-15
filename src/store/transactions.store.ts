export const TransactionsStore = {
    transactions: [],
    setTransactions: (newTransactions) => {
        TransactionsStore.transactions = newTransactions;
        document.dispatchEvent(TransactionsStore.transactionsEvent);
    },
    transactionsEvent: new Event('TransactionsEvent')
};

export const PageTokenStore = {
    pageToken: '',
    setPageToken: (newPageToken) => {
        PageTokenStore.pageToken = newPageToken;
        document.dispatchEvent(PageTokenStore.pageTokenEvent);
    },
    pageTokenEvent: new Event('PageTokenEvent')
}
