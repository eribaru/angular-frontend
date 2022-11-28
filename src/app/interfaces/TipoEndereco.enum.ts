export enum TipoEnderecoEnum {
  residencial= "residencial" ,
  comercial = "comercial"
}

export const TipoEnderecoMapping: Record<TipoEnderecoEnum, string> = {
    [TipoEnderecoEnum.residencial]: "Residencial",
    [TipoEnderecoEnum.comercial]: "Comercial",

};
