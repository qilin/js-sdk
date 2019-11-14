import fetchMock from 'fetch-mock';
import fetch from 'node-fetch';

it('First', async () => {
  fetchMock.mock('http://example.com', 200);
  const res = await fetch('http://example.com');

  fetchMock.restore();
  expect(true).toBe(true);
});
