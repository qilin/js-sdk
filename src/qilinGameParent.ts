import { PayFormCallback } from 'types';
import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED } from './constants';

export default (payFormCallback: PayFormCallback) => {
  if (typeof payFormCallback !== 'function') throw new Error('PayFormCallback not provided!');

  const onFormClose = (frame: Window, status: boolean) => {
    const data = {
      type: PAYMENT_FORM_CLOSED,
      payload: { status },
    };
    frame.postMessage(data, '*');
  };

  window.addEventListener('message', (event: MessageEvent) => {
    const frame = event.source as Window;
    const { data = {} } = event;
    const { type, payload = {} } = data;
    if (type !== SHOW_PAYMENT_FORM) return;
    const { gameUid, userId, itemId } = payload;
    payFormCallback(gameUid, userId, itemId)
      .then(status => onFormClose(frame, status))
      .catch(err => {
        console.error(err);
        onFormClose(frame, false);
      });
  });
};
