import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {UsuarioService} from "./services/usuario.service";
import {EventBusService} from "./services/event-bus.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Erijobs';

  eventBusSub?: Subscription;

  constructor(

    private usuarioService: UsuarioService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    // ...

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.usuarioService.deslogar();
  }

}
