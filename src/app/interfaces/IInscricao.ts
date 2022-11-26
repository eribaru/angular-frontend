import {IEmpresa} from "./IEmpresa";

export interface IInscricao {
  id: string;
  feedback: string;
  data_inscricao: Date;
  apto_entrevista: boolean;
  fim: Date;
  vaga: string;
  usuario: string;
  status:string;
}
