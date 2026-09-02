const ORIGEN_PRODUCTIVO = 'https://webapplication.mpagroup.mx';

/**
 * Reescribe las ligas productivas al origen actual cuando la app se sirve desde
 * localhost (ambiente de QA local, donde las apps viven bajo http://localhost).
 *
 * Fuera de localhost devuelve la URL intacta, de modo que en produccion el
 * comportamiento es exactamente el de siempre.
 */
export const resolverUrlApp = (url?: string): string => {
  if (!url) return '';

  const esLocal =
    typeof window !== 'undefined' &&
    ['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (!esLocal) return url;

  return url.startsWith(ORIGEN_PRODUCTIVO)
    ? window.location.origin + url.slice(ORIGEN_PRODUCTIVO.length)
    : url;
};
