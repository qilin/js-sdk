import qilinGameFrame from '../src/qilinGameFrame';
import { PROXY } from './constants';
import openIframe from './openIframe';
import { PAYMENT_FORM_CLOSED, SHOW_PAYMENT_FORM } from '../src/constants';

export default (apiURL: string) => {
  if (!apiURL) throw new Error('Api URL is required, but not provided');

  const proxy = qilinGameFrame(PROXY, apiURL);
  let isGameInitialized = false;
  let gameFrame: Window;

  const payFormCallback = (args: any) => {
    if (!gameFrame) return;

    gameFrame.postMessage(PAYMENT_FORM_CLOSED, args);
  };

  const init = async (inputMeta: any) => {
    try {
      const meta = await proxy.init(inputMeta);
      const { url } = meta;
      isGameInitialized = true;
      openIframe(url);

      window.addEventListener('message', (event: MessageEvent) => {
        if (!isGameInitialized) return;

        const { data = {} } = event;
        const { type, payload } = data;
        if (type !== SHOW_PAYMENT_FORM) return;

        gameFrame = event.source as Window;
        const { qilinProductUUID, userId, itemId } = payload;
        proxy.showPaymentForm(itemId, userId, qilinProductUUID);
      });

      proxy.addCallback(PAYMENT_FORM_CLOSED, payFormCallback);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    init,
  };
};


// import qilinGameParent from '../src/qilinGameParent';
// import { PROXY } from './constants';
// import openIframe from './openIframe';
// import { PAYMENT_FORM_CLOSED } from '../src/constants';

// const payFormCallback = ()

// export default (apiURL: string) => {
//   if (!apiURL) throw new Error('Api URL is required, but not provided');

//   const proxy = qilinGameParent(PROXY, apiURL);
//   let isGameInitialized = false;

//   const init = async (inputMeta: any) => {
//     try {
//       const meta = await proxy.init(inputMeta);
//       const { url } = meta;
//       isGameInitialized = true;
//       openIframe(url);

//       window.addEventListener('message', (event: MessageEvent) => {
//         if (!isGameInitialized) return;

//         const { data = {} } = event;
//         const { type, payload } = data;

//         if (type === PAYMENT_FORM_CLOSED) dispatchEvent(PAYMENT_FORM_CLOSED, payload);
//       });

//     } catch (error) {
//       console.error(error);
//       throw error;
//     }

//   };

//   return {
//     init,
//   };
// };