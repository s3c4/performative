export const TransactionsApi = {
    getTransactions: async (limit = 10, pageToken = '') => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/transactions?limit=' + limit
            + (pageToken?.length > 0 ? ('&last_evaluated_key=' + pageToken) : '');
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
                'candidate_id': process.env.NEXT_PUBLIC_CANDIDATE_ID
            }
        }).then((res) => {
            return res.json();
        });
    },
    getTransaction: async (transactionId: string) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/transaction/' + transactionId;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
                'candidate_id': process.env.NEXT_PUBLIC_CANDIDATE_ID
            }
        }).then((res) => {
            return res.json();
        });
    },
    putTransaction: async (transaction: string) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/transaction';
        return fetch(url, {
            method: 'PUT',
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
                'candidate_id': process.env.NEXT_PUBLIC_CANDIDATE_ID
            },
            body: transaction
        }).then((res) => {
            return res.json();
        });
    },
    postTransaction: async (transaction: string) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/transaction';
        return fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
                'candidate_id': process.env.NEXT_PUBLIC_CANDIDATE_ID
            },
            body: transaction
        }).then((res) => {
            return res.json();
        });
    },
    deleteTransaction: async (transactionId: string) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/transaction/' + transactionId;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
                'candidate_id': process.env.NEXT_PUBLIC_CANDIDATE_ID
            }
        }).then((res) => {
            return res;
        });
    }
}
