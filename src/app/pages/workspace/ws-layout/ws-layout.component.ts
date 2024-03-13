import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';


@Component({
  selector: 'app-ws-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule,
    HeaderComponent
  ],
  templateUrl: './ws-layout.component.html',
  styleUrl: './ws-layout.component.css',
})
export class WsLayoutComponent {

}
