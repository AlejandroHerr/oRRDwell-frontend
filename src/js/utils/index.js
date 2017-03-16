import { List } from 'immutable';

export const AorB = (a, b) => a || b;

export const pureTransformer = (input, output, mapper, select, size = i => i.size, idx = 0) => {
  if (idx >= size(input)) {
    return output;
  }

  const output2 = mapper(select(input, idx, output), idx, output);

  return pureTransformer(input, output2, mapper, select, size, idx + 1);
};

export const selectFromList = (list, idx) => list.get(idx);

export const listTransformer = (input, mapper) => pureTransformer(
  input,
  new List(),
  mapper,
  selectFromList,
);
