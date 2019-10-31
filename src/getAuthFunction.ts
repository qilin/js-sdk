export default (apiURL: string) => async (meta: any, url: string, qilinProductUUID?: string) => {
  const data: { [key: string]: any } = { meta, url };
  if (qilinProductUUID) {
    data.qilinProductUUID = qilinProductUUID;
  }
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
