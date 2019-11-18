import { PayFormCallback, HostInitProps, AuthFunction } from './types';
import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED, ENABLE_FULLSCREEN, FULLSCREEN_MODE_CHANGED } from './constants';
import getAuthFunction from './getAuthFunction';
import logError from './logError';

const getQilinStore = () => {
  const queryString = window.location.href;
  let payFormCallback: PayFormCallback;
  let childFrame: Window;
  let isFullscreenEnabled = false;
  let qilinProductUID: string;
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

  const payFormListener = (event: MessageEvent) => {
    if (!payFormCallback) return;

    const frame = event.source as Window;
    const { data = {} } = event;
    const { type, payload = {} } = data;
    if (type !== SHOW_PAYMENT_FORM) return;
    const { qilinProductUID, userId, itemId } = payload;

    payFormCallback({ qilinProductUID, userId, itemId })
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
      isFullscreenEnabled = true;
    }
  };

  const checkFullscreenSupport = () => isFullscreenEnabled;

  const onAuthSuccess = () => {
    window.addEventListener('message', payFormListener);
    window.addEventListener('message', fullScreenListener);
  };

  const init = async (props: HostInitProps) => {
    qilinProductUID = props.qilinProductUID;
    apiURL = props.apiURL;

    if (!qilinProductUID || !apiURL) {
      const error = new Error(apiURL ? 'Game UID is required, but not provided' : 'Api URL is required, but not provided');
      logError(error);
      throw error;
    }

    authFunction = getAuthFunction(apiURL);

    try {
      const meta = await authFunction({
        meta: props.meta,
        url: queryString,
        qilinProductUID,
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
    setFullscreen,
    checkFullscreenSupport,
  };
};

export default getQilinStore();
