import '../index';

describe('Index file', () => {
  it('QilinStore', () => {
    expect((window as any).qilinStore).toBeDefined();
  });
  it('QilinGame', () => {
    expect((window as any).qilinGame).toBeDefined();
  });
  it('Constants', () => {
    expect((window as any).PAYMENT_FORM_CLOSED).toBeDefined();
    expect((window as any).FULLSCREEN_MODE_CHANGED).toBeDefined();
  });
})