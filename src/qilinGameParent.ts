// import { PayFormCallback } from 'types';
import { SHOW_PAYMENT_FORM, PAYMENT_FORM_CLOSED } from './constants';

export default (qilinProductUUID: string, apiURL: string) => {
  if (!qilinProductUUID) throw new Error('Game UID is required, but not provided');
  if (!apiURL) throw new Error('Api URL is required, but not provided');

  const onPayFormClose = (frame: Window, status: boolean) => {
    const data = {
      type: PAYMENT_FORM_CLOSED,
      payload: { status },
    };
    frame.postMessage(data, '*');
  };

  const onAuthSuccess = () => {
    window.addEventListener('message', (event: MessageEvent) => {
      const frame = event.source as Window;
      const { data = {} } = event;
      const { type, payload = {} } = data;
      if (type !== SHOW_PAYMENT_FORM) return;
      const { qilinProductUUID, userId, itemId } = payload;

      try {
        // Логика БИЛЛИНГА возвращающая статус
        const status = Math.random() < 0.5; // Пока берем случайный
        onPayFormClose(frame, status);
      } catch (err) {
        console.error(err);
        onPayFormClose(frame, false);
      }
    });
  };

  const init = async (inputMeta: any) => {
    try {
      const response = await fetch(`${apiURL}/auth`, { // Вместо /auth - будет другой путь.
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta: inputMeta }),
      });

      const json = await response.json();
      onAuthSuccess();
      return json.meta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    init,
    // showPayForm,
  };
};
