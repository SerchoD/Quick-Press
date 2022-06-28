import { ThemeStylesDispatchTypes } from '../actions/themeStyles/types';
import { ThemeStylesTypes } from '../types/themeStyles';

export interface ThemeStyle {
	backgroundColor1: string;
	backgroundColor2: string;
	roundBtnBorderColor: string;
	textColor: string;
}

const initialState: ThemeStyle = {
	// backgroundColor1: 'rgba(55,55,55,1)',
	backgroundColor1: 'rgba(55,55,55,1)',
	backgroundColor2: 'rgba(111,111,111,.6)',
	roundBtnBorderColor: 'rgba(222,222,222,.8)',
	textColor: 'rgba(200,200,200,1)',
	// textColor: 'blue',
};

export default function ThemeReducer(
	state: ThemeStyle = initialState,
	{ payload, type }: ThemeStylesDispatchTypes
) {
	switch (type) {
		case ThemeStylesTypes.RANDOM_STYLES:
			return { ...payload };
		case ThemeStylesTypes.DEFAULT_STYLES:
			return { ...initialState };

		default:
			return state;
	}
}
