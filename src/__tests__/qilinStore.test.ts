import fetchMock from 'fetch-mock';

import qilinStore from '../qilinStore';

const apiURL = 'http://test.com';
const mockMeta = 'test';

beforeAll(() => {
  fetchMock.mock(`${apiURL}/auth`, { meta: mockMeta });
});

afterAll(() => {
  fetchMock.restore();
});

describe('QilinStore', () => {
  describe('Init method', () => {
    it('Method is defined', () => {
      expect(qilinStore.init).toBeDefined();
    });

    it('Method returned meta data', async () => {
      const meta = await qilinStore.init({
        apiURL,
        meta: {},
        qilinProductUID: 'test',
      });

      expect(meta).toBe(mockMeta);
    });
  });
  describe('OnShowPayForm method', () => {
    it('Method is defined', () => {
      expect(qilinStore.onShowPayForm).toBeDefined();
    });
  });
  describe('SetFullscreen method', () => {
    it('Method is defined', () => {
      expect(qilinStore.setFullscreen).toBeDefined();
    });
  });
  describe('CheckFullscreenSupport method', () => {
    it('Method is defined', () => {
      expect(qilinStore.checkFullscreenSupport).toBeDefined();
    });
  });
});
