/* eslint-disable @typescript-eslint/no-unused-vars */
import qilinGameParent from './qilinGameParent';
import qilinGameFrame from './qilinGameFrame';
import { PAYMENT_FORM_CLOSED } from './constants';

if (!window) throw new Error('SDK only work on web browser');
(window as any).qilinGameParent = qilinGameParent;
(window as any).qilinGameFrame = qilinGameFrame;
(window as any).PAYMENT_FORM_CLOSED = PAYMENT_FORM_CLOSED;
