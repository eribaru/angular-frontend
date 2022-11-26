import {IEmpresa} from "./IEmpresa";

export interface IExperiencia {
  id: string;
  area: string;
  cargo: string;
  inicio: Date;
  fim: Date;
  atual: string;
  empresa: string;
  empresaItem: IEmpresa;
  curriculo:string;
}
