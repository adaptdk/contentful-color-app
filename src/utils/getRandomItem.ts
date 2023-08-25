/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const getRandomItem = (array: Array<any>) =>
  array[Math.floor(Math.random() * array.length)];
