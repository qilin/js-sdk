import fetchMock from 'fetch-mock';

import qilinGame from '../qilinGame';

const apiURL = 'http://test.com';
const mockMeta = 'test';
const testProps = {
  apiURL,
  meta: {},
  qilinProductUUID: 'test',
};

beforeAll(() => {
  fetchMock.mock(`${apiURL}/auth`, { meta: mockMeta });
});

afterAll(() => {
  fetchMock.restore();
});

describe('QilinGame', () => {
  describe('Init method', () => {
    it('Method is defined', () => {
      expect(qilinGame.init).toBeDefined();
    });

    it('Method returned meta data', async () => {
      const meta = await qilinGame.init(testProps);

      expect(meta).toBe(mockMeta);
    });
  });
  describe('EnableFullscreenMode method', () => {
    it('Method is defined', () => {
      expect(qilinGame.enableFullscreenMode).toBeDefined();
    });

    it('Method call postmessage', async () => {
      await qilinGame.init(testProps);
      const spy = jest.spyOn(window.parent, 'postMessage');
      qilinGame.enableFullscreenMode();
      expect(spy).toBeCalled();
      spy.mockRestore();
    });
  });
  describe('ShowPaymentForm method', () => {
    it('Method is defined', () => {
      expect(qilinGame.showPaymentForm).toBeDefined();
    });

    it('Method call postmessage', async () => {
      await qilinGame.init(testProps);
      const spy = jest.spyOn(window.parent, 'postMessage');
      qilinGame.showPaymentForm({} as any);
      expect(spy).toBeCalled();
      spy.mockRestore();
    });
  });
  describe('AddCallback method', () => {
    it('Method is defined', () => {
      expect(qilinGame.addCallback).toBeDefined();
    });
  });
});
