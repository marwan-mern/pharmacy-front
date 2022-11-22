import { combineReducers } from "redux";
import { medsReducer , getlack , getGain ,getDailyAdded ,getSearched} from "./medsReducer";


const reducers = combineReducers({
    medsReducer:medsReducer,
    getlack:getlack,
    TotalGain:getGain,
    getDailyAdded:getDailyAdded,
    getSearched:getSearched

});

export default reducers