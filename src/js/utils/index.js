import { List } from 'immutable';

export const AorB = (a, b) => a || b;

export const pureTransformer = (input, output, idx = 0, mapper, selector, size = i => i.size) => {
  if (idx >= size(input)) {
    return output;
  }

  return pureTransformer(
    input,
    mapper(selector(input, idx, output), idx, output),
    idx + 1, mapper,
    selector,
  );
};

export const listSelector = (list, idx) => list.get(idx);

export const listTransformer = (input, mapper) => pureTransformer(
  input,
  new List(),
  0,
  mapper,
  listSelector,
);
