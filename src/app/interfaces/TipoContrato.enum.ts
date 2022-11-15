export enum TipoContratoEnum {
    intermitente = "intermitente",
    indeterminado = "indeterminado",
    determinado = "determinado",
    obra_certa = "obra_certa"
}

export const TipoContratoMapping: Record<TipoContratoEnum, string> = {
    [TipoContratoEnum.intermitente]: "Intermitente",
    [TipoContratoEnum.determinado]: "Determinado",
    [TipoContratoEnum.obra_certa]: "Obra Certa",
    [TipoContratoEnum.indeterminado]: "Indeterminado",
};
