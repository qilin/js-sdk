import openIframe from '../src/openIframe';
import qilinGameFrame from '../src/qilinGameFrame';
import { PAYMENT_FORM_CLOSED } from '../src/constants';

const SHOW_ORDER_BOX = 'rgames-showOrderBox';
const ON_ORDER_SUCCESS = 'onOrderSuccess';
const ON_ORDER_BOX_CLOSE = 'onOrderBoxUserClose';
const FULLSCREEN_ENABLE = 'rgames-fullscreenEnable';

export default (apiURL: string) => {
  if (!apiURL) throw new Error('Api URL is required, but not provided');
  const proxy = qilinGameFrame('PROXY', apiURL);
  let isGameInitialized = false;
  let gameFrame: Window;

  const payFormClosedCallback = (payload: any) => {
    if (!gameFrame) return;

    const { status } = payload;
    console.log('Rambler Adapter Payform status: ', status);
    const message = { method: status ? ON_ORDER_SUCCESS : ON_ORDER_BOX_CLOSE };
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

        const { method } = data;

        if (!method) return;

        if (!gameFrame) {
          // first event may be only from child frame
          gameFrame = event.source as Window;
        }

        if (method === SHOW_ORDER_BOX) {
          proxy.showPaymentForm(data.data, '', '');
        }

        if (method === FULLSCREEN_ENABLE) {
          proxy.enableFullscreenMode();
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
