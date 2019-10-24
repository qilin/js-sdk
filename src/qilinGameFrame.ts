import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED } from './constants';
import { Callback } from 'types';

export default (gameUid: string, authUrl: string, onAuth?: (url: string) => any) => {
  if (!gameUid) throw new Error('Game UID is required, but not provided');
  if (!authUrl) throw new Error('Auth URL is required, but not provided');

  const frameOrigin = window.location.hostname;
  const queryString = window.location.search;
  const callbacks: { [key: string]: Callback[] } = {};

  const dispatchEvent = (event: string) => {
    const eventCallbacks = callbacks[event];
    if (!eventCallbacks) return;
    eventCallbacks.forEach(callback => callback());
  };
  
  const addCallback = (eventType: string, callback: Callback) => {
    const eventCallbacks = callbacks[eventType] || [];
    eventCallbacks.push(callback);
    callbacks[eventType] = eventCallbacks;
  };

  const showPaymentForm = (itemId: string, userId: string) => {
    const data = {
      type: SHOW_PAYMENT_FORM,
      payload: { gameUid, userId, itemId },
    };
    window.parent.postMessage(data, frameOrigin);
  };

  window.addEventListener('message', (event: MessageEvent) => {
    const { data = {} } = event;
    if (data.type !== PAYMENT_FORM_CLOSED) return;
    dispatchEvent(PAYMENT_FORM_CLOSED);
  });

  return {
    showPaymentForm,
    addCallback,
  };
};
