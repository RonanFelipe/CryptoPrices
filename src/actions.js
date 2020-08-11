import {UPDATE_COINS_DATA, UPDATE_COINS_DATA_SUCCESS, UPDATE_COINS_DATA_ERROR, LOAD_CHART_DATA} from './ActionTypes';
import {LOAD_SEARCH_VALUES, LOAD_COIN_DETAILS} from './ActionTypes';
import fetch from 'cross-fetch';
const api_url = 'https://poloniex.com/public?command=returnTicker';

export function requestCoins() {
    return {
        type: UPDATE_COINS_DATA,
    }
}

function receiveCoins(json) {
    return {
        type: UPDATE_COINS_DATA_SUCCESS,
        coins: json
    }
}

function fetchCoins() {
    return function (dispatch) {
        dispatch(requestCoins());
        return fetch(api_url)
            .then(response => response.json())
                .then(json => dispatch(receiveCoins(json)))
    }
}

function shouldFetchCoins(state) {
    const update = state.coins;
    if (update === undefined) {
        return true
    } else if (update.length < 1) {
        return true
    } else if (update.isFetching) {
        return false
    } else {
        return update.doUpdate
    }
}

export function fetchCoinsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchCoins(getState())) {
            return dispatch(fetchCoins())
        } else {
            return Promise.resolve()
        }
    }
}

function loadSearch(values) {
    return {
        type: LOAD_SEARCH_VALUES,
        search: values,
    }
}

export function initSearch() {
    return (dispatch, getState) => {
        const { coinsReducer: {coins} = {} } = getState();

        if (coins !== undefined) {
            let coinsPreLoadKeys = [];
            Object.keys(coins).forEach(key => {
                coinsPreLoadKeys.push({value: key, label: key})
            });
            dispatch(loadSearch(coinsPreLoadKeys));
        }
    }
}

function loadChart(values) {
    return {
        type: LOAD_CHART_DATA,
        chartData: values
    }
}

export function initChart(searchOptions) {
    return (dispatch, getState) => {
        const { coinsReducer: {coins} = {} } = getState();
        if (coins !== undefined) {
            let searchResult = [];
            Object.keys(coins).forEach(key => {
                searchOptions.forEach(function (search_key) {
                    if (search_key.value === key) {
                        searchResult.push({name: key, last: parseFloat(coins[key].last), high24hr: parseFloat(coins[key].high24hr)})
                    }
                });
            });
            dispatch(loadChart(searchResult));
        }
    }
}

function loadCardDetail(coinData) {
    return {
        type: LOAD_COIN_DETAILS,
        coinDetails: coinData
    }
}

export function loadCard(coin) {
    console.log("Load Card");
    return (dispatch, getState) => {
        console.log("Load Card inside");
        const { coinsReducer: {coins} = {} } = getState();
        if (coins !== undefined) {
            let coinData = [];
            Object.keys(coins).forEach(key => {
                if (coin === key) {
                    coinData.push({[key]: coins[key]});
                }
            });
            dispatch(loadCardDetail(coinData));
        }
    }
}