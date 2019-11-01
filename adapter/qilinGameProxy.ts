import { PROXY } from './constants';
import openIframe from './openIframe';
import qilinGameFrame from '../src/qilinGameFrame';
import { PAYMENT_FORM_CLOSED, SHOW_PAYMENT_FORM } from '../src/constants';

export default (apiURL: string) => {
  if (!apiURL) throw new Error('Api URL is required, but not provided');

  const proxy = qilinGameFrame(PROXY, apiURL);
  let isGameInitialized = false;
  let gameFrame: Window;

  const payFormCallback = (args: any) => {
    if (!gameFrame) return;

    const data = {
      type: PAYMENT_FORM_CLOSED,
      payload: args,
    };
    gameFrame.postMessage(data, '*');
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
        if (type !== SHOW_PAYMENT_FORM) return;

        gameFrame = event.source as Window;
        const { qilinProductUUID, userId, itemId } = payload;
        proxy.showPaymentForm(itemId, userId, qilinProductUUID);
      });

      proxy.addCallback(PAYMENT_FORM_CLOSED, payFormCallback);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    init,
  };
};
