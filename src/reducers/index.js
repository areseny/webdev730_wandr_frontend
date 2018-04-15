import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tripReducer from './tripReducer';
// import destReducer from './destReducer';

export default combineReducers({
	auth: authReducer,
	trip: tripReducer
});
