import { SHOW_PAYMENT_FORM, ENABLE_FULLSCREEN } from './constants';
import { Callback, GameInitProps, PayFormCallbackProps } from './types';
import getAuthFunction from './getAuthFunction';
import logError from './logError';

const getQilinGame = () => {
  const queryString = window.location.href;
  const callbacks: { [key: string]: Callback[] } = {};
  let isGameInitialized = false;
  let qilinProductUUID: string;
  let apiURL: string;

  const dispatchEvent = (eventType: string, args: any) => {
    const eventCallbacks = callbacks[eventType];
    if (!eventCallbacks) return;
    eventCallbacks.forEach(callback => callback(args));
  };

  const addCallback = (eventType: string, callback: Callback) => {
    const eventCallbacks = callbacks[eventType] || [];
    eventCallbacks.push(callback);
    callbacks[eventType] = eventCallbacks;
  };

  const showPaymentForm = (props: PayFormCallbackProps) => {
    if (!isGameInitialized) {
      alert('Game is not initialized!');
      return;
    }

    const data = {
      type: SHOW_PAYMENT_FORM,
      payload: { qilinProductUUID, ...props },
    };
    window.parent.postMessage(data, '*');
  };

  const enableFullscreenMode = () => {
    if (!isGameInitialized) {
      alert('Game is not initialized!');
      return;
    }

    window.parent.postMessage({ type: ENABLE_FULLSCREEN }, '*');
  };

  window.addEventListener('message', (event: MessageEvent) => {
    if (!isGameInitialized) return;

    const { data = {} } = event;
    const { type, payload } = data;

    if (!type) return;

    dispatchEvent(type, payload);
  });

  const init = async (props: GameInitProps) => {
    qilinProductUUID = props.qilinProductUUID;
    apiURL = props.apiURL;

    if (!qilinProductUUID || !apiURL) {
      const error = new Error(apiURL ? 'Game UID is required, but not provided' : 'Api URL is required, but not provided');
      logError(error);
      throw error;
    }

    try {
      const authFunction = props.onAuth || getAuthFunction(apiURL);
      const meta = await authFunction({
        meta: props.meta,
        url: queryString,
        qilinProductUUID,
      });
      isGameInitialized = true;
      return meta;
    } catch (error) {
      logError(error);
    }
  };

  return {
    enableFullscreenMode,
    showPaymentForm,
    addCallback,
    init,
  };
};

export default getQilinGame();
