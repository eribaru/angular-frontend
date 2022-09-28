import { IUsuario } from "./IUsuario";

export interface ILogin {
    expiry: Date;
    token: string;
    user: IUsuario;
}