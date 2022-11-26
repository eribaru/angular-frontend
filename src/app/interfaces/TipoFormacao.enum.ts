export enum TipoFormacaoEnum {
  medio = "Médio",
  especializacao = "Especialização",
  superior = "Superior",
  mestrado = "Mestrado",
  doutorado = "Doutorado"

}

export const TipoFormacaoMapping: Record<TipoFormacaoEnum, string> = {
    [TipoFormacaoEnum.medio]: "Médio",
    [TipoFormacaoEnum.especializacao]: "Especialização",
    [TipoFormacaoEnum.superior]: "Superior",
    [TipoFormacaoEnum.mestrado]: "Mestrado",
    [TipoFormacaoEnum.doutorado]: "Doutorado",

};


