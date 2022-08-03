import {combineReducers} from "redux";
import { cartreducer } from "./reducer";
import {wishreducer} from './reducer'


const rootred = combineReducers({
    cartreducer, wishreducer
});


export default rootred
