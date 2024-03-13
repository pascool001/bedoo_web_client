import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { provideIcons } from '@ng-icons/core';
import { heroUsers, heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import { Actions, State } from '../../../services/stores/security';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
      SharedModule
    ],
  providers: [provideIcons({ heroUsers, heroEye, heroEyeSlash })],  
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  // _store1 = inject(SecurityStore)
  _StoreService = inject(State)
  _Actions = inject(Actions)

  authForm: FormGroup = new FormGroup({})

  showSpinner: boolean = false

  connectionError: boolean = false;

  connectionErrorMessage: null|string|undefined

  inputType: string = 'password'

  constructor(private router: Router, private fb: FormBuilder, private injector: Injector) {
    this.initializeLogging()
  }

  initializeLogging(): void {
    effect(() => {
      if (this._StoreService.store().loading) {
        this.showSpinner = true
      } else {
        this.showSpinner = false
      }
      const result = this._StoreService.store().authResult
      if (this._StoreService.store().authenticated) {
        if (result?.status === 200) {
          // console.log('authResult success: ', result)
          this.router.navigate(['/workspace'])
        }
      } else {
        if (result?.status === 401) {
          // console.log('authResult error: ', result)
          this.connectionErrorMessage = result.message
          this.connectionError = true
          this.autoDismissAlert()
        }
      }
      
    }, {injector: this.injector});
  }


 
  changeInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text'
    } else {
      this.inputType = 'password'
    }
  }

  buildForm() {
    this.authForm = this.fb.group({
      email: ['murphi001@gmail.com', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(7), Validators.required]],
    })
  }

  ngOnInit(): void {
    this.buildForm()
  }

  connection() {
    this._Actions.login(this.authForm.value)
  }

  resetPwdRequest() {
    this.router.navigate(['/auth/pwdresetreq'])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  autoDismissAlert() {
    setTimeout(() => { 
      this.connectionError = false
      this._StoreService.store.update(state => {
        state.authResult = null;
        return { ...state };
      });
    }, 4000)
  }

}
