import { SHOW_PAYMENT_FORM, ENABLE_FULLSCREEN } from './constants';
import { Callback, GameInitProps, PayFormCallbackProps } from './types';
import getAuthFunction from './getAuthFunction';

const getQilinGame = () => {
  const queryString = window.location.href;
  const callbacks: { [key: string]: Callback[] } = {};
  let isGameInitialized = false;
  let qilinProductUID: string;
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
      payload: { qilinProductUID, ...props },
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
    qilinProductUID = props.qilinProductUID;
    apiURL = props.apiURL;

    if (!qilinProductUID) throw new Error('Game UID is required, but not provided');
    if (!apiURL) throw new Error('Api URL is required, but not provided');

    try {
      const authFunction = props.onAuth || getAuthFunction(apiURL);
      const meta = await authFunction({
        meta: props.meta,
        url: queryString,
        qilinProductUID,
      });
      isGameInitialized = true;
      return meta;
    } catch (error) {
      console.error(error);
      throw error;
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
