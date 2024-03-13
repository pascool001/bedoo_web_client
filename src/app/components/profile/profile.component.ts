import { Component, effect, inject } from '@angular/core';
// import { SecurityStore } from '../../services/stores/security-store';
import { Router, RouterModule } from '@angular/router';
import { Actions, State } from '../../services/stores/security';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  _StoreService = inject(State)
  _Actions = inject(Actions)
  
  constructor(private router: Router) {
    effect( () => {
      if (!this._StoreService.store().authenticated) {
        this.router.navigate(['/security/auth'])
      }
    })

  }

  disconnect() {
    this._Actions.logout();
  }
}
