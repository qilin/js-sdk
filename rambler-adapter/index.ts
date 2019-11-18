import qilinRamblerAdapter from './qilinRamblerAdapter';
import logError from '../src/logError';

if (!window) {
  const error = new Error('SDK only work on web browser');
  logError(error);
  throw error;
}

(window as any).qilinRamblerAdapter = qilinRamblerAdapter;
