import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
import { fetchCoinsIfNeeded, loadCard } from "../actions";
import Title from './Title';

export default function Chart() {
    const apiData = useSelector(state => state.coinsReducer);
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (apiData.doUpdate) {
            dispatch(fetchCoinsIfNeeded());
        }
    }, [setChartData, apiData, dispatch]);

    useEffect(() => {
        if (apiData !== undefined) {
            // const coinObject = apiData.coins;
            const coinsArray = apiData.chart;
            // Object.keys(coinObject).forEach(key => {
            //     coinsArray.push({name: key, last: parseFloat(coinObject[key].last), high24hr: parseFloat(coinObject[key].high24hr)})
            // });
            setChartData(coinsArray);
        }
    }, [apiData, setChartData]);

    function getData(chartDataClick) {
        if (chartDataClick.activeLabel) {
            dispatch(loadCard(chartDataClick.activeLabel));
        }
    }

    return (
        <React.Fragment>
            <Title>Gráfico Com Últimos Valores</Title>
            <ResponsiveContainer>
                <LineChart
                    width={900}
                    height={300}
                    data={chartData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5,}}
                    onClick={getData}
                >
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