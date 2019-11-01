import qilinGameProxy from './qilinGameProxy';

if (!window) throw new Error('SDK only work on web browser');

(window as any).qilinGameProxy = qilinGameProxy;
