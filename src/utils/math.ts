// Returns a random number between two num parametters, Min and Max.
interface Props {
	min: number;
	max: number;
}

export const randomMinMax = ({ min, max }: Props) => {
	return Math.round(Math.random() * (max - min + 1) + min);
};
