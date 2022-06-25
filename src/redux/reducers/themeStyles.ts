import { AnyAction } from 'redux';
import { ThemeStylesDispatchTypes } from '../actions/themeStyles/types';
import { ThemeStylesTypes } from '../types/themeStyles';

export interface ThemeStyle {
	themeNumber: number;
}

const initialState: ThemeStyle = {
	themeNumber: 1,
};

export default function ThemeReducer(
	state: ThemeStyle = initialState,
	{ payload, type }: ThemeStylesDispatchTypes
) {
	console.log('action en el reducer: ', payload);

	switch (type) {
		case ThemeStylesTypes.RANDOM_STYLES:
			return { ...state };
		case ThemeStylesTypes.DEFAULT_STYLES:
			return { ...state };

		default:
			return state;
	}
}
