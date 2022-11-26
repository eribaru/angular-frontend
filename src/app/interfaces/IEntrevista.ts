import {IEmpresa} from "./IEmpresa";

export interface IEntrevista {
  id: string;
  feedback: string;
  data: Date;
  inscricao: Date;
  vaga: string;
  usuario: string;
  status:string;
}
