/**
 * Convierte una liga absoluta al dominio productivo en una ruta relativa.
 *
 * Todas las apps viven bajo el mismo origen (IIS las publica por ruta), asi que
 * "https://webapplication.mpagroup.mx/aml/" y "/aml/" apuntan al mismo lugar en
 * produccion. Dejar la ruta relativa hace que la misma liga funcione tambien en
 * localhost, por IP o por nombre de maquina, sin resolver hostnames.
 */
export declare const resolverUrlApp: (url?: string) => string;
//# sourceMappingURL=urls.d.ts.map