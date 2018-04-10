import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tripReducer from './tripReducer';
import actReducer from './actReducer';

export default combineReducers({
	auth: authReducer,
	trip: tripReducer,
	act: actReducer
});
