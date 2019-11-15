import fetchMock from 'fetch-mock';
import getAuthFunction from '../getAuthFunction';

const apiURL = 'http://test.com';

beforeAll(() => {
  fetchMock.mock(`${apiURL}/auth`, { hello: 'world' });
});

afterAll(() => {
  fetchMock.restore();
});

describe('getAuthFunction', () => {
  it('Fetch called', () => {
    const authFunction = getAuthFunction(apiURL);
    authFunction({
      url: '/test',
      meta: {},
      qilinProductUID: 'test',
    });
    expect(fetchMock.called()).toBe(true);
  });
});
