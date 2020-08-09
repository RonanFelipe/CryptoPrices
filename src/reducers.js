import { UPDATE_COINS_DATA, UPDATE_COINS_DATA_SUCCESS } from "./ActionTypes";
import { LOAD_SEARCH_VALUES } from "./ActionTypes";
import {combineReducers} from "redux";

const initialState = {
    isFetching: false,
    doUpdate: true,
    coins: {},
    search: [],
};

function coinsReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_COINS_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                doUpdate: false,
                coins: {},
            });
        case UPDATE_COINS_DATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                doUpdate: false,
                coins: action.coins,
            });
        case LOAD_SEARCH_VALUES:
            return Object.assign({}, state, {
                search: action.search,
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    coinsReducer,
});

export default rootReducer;