import {increase} from '../../../utils/increase';

test ('simple Array.at test', () => {
  expect (
    [1,3,22].at(-1)
  ).toStrictEqual(
     22 
  );
});

test ('import increase', () => {
  expect (
    increase(41)
  ).toStrictEqual(
    42
  );
});