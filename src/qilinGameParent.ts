import { PayFormCallback } from 'types';
import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED, ENABLE_FULLSCREEN, FULLSCREEN_MODE_CHANGED } from './constants';
import getAuthFunction from './getAuthFunction';

export default (qilinProductUUID: string, apiURL: string) => {
  if (!qilinProductUUID) throw new Error('Game UID is required, but not provided');
  if (!apiURL) throw new Error('Api URL is required, but not provided');

  const queryString = window.location.href;
  let payFormCallback: PayFormCallback;
  let childFrame: Window;
  let isFullscreenEnabled = false;
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

  const payFormListener = (event: MessageEvent) => {
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
  };

  const fullScreenListener = (event: MessageEvent) => {
    const { data = {} } = event;
    const { type } = data;
    if (type === ENABLE_FULLSCREEN) {
      childFrame = event.source as Window;
      isFullscreenEnabled = true;
    }
  };

  const checkFullscreenSupport = () => isFullscreenEnabled;

  const onAuthSuccess = () => {
    window.addEventListener('message', payFormListener);
    window.addEventListener('message', fullScreenListener);
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

  const setFullscreen = (fullscreen: boolean) => {
    if (!childFrame) return;

    const data = {
      type: FULLSCREEN_MODE_CHANGED,
      payload: { fullscreen },
    };
    childFrame.postMessage(data, '*');
  };

  return {
    init,
    onShowPayForm,
    setFullscreen,
    checkFullscreenSupport,
  };
};
