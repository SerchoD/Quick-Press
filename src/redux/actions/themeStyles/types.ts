import { ThemeStylesTypes } from '../../types/themeStyles';

export interface IactionRandomTheme {
	type: typeof ThemeStylesTypes.RANDOM_STYLES;
	payload: any;
}

export interface IactionDefaultTheme {
	type: typeof ThemeStylesTypes.DEFAULT_STYLES;
	payload: any;
}

export type ThemeStylesDispatchTypes = IactionRandomTheme | IactionDefaultTheme;
