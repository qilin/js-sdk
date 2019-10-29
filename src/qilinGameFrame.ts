import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED } from './constants';
import { Callback } from './types';
import getAuthFunction from './getAuthFunction';

export default (qilinProductUUID: string, apiURL: string, onAuth?: (meta: any, url: string) => any) => {
  if (!qilinProductUUID) throw new Error('Game UID is required, but not provided');
  if (!apiURL) throw new Error('Api URL is required, but not provided');

  const queryString = window.location.href;
  const callbacks: { [key: string]: Callback[] } = {};
  let isGameInitialized = false;
  const defaultAuth = getAuthFunction(apiURL);

  const init = async (inputMeta: any) => {
    try {
      const authFunction = onAuth || defaultAuth;
      const meta = await authFunction(inputMeta, queryString);
      isGameInitialized = true;
      return meta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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

  const showPaymentForm = (itemId: string, userId: string) => {
    if (!isGameInitialized) {
      alert('Game is not initialized!');
      return;
    }

    const data = {
      type: SHOW_PAYMENT_FORM,
      payload: { qilinProductUUID, userId, itemId },
    };
    window.parent.postMessage(data, '*');
  };

  window.addEventListener('message', (event: MessageEvent) => {
    if (!isGameInitialized) return;

    const { data = {} } = event;
    const { type, payload } = data;

    if (type === PAYMENT_FORM_CLOSED) dispatchEvent(PAYMENT_FORM_CLOSED, payload);
  });

  return {
    showPaymentForm,
    addCallback,
    init,
  };
};
