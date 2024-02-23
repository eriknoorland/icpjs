import icpjs from '../src/icpjs';

describe('testing icpjs.run function', () => {
  test('trying to run the icp algorithm without a reference should throw an error', () => {
    expect(() => {
      icpjs.run([], []);
    }).toThrow(Error);
  });
});

describe('testing icpjs.run function', () => {
  test('trying to run the icp algorithm with an incorrect reference should throw an error', () => {
    expect(() => {
      // @ts-expect-error
      icpjs.run([{ a: 10, b: 20 }], []);
    }).toThrow(Error);
  });
});

describe('testing icpjs.run function', () => {
  test('trying to run the icp algorithm without data should throw an error', () => {
    expect(() => {
      // @ts-expect-error
      icpjs.run([{ a: 10, b: 20 }], []);
    }).toThrow(Error);
  });
});