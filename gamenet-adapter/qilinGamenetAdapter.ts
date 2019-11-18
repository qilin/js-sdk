import openIframe from '../src/openIframe';
import qilinGame from '../src/qilinGame';
import { PAYMENT_FORM_CLOSED } from '../src/constants';
import { ProxyInitProps } from '../src/types';
import logError from '../src/logError';

const BUY_ITEM = 'buyItem';
const ON_SUCCESS_BUY = 'onSuccessBuy';
const ON_CANCELL_BUY = 'onCancelBuy';

const getGamenetAdapter = () => {
  let isGameInitialized = false;
  let gameFrame: Window;
  let apiURL: string;

  const payFormClosedCallback = (payload: any) => {
    if (!gameFrame) return;

    const { status } = payload;
    const message = JSON.stringify({ method: status ? ON_SUCCESS_BUY : ON_CANCELL_BUY });
    gameFrame.postMessage(message, '*');
  };

  const init = async (props: ProxyInitProps) => {
    apiURL = props.apiURL;

    if (!apiURL) {
      const error = new Error('Api URL is required, but not provided');
      logError(error);
      throw error;
    }

    try {
      const meta = await qilinGame.init({
        meta: props.meta,
        qilinProductUID: 'PROXY',
        apiURL,
      });

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
            qilinGame.showPaymentForm(rest);
          }
        }
      });

      qilinGame.addCallback(PAYMENT_FORM_CLOSED, payFormClosedCallback);
    } catch (error) {
      logError(error);
    }
  };
  return {
    init,
  };
};

export default getGamenetAdapter();
