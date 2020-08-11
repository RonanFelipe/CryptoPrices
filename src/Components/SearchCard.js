import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { initSearch, initChart } from "../actions";

const CustomClearText = () => 'Limpar busca';
const ClearIndicator = props => {
    const {
        children = <CustomClearText />,
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props;
    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={getStyles('clearIndicator', props)}
        >
            <div style={{ padding: '0px 5px' }}>{children}</div>
        </div>
    );
};

const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? 'blue' : 'black',
});

export default function CustomClearIndicator() {
    const dispatch = useDispatch();
    const coins = useSelector(state => state.coinsReducer.coins);
    const searchValues = useSelector(state => state.coinsReducer.search);
    const defaultSearchValues = [
        {value: 'BTC_DASH', label: 'BTC_DASH'},
        {value: 'BTC_DOGE', label: 'BTC_DOGE'},
        {value: 'BTC_LTC', label: 'BTC_LTC'}
    ];
    const [optionValues, setOptionValues] = useState([]);

    useEffect(() => {
        if (coins !== undefined) {
            dispatch(initSearch());
            dispatch(initChart(defaultSearchValues));
        }
    }, [coins, dispatch]);

    useEffect(() => {
       if (searchValues !== undefined) {
           setOptionValues(searchValues);
       }
    }, [searchValues, setOptionValues]);

    const handleChange = (option) => {
        dispatch(initChart(option));
    };

    return (
        <Select
            closeMenuOnSelect
            components={{ ClearIndicator }}
            styles={{ clearIndicator: ClearIndicatorStyles }}
            defaultValue={defaultSearchValues}
            isMulti
            options={optionValues}
            onChange={handleChange}
        />
    );
}