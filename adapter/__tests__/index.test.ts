import '../index';

describe('Index file', () => {
  it('QilinHub', () => {
    expect((window as any).qilinHub).toBeDefined();
  });
});
