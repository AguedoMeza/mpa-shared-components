/**
 * Reescribe las ligas productivas al origen actual cuando la app se sirve desde
 * localhost (ambiente de QA local, donde las apps viven bajo http://localhost).
 *
 * Fuera de localhost devuelve la URL intacta, de modo que en produccion el
 * comportamiento es exactamente el de siempre.
 */
export declare const resolverUrlApp: (url?: string) => string;
//# sourceMappingURL=urls.d.ts.map