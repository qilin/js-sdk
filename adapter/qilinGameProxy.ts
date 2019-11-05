import openIframe from './openIframe';
import qilinGameFrame from '../src/qilinGameFrame';
import { PAYMENT_FORM_CLOSED, SHOW_PAYMENT_FORM, ENABLE_FULLSCREEN, FULLSCREEN_MODE_CHANGED } from '../src/constants';

export default (apiURL: string) => {
  if (!apiURL) throw new Error('Api URL is required, but not provided');
  const proxy = qilinGameFrame('PROXY', apiURL);
  let isGameInitialized = false;
  let gameFrame: Window;

  const getProxyCallback = (type: string) => (payload: any) => {
    if (gameFrame) gameFrame.postMessage({ type, payload }, '*');
  };

  const init = async (inputMeta: any) => {
    try {
      const meta = await proxy.init(inputMeta);
      const { url } = meta;
      isGameInitialized = true;
      openIframe(url);

      window.addEventListener('message', (event: MessageEvent) => {
        if (!isGameInitialized) return;

        const { data = {} } = event;
        const { type, payload } = data;

        if (!type) return;

        if (!gameFrame) {
          // first event may be only from child frame
          gameFrame = event.source as Window;
        }

        if (type === SHOW_PAYMENT_FORM) {
          const { qilinProductUUID, userId, itemId } = payload;
          proxy.showPaymentForm(itemId, userId, qilinProductUUID);
        }

        if (type === ENABLE_FULLSCREEN) {
          proxy.enableFullscreenMode();
        }
      });

      proxy.addCallback(PAYMENT_FORM_CLOSED, getProxyCallback(PAYMENT_FORM_CLOSED));
      proxy.addCallback(FULLSCREEN_MODE_CHANGED, getProxyCallback(FULLSCREEN_MODE_CHANGED));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    init,
  };
};
