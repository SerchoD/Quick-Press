// Returns a random number between two num parametters, Min and Max.
export const randomMinMax = ({min, max}) => {
  return Math.round(Math.random() * (max - min + 1) + min);
};
