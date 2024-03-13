import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ProfileComponent,
    RouterOutlet, 
    RouterModule,
    HeaderComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
