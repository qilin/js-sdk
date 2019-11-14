import qilinRamblerAdapter from './qilinRamblerAdapter';

if (!window) throw new Error('SDK only work on web browser');

(window as any).qilinRamblerAdapter = qilinRamblerAdapter;
