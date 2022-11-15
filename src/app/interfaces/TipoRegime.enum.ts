export enum TipoRegimeEnum {
  clt= "clt" ,
  pj = "pj"
}

export const TipoRegimeMapping: Record<TipoRegimeEnum, string> = {
    [TipoRegimeEnum.clt]: "CLT",
    [TipoRegimeEnum.pj]: "PJ",

};
