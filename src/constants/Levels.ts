import { Level } from '../types/types';

let LEVELS: Level[] = [];

let time = 10;
let timeCounter = 0;

for (let i = 1; i <= 100; i++) {
	timeCounter++;

	LEVELS.push({
		level: i,
		time: time,
		goal: time + Math.floor(i * 0.75),
	});

	if (timeCounter === 5) {
		time = time + 5;
		timeCounter = 0;
	}
}

export { LEVELS };
