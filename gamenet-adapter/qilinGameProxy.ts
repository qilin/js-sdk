import openIframe from '../src/openIframe';
import qilinGameFrame from '../src/qilinGameFrame';
import { PAYMENT_FORM_CLOSED } from '../src/constants';

const BUY_ITEM = 'buyItem';
const ON_SUCCESS_BUY = 'onSuccessBuy';
const ON_CANCELL_BUY = 'onCancelBuy';

export default (apiURL: string) => {
  if (!apiURL) throw new Error('Api URL is required, but not provided');
  const proxy = qilinGameFrame('PROXY', apiURL);
  let isGameInitialized = false;
  let gameFrame: Window;

  const payFormClosedCallback = (payload: any) => {
    if (!gameFrame) return;

    const { status } = payload;
    console.log('Gamenet Adapter Payform status: ', status);
    const message = JSON.stringify({ method: status ? ON_SUCCESS_BUY : ON_CANCELL_BUY });
    gameFrame.postMessage(message, '*');
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
        if (typeof data === 'string') {
          const { method, ...rest } = JSON.parse(data);

          if (!method) return;

          if (!gameFrame) {
            // first event may be only from child frame
            gameFrame = event.source as Window;
          }

          if (method === BUY_ITEM) {
            const { itemId } = rest;
            proxy.showPaymentForm(itemId, '', '');
          }
        }
      });

      proxy.addCallback(PAYMENT_FORM_CLOSED, payFormClosedCallback);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    init,
  };
};
