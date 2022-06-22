import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { loadingReducer } from './loader';
import { lotteriesReducer } from './lotteries';
import { messageReducer } from './message';

const RootReducer = combineReducers({
	auth: authReducer,
	lotteries: lotteriesReducer,
	loader: loadingReducer,
	snackbar: messageReducer,
});

export default RootReducer;
