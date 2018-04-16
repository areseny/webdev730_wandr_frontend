import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tripReducer from './tripReducer';
import friendReducer from './friendReducer';

export default combineReducers({
	auth: authReducer,
	trip: tripReducer,
	friend: friendReducer
});
