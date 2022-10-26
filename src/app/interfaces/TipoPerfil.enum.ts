export enum TipoPerfilEnum {
    CANDIDATO = "candidato",
    RECRUTADOR = "recrutador"
}

export const TipoPerfilMapping: Record<TipoPerfilEnum, string> = {
    [TipoPerfilEnum.CANDIDATO]: "candidato",
    [TipoPerfilEnum.RECRUTADOR]: "recrutador",

};