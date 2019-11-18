import { AuthFunctionProps } from './types';
import logError from './logError';

export default (apiURL: string) => async (props: AuthFunctionProps) => {
  try {
    const response = await fetch(`${apiURL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props),
    });

    const json = await response.json();
    return json.meta;
  } catch (error) {
    logError(error);
  }
};
