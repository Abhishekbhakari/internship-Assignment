import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../services/api';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({
        totalSale: 0,
        soldItems: 0,
        notSoldItems: 0
    });

    useEffect(() => {
        const getStatistics = async () => {
            const { data } = await fetchStatistics(month);
            setStatistics(data);
        };
        getStatistics();
    }, [month]);

    return (
        <div>
            <div>Total Sale Amount: ${statistics.totalSale}</div>
            <div>Total Sold Items: {statistics.soldItems}</div>
            <div>Total Not Sold Items: {statistics.notSoldItems}</div>
        </div>
    );
};

export default Statistics;
