import qilinHub from './qilinHub';

if (!window) throw new Error('SDK only work on web browser');

(window as any).qilinHub = qilinHub;
