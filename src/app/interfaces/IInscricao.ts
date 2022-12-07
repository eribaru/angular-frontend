import {IEmpresa} from "./IEmpresa";

export interface IInscricao {
  vaga_nome: any;
  feedback: string|null;
  data_inscricao: Date|string|null;
  id: string|null;
  apto_entrevista: boolean|null;
  fim: Date|null;
  vaga: string;
  usuario: string|null;
  status:string;
  status_nome:string;
}
