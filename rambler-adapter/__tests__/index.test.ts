import '../index';

describe('Index file', () => {
  it('QilinRamblerAdapter', () => {
    expect((window as any).qilinRamblerAdapter).toBeDefined();
  });
})