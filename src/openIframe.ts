export default (url: string) => {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.width = '100%';
  iframe.height = '100%';

  document.body.prepend(iframe);
  return iframe;
};
