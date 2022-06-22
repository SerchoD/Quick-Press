import { createContext } from 'react';

// backgroundColor: 'rgba(55,55,55,1)',
// 	color: 'rgba(200,200,200,1)',
// 	textShadow: {
// 		textShadowColor: 'rgba(0, 0, 0, .8)',
// 		textShadowOffset: { width: 0, height: 5 },
// 		textShadowRadius: 10,
// 	},

const StylesContext = createContext({
	backgroundColor: 'rgba(55,55,55,1)',
	color: 'rgba(200,200,200,1)',
	textShadow: {
		textShadowColor: 'rgba(0, 0, 0, .8)',
		textShadowOffset: { width: 0, height: 5 },
		textShadowRadius: 10,
	},
});

export default StylesContext;
