import { combineReducers } from 'redux';
import { loadingReducer } from './loader';
import ThemeReducer from './themeStyles';

const RootReducer = combineReducers({
	loader: loadingReducer,
	themeStyle: ThemeReducer,
});

export default RootReducer;
