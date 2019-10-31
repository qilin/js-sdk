import qilinGameParent from '../src/qilinGameParent';
import { PROXY } from './constants';

export default (apiURL: string) => {
  const proxy = qilinGameParent(PROXY, apiURL);

  console.log(1);
};