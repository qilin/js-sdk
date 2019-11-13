import qilinProxy from './qilinProxy';

if (!window) throw new Error('SDK only work on web browser');

(window as any).qilinProxy = qilinProxy;
