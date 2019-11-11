import gamenetGameProxy from './gamenetGameProxy';

if (!window) throw new Error('SDK only work on web browser');

(window as any).gamenetGameProxy = gamenetGameProxy;
