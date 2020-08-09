import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
import { fetchCoinsIfNeeded } from "../actions";
import Title from './Title';

export default function Chart() {
    const apiData = useSelector(state => state.coinsReducer);
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (apiData.doUpdate) {
            dispatch(fetchCoinsIfNeeded());
            console.log("1 inside");
        }
        console.log("1");
    }, [setChartData, apiData, dispatch]);

    useEffect(() => {
        console.log("second use effect");
        console.log(apiData);
        if (apiData !== undefined) {
            // const coinObject = apiData.coins;
            const coinsArray = apiData.chart;
            // Object.keys(coinObject).forEach(key => {
            //     coinsArray.push({name: key, last: parseFloat(coinObject[key].last), high24hr: parseFloat(coinObject[key].high24hr)})
            // });
            console.log("---- second use effect");
            console.log(coinsArray);
            setChartData(coinsArray);
        }
        console.log("2 end second use effect");
    }, [apiData, setChartData]);

    return (
        <React.Fragment>
            <Title>Gráfico Com Últimos Valores</Title>
            <ResponsiveContainer>
                <LineChart width={900} height={300} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <Tooltip />

                    <Line type="monotone" dataKey="high24hr" stroke="blue" />
                    <Line type="monotone" dataKey="last" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}