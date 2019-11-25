import { PayFormCallback, HostInitProps, AuthFunction } from './types';
import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED, ENABLE_FULLSCREEN, FULLSCREEN_MODE_CHANGED } from './constants';
import getAuthFunction from './getAuthFunction';
import logError from './logError';
import checkFlashEnabled from './checkFlashEnabled';

const getQilinStore = () => {
  const queryString = window.location.href;
  let payFormCallback: PayFormCallback;
  let fullscreenCallback: () => void;
  let childFrame: Window;
  let qilinProductUUID: string;
  let apiURL: string;
  let authFunction: AuthFunction;

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

  const onFullscreenModeEnabled = (callback: () => void) => {
    fullscreenCallback = callback;
  };

  const payFormListener = (event: MessageEvent) => {
    if (typeof payFormCallback !== 'function') return;

    const frame = event.source as Window;
    const { data = {} } = event;
    const { type, payload = {} } = data;
    if (type !== SHOW_PAYMENT_FORM) return;
    const { qilinProductUUID, userId, itemId } = payload;

    payFormCallback({ qilinProductUUID, userId, itemId })
      .then(status => {
        onPayFormClose(frame, status);
      })
      .catch(err => {
        logError(err);
        onPayFormClose(frame, false);
      });
  };

  const fullScreenListener = (event: MessageEvent) => {
    const { data = {} } = event;
    const { type } = data;
    if (type === ENABLE_FULLSCREEN) {
      childFrame = event.source as Window;
      if (typeof fullscreenCallback === 'function') fullscreenCallback();
    }
  };

  const onAuthSuccess = () => {
    window.addEventListener('message', payFormListener);
    window.addEventListener('message', fullScreenListener);
  };

  const init = async (props: HostInitProps) => {
    qilinProductUUID = props.qilinProductUUID;
    apiURL = props.apiURL;

    if (!qilinProductUUID || !apiURL) {
      const error = new Error(apiURL ? 'Game UID is required, but not provided' : 'Api URL is required, but not provided');
      logError(error);
      throw error;
    }

    authFunction = getAuthFunction(apiURL);

    try {
      const meta = await authFunction({
        meta: props.meta,
        url: queryString,
        qilinProductUUID,
      });
      onAuthSuccess();
      return meta;
    } catch (error) {
      logError(error);
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
    onFullscreenModeEnabled,
    setFullscreen,
    checkFlashEnabled,
  };
};

export default getQilinStore();
