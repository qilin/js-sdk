import openIframe from '../src/openIframe';
import qilinGame from '../src/qilinGame';
import { PAYMENT_FORM_CLOSED, SHOW_PAYMENT_FORM, ENABLE_FULLSCREEN, FULLSCREEN_MODE_CHANGED } from '../src/constants';
import { ProxyInitProps } from '../src/types';
import logError from '../src/logError';

const getQilinHub = () => {
  let isGameInitialized = false;
  let gameFrame: Window;
  let apiURL: string;

  const getProxyCallback = (type: string) => (payload: any) => {
    if (gameFrame) gameFrame.postMessage({ type, payload }, '*');
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
        const { type, payload } = data;

        if (!type) return;

        if (!gameFrame) {
          // first event may be only from child frame
          gameFrame = event.source as Window;
        }

        if (type === SHOW_PAYMENT_FORM) {
          qilinGame.showPaymentForm(payload);
        }

        if (type === ENABLE_FULLSCREEN) {
          qilinGame.enableFullscreenMode();
        }
      });

      qilinGame.addCallback(PAYMENT_FORM_CLOSED, getProxyCallback(PAYMENT_FORM_CLOSED));
      qilinGame.addCallback(FULLSCREEN_MODE_CHANGED, getProxyCallback(FULLSCREEN_MODE_CHANGED));
    } catch (error) {
      logError(error);
    }
  };
  return {
    init,
  };
};

export default getQilinHub();
