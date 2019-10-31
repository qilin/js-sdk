import { PayFormCallback } from 'types';
import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED } from './constants';
import getAuthFunction from './getAuthFunction';

export default (qilinProductUUID: string, apiURL: string) => {
  if (!qilinProductUUID) throw new Error('Game UID is required, but not provided');
  if (!apiURL) throw new Error('Api URL is required, but not provided');

  const queryString = window.location.href;
  let payFormCallback: PayFormCallback;
  const authFunction = getAuthFunction(apiURL);

  const onPayFormClose = (frame: Window, status: boolean) => {
    const data = {
      type: PAYMENT_FORM_CLOSED,
      payload: { status },
    };
    frame.postMessage(data, '*');
  };

  const onShowPayForm = (callback: PayFormCallback) => {
    payFormCallback = callback;
  };

  const onAuthSuccess = () => {
    window.addEventListener('message', (event: MessageEvent) => {
      if (!payFormCallback) return;

      const frame = event.source as Window;
      const { data = {} } = event;
      const { type, payload = {} } = data;
      if (type !== SHOW_PAYMENT_FORM) return;
      const { qilinProductUUID, userId, itemId } = payload;

      payFormCallback(qilinProductUUID, userId, itemId)
        .then(status => {
          onPayFormClose(frame, status);
        })
        .catch(err => {
          console.error(err);
          onPayFormClose(frame, false);
        });
    });
  };

  const init = async (inputMeta: any) => {
    try {
      const meta = await authFunction(inputMeta, queryString, qilinProductUUID);
      onAuthSuccess();
      return meta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    init,
    onShowPayForm,
  };
};
