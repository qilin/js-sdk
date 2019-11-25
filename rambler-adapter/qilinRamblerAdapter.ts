import openIframe from '../src/openIframe';
import qilinGame from '../src/qilinGame';
import { PAYMENT_FORM_CLOSED } from '../src/constants';
import { ProxyInitProps } from '../src/types';
import logError from '../src/logError';

const SHOW_ORDER_BOX = 'rgames-showOrderBox';
const ON_ORDER_SUCCESS = 'onOrderSuccess';
const ON_ORDER_BOX_CLOSE = 'onOrderBoxUserClose';
const FULLSCREEN_ENABLE = 'rgames-fullscreenEnable';

const getQilinRamblerAdapter = () => {
  let isGameInitialized = false;
  let gameFrame: Window;

  const payFormClosedCallback = (payload: any) => {
    if (!gameFrame) return;

    const { status } = payload;
    console.log('Rambler Adapter Payform status: ', status);
    const message = { method: status ? ON_ORDER_SUCCESS : ON_ORDER_BOX_CLOSE };
    gameFrame.postMessage(message, '*');
  };

  const init = async (props: ProxyInitProps) => {
    const { apiURL } = props;

    if (!apiURL) {
      const error = new Error('Api URL is required, but not provided');
      logError(error);
      throw error;
    }

    try {
      const meta = await qilinGame.init({
        // ToDo: Сервер проверяет qilinProductUUID на валидность uuid-v4. Пофиксить
        qilinProductUUID: '3f49e992-2d08-4b95-9ee3-738063ea9365',
        meta: props.meta,
        apiURL,
      });

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
          qilinGame.showPaymentForm({
            qilinProductUUID: '',
            userId: '',
            itemId: data.data,
          });
        }

        if (method === FULLSCREEN_ENABLE) {
          qilinGame.enableFullscreenMode();
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

export default getQilinRamblerAdapter();
