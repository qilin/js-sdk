import qilinGamenetAdapter from './qilinGamenetAdapter';

if (!window) throw new Error('SDK only work on web browser');

(window as any).qilinGamenetAdapter = qilinGamenetAdapter;
