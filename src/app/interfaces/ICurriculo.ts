import {IEmpresa} from "./IEmpresa";

export interface ICurriculo {
    id: string,
    area: string,
    cargo: string,
    resposabilidades: string,
    requisitos: string,
    pcsc: string,
    remoto: boolean,
    local: string,
    carga_horaria: string,
    faixa_salarial: string,
    data_cadastro: Date,
    resumo: string,
    data_fechamento: Date,
    tipo_contrato: string,
    contratacao: string,
    empresa: string,
    empresaItem: IEmpresa;
}
