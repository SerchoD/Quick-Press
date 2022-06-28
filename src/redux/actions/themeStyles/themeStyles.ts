import { randomMinMax as r } from '../../../utils/math';
import { ThemeStyle } from '../../reducers/themeStyles';
import { ThemeStylesTypes } from '../../types/themeStyles';

export const newRandomThemeAction = () => {
	const colorRange1 = () =>
		`rgba(
			${r({ min: 50, max: 200 })},
			${r({ min: 50, max: 200 })},
			${r({ min: 50, max: 200 })},
		1)`;
	const colorRange2 = () =>
		`rgba(
			${r({ min: 0, max: 150 })},
			${r({ min: 0, max: 150 })},
			${r({ min: 0, max: 150 })},
		1)`;

	let newRandomStyles: ThemeStyle = {
		backgroundColor1: colorRange2(),
		backgroundColor2: colorRange1(),
		roundBtnBorderColor: colorRange1(),
		textColor: colorRange1(),
	};

	return {
		type: ThemeStylesTypes.RANDOM_STYLES,
		payload: { ...newRandomStyles },
	};
};

export const defaultThemeAction = () => ({
	type: ThemeStylesTypes.DEFAULT_STYLES,
});
