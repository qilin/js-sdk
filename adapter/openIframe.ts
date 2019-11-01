export default (url: string) => {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.minWidth = '100%';
  iframe.style.maxWidth = '100%';
  iframe.style.minHeight = '100%';
  iframe.style.maxHeight = '100%';

  document.body.prepend(iframe);
  return iframe;
};