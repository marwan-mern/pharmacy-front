import { ActionTypes } from "../constants/actionTypes"


const initialState = {
    items: [
    ],
};

const initialLack = {
    lack:[

    ],
}

const initialGain = {
    gain:0
}

const initialDailyAdded = {
    Added:[

    ],
}

const initialSearch = {
    Searched:[

    ],
}


export const medsReducer = (state=initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_Meds:
            return {...state,items:action.payload};
        case ActionTypes.RESET_SINGLE_PRODUCT:
            return {...state,items:action.payload};
        case ActionTypes.REDUCE_QUANTITY:
            return {...state,items:action.payload};
        case ActionTypes.ADD_TO_STORE:
            return {...state,items:action.payload};
        case ActionTypes.ADDED_TO_FALSE:
            return {...state,items:action.payload};
        case ActionTypes.ADD_MEDECINE:
            return {...state,items:action.payload};
        case ActionTypes.Delete_MEDECINE:
            return {...state,items:action.payload};
        
        default:
            return state;
    }
}


export const getlack = (state=initialLack, action) => {
    switch (action.type) {
        case ActionTypes.LACK_ITEMS:
            return {...state,lack:action.payload};
        default:
            return state;
    }
}

export const getGain = (state=initialGain, action) => {
    switch (action.type) {
        case ActionTypes.DAILY_GAIN:
            return {...state,gain:action.payload};
        default:
            return state;
    }
}


export const getDailyAdded = (state=initialDailyAdded, action) => {
    switch (action.type) {
        case ActionTypes.DAILY_ADDED:
            return {...state,Added:action.payload};
        case ActionTypes.FETCH_Daily_Added_Products:
            return {...state,Added:action.payload};
        default:
            return state;
    }
}

export const getSearched = (state=initialSearch, action) => {
    switch (action.type) {
        case ActionTypes.SEARCH_ITEMS:
            return {Searched:action.payload};
        default:
            return state;
    }
}