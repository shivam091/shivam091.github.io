/**
 * Returns a single random element from a read-only or mutable array.
 */
export function sampleOne<T>(arr: readonly T[]): T {
  // Note: if the array is empty, this returns undefined at runtime.
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns an array of random elements sampled from the input array.
 */
export function sample<T>(arr: readonly T[], len: number = 1): T[] {
  // Specify type here to prevent TypeScript from inferring this as any[] or never[]
  const output: T[] = [];

  for (let i = 0; i < len; i++) {
    output.push(sampleOne(arr));
  }

  return output;
}

interface RandomOptions {
  rounded?: boolean;
}

/**
 * Generates a random number between min and max bounds.
 */
export const random = (
  min: number,
  max: number,
  options: RandomOptions = {}
): number => {
  const { rounded = true } = options;
  const partialVal = Math.random() * (max - min);

  return rounded ? Math.floor(partialVal) + min : partialVal + min;
};
