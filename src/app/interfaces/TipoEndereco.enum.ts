export enum TipoEnderecoEnum {
  residencial= "Residencial" ,
  comercial = "Comercial"
}

export const TipoEnderecoMapping: Record<TipoEnderecoEnum, string> = {
    [TipoEnderecoEnum.residencial]: "Residencial",
    [TipoEnderecoEnum.comercial]: "Comercial",

};
