import { Component, effect, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, State } from '../../../services/stores/security';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-forgotten-pwd',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './forgotten-pwd.component.html',
  styleUrl: './forgotten-pwd.component.css'
})
export class ForgottenPwdComponent {

  _StoreService = inject(State)
  _Actions = inject(Actions)

  pwdReqForm: FormGroup = new FormGroup({})

  requestResponse: any = null;

  loading: boolean = false

  constructor(private router: Router, private fb: FormBuilder) {
    effect( () => {
      if (this._StoreService.store().loading) {
        this.loading = this._StoreService.store().loading
      } else {
        this.loading = this._StoreService.store().loading
      }
      if (this._StoreService.store().reqResetResult) {
        this.requestResponse = this._StoreService.store().reqResetResult
        if (this.requestResponse.status === 200) {
          this.autoDismissAlert()
        }
      }
    } )
  }

  autoDismissAlert() {
    setTimeout(() => { 
      this._StoreService.store.update(state => {
        state.reqResetResult = null;
        return { ...state };
      });
      this.requestResponse = null;
      this.router.navigate(['/security/auth'])
    }, 5000)
  }


  buildForm() {
    this.pwdReqForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    })
  }

  ngOnInit(): void {
    this.buildForm()
  }

  async Valider() {
    await this._Actions.pwdForgotten(this.pwdReqForm.value) 
  }

  get f(): { [key: string]: AbstractControl } {
    return this.pwdReqForm.controls;
  }
 
}
