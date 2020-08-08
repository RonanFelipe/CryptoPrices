import React, {useEffect, useState} from 'react';

import Select from 'react-select';
import { coinsName } from '../data_mock';

const CustomClearText = () => 'clear all';
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
    const [selectedCoins, setSelectedCoins] = useState([]);

    const handleChange = (option) => {
        setSelectedCoins(option);
        console.log(selectedCoins);
    };

    return (
        <Select
            closeMenuOnSelect={false}
            components={{ ClearIndicator }}
            styles={{ clearIndicator: ClearIndicatorStyles }}
            defaultValue={[coinsName[4], coinsName[5]]}
            isMulti
            options={coinsName}
            onChange={handleChange}
        />
    );
}