
export enum EstadosEnum {
  AC='AC', AL='AL', AP='AP',
  AM='AM', BA='BA', CE='CE',
  DF='DF', ES='ES',
  GO='GO', MA='MA', MT='MT',
  MS='MS', MG='MG',
  PA='PA', PB='PB', PR='PR',
  PE='PE', PI='PI', RJ='RJ',
  RN='RN', RS='RS',
  RO='RO', RR='RR', SC='SC',
  SP='SP', SE='SE', TO='TO'
}

export const EstadosMapping: Record<EstadosEnum, string> = {
  [EstadosEnum.AC]:'Acre',
  [EstadosEnum.AL]:'Alagoas',
  [EstadosEnum.AP]:'Amapá',
  [EstadosEnum.AM]:'Amazonas',
  [EstadosEnum.BA]:'Bahia',
  [EstadosEnum.CE]:'Ceará',
  [EstadosEnum.DF]:'Distrito Federal',
  [EstadosEnum.ES]:'Espírito Santo',
  [EstadosEnum.GO]:'Goiás',
  [EstadosEnum.MA]:'Maranhão',
  [EstadosEnum.MT]:'Mato Grosso',
  [EstadosEnum.MS]:'Mato Grosso do Sul',
  [EstadosEnum.MG]:'Minas Gerais',
  [EstadosEnum.PA]:'Pará',
  [EstadosEnum.PB]:'Paraíba',
  [EstadosEnum.PR]:'Paraná',
  [EstadosEnum.PE]:'Pernambuco',
  [EstadosEnum.PI]:'Piauí',
  [EstadosEnum.RJ]:'Rio de Janeiro',
  [EstadosEnum.RN]:'Rio Grande do Norte',
  [EstadosEnum.RS]:'Rio Grande do Sul',
  [EstadosEnum.RO]:'Rondônia',
  [EstadosEnum.RR]:'Roraima',
  [EstadosEnum.SC]:'Santa Catarina',
  [EstadosEnum.SP]:'São Paulo',
  [EstadosEnum.SE]:'Sergipe',
  [EstadosEnum.TO]:'Tocantins'
};

