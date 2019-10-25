import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED } from './constants';
import { Callback } from './types';

export default (gameUid: string, authUrl: string, onAuth?: (meta: any, url: string) => any) => {
  if (!gameUid) throw new Error('Game UID is required, but not provided');
  if (!authUrl) throw new Error('Auth URL is required, but not provided');

  const frameOrigin = window.location.hostname;
  const queryString = window.location.href;
  const callbacks: { [key: string]: Callback[] } = {};
  let isGameInitialized = false;

  const defaultAuth = async (meta: any, url: string) => {
    try {
      const responce = await fetch(authUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta, url }),
      });

      const json = await responce.json();
      const { code } = json;
      if (!code || code !== 200) throw new Error(`Responce code ${code}`);
      return json.meta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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
      payload: { gameUid, userId, itemId },
    };
    window.parent.postMessage(data, frameOrigin);
  };

  window.addEventListener('message', (event: MessageEvent) => {
    if (!isGameInitialized) return;

    const { data = {} } = event;
    const { type, ...rest } = data;

    if (type === PAYMENT_FORM_CLOSED) dispatchEvent(PAYMENT_FORM_CLOSED, rest);
  });

  return {
    showPaymentForm,
    addCallback,
    init,
  };
};
