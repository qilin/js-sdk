import openIframe from '../openIframe';

describe('OpenIframe', () => {
  const src = 'http://test.com';
  const iframe = openIframe(src);

  it('Return type', () => {
    expect(iframe instanceof HTMLIFrameElement).toBe(true);
  });

  it('Iframe src', () => {
    expect(iframe.src.match(src)).toBeTruthy();
  });
});
