export enum TipoFormacaoEnum {
    MEDIO = "Médio",
    POS = "Especialização",
    SUPERIOR = "Superior",
    MESTRADO = "Mestrado",
    DOUTORADO = "Doutorado"

}

export const TipoFormacaoMapping: Record<TipoFormacaoEnum, string> = {
    [TipoFormacaoEnum.MEDIO]: "médio",
    [TipoFormacaoEnum.POS]: "especialização",
    [TipoFormacaoEnum.SUPERIOR]: "superior",
    [TipoFormacaoEnum.MESTRADO]: "mestrado",
    [TipoFormacaoEnum.DOUTORADO]: "doutorado",

};


