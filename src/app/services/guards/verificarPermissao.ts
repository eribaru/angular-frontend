
import { UsuarioService } from "../usuario.service";

export class VerificarPermissoes{

    public static temPerfilRecrutador():boolean{
      return UsuarioService.obterUsuarioLogado!.tipo==='recrutador';
    }
    public static temPerfilCanditado():boolean{
      console.log("temPerfilRecrutador "+UsuarioService.obterUsuarioLogado!.tipo==='candidato')
        return UsuarioService.obterUsuarioLogado!.tipo==='candidato';
    }
}


