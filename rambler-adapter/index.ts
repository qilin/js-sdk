import ramblerGameProxy from './ramblerGameProxy';

if (!window) throw new Error('SDK only work on web browser');

(window as any).ramblerGameProxy = ramblerGameProxy;
