import { Component, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QryResult } from '../../../services/models/security';
import { Actions, State } from '../../../services/stores/security';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent implements OnInit {

  _StoreService = inject(State)

  _actions = inject(Actions)


  queryparams: any = {} ;

  activationResult: QryResult = {status: 0, message: "", data: null }

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
    effect(() =>{
      this.activationResult = this._StoreService.store().activatedResult;
      if (this.activationResult.status === 200) {
        this.autoDismissAlert();
      }
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.queryparams = { ...params.keys, ...params };
      const {id: userId, token} = this.queryparams.params;
      if (userId && token) {
        setTimeout(() => {
          this._actions.activate({userId, token});
         }, 3000)
      }
    } )
  }


  autoDismissAlert() {
    setTimeout(() => { 
      this._StoreService.store.update(state => {
        state.activatedResult = {status: 0, message: "", data: null };
        return { ...state };
      });
      this.activationResult = {status: 0, message: "", data: null };
      this.router.navigate(['/security/auth'])
    }, 5000)
  }


}
