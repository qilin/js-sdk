/* eslint-disable @typescript-eslint/no-unused-vars */
import qilinStore from './qilinStore';
import qilinGame from './qilinGame';
import { PAYMENT_FORM_CLOSED, FULLSCREEN_MODE_CHANGED } from './constants';

if (!window) throw new Error('SDK only work on web browser');
(window as any).qilinStore = qilinStore;
(window as any).qilinGame = qilinGame;
(window as any).PAYMENT_FORM_CLOSED = PAYMENT_FORM_CLOSED;
(window as any).FULLSCREEN_MODE_CHANGED = FULLSCREEN_MODE_CHANGED;
