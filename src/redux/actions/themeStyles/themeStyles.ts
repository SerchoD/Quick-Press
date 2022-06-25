import { ThemeStylesTypes } from '../../types/themeStyles';

export const newRandomThemeAction = () => {
	return {
		type: ThemeStylesTypes.RANDOM_STYLES,
		payload: { themeNumber: 'Sarasa' },
	};
};

export const defaultThemeAction = () => ({
	type: ThemeStylesTypes.DEFAULT_STYLES,
});
