import { describe, it } from 'mocha';
import { expect } from 'chai';

import { matchPath } from '../lib/matchPath';

describe('matchPath', () => {
  it('invalid url => null', () => {
    const result = matchPath('invalid-url', {
      path: '/users/:login/edit/start'
    });

    expect(result).is.null;
  });
});
