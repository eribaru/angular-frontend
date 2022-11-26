import {IEmpresa} from "./IEmpresa";

export interface IFormacao {
    id: string;
  area: string;
  nivel: string;
  inicio: Date,
  previsao_termino: Date;
  em_andamento:boolean;
  instituicao:string;
  curriculo:string;

}
