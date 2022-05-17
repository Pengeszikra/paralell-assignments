// callback:(T, elementOfArray) => T

const Reduce = inputArray => (callback, initialValue = null) => {
  let acu = initialValue === null ? inputArray[0] : initialValue;
  const result = inputArray.forEach((value, index) => {
    if (initialValue === null && index === 0) return
    acu = callback(acu, value);
  });
  return acu;
}

describe('reduce', () => {
  it('should ???', () => {
    expect (
      Reduce([1,2,3])((acu, value) => acu + value, 0)
    ).toEqual(
      6
    );
  });
});

describe('reduce with optional initial value', () => {
  it('should ???', () => {
    expect (
      Reduce(["eee","bbb","ccc"])((acu, value) => acu + value[0])
    ).toEqual(
      "eeebc"
    );
  });
});