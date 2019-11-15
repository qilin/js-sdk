import '../index';

describe('Index file', () => {
  it('QilinGamenetAdapter', () => {
    expect((window as any).qilinGamenetAdapter).toBeDefined();
  });
});
