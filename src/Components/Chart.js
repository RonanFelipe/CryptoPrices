import React, {useEffect, useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
import Title from './Title';
import {data} from "../data_mock";

let price = [];
Object.keys(data).forEach(key => {
    price.push({name: key, last: parseFloat(data[key].last), high24hr: parseFloat(data[key].high24hr)})
});

const newPrice = price.slice(1,9);

export default function Chart() {
    const theme = useTheme();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(newPrice);
        console.log(chartData)
    }, [chartData, setChartData]);

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart width={900} height={300} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />

                    <Tooltip />

                    <Line type="monotone" dataKey="high24hr" stroke="blue" />
                    <Line type="monotone" dataKey="last" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}