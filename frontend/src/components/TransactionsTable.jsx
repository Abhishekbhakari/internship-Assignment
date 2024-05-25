import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const perPage = 10;

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const { data } = await fetchTransactions({ month, search, page, perPage });
                setTransactions(data.transactions || []); // Ensure transactions is always an array
                setTotal(data.total || 0); // Ensure total is a number
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setTransactions([]); // Set to empty array in case of error
                setTotal(0); // Set to 0 in case of error
            }
        };
        getTransactions();
    }, [month, search, page]);

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions"
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Date of Sale</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.category}</td>
                                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <button disabled={page * perPage >= total} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default TransactionsTable;
