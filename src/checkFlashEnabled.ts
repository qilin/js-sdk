const flashPluginKey = 'Shockwave Flash';

export default () => {
  try {
    const flashObjectIE = new (window as any).ActiveXObject('ShockwaveFlash.ShockwaveFlash');
    if (flashObjectIE) return true;
  } catch (e) {
    return !!navigator.plugins && typeof navigator.plugins[flashPluginKey as any] === 'object';
  }
  return false;
};
