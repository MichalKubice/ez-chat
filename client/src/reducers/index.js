import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from "./errorReducer";
import profileReducer from './profileReducer';
import roomReducer from "./roomReducer";
const rootReducer = combineReducers({
   auth: authReducer,
   errors: errorReducer,
   profile: profileReducer,
   rooms: roomReducer

});



export default rootReducer;