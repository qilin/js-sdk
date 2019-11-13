import { AuthFunctionProps } from 'types';

export default (apiURL: string) => async (props: AuthFunctionProps) => {
  const { meta, url, qilinProductUID } = props;
  const data = { meta, url, qilinProductUID };

  try {
    const response = await fetch(`${apiURL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    return json.meta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
