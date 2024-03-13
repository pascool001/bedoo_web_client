import { Component, OnInit, effect, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import { Actions, State } from '../../../services/stores/security';
import { SharedModule } from '../../../shared/shared.module';
import Validation from '../reset-pwd/pwds_matches';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule
  ],
  providers: [provideIcons({ heroEye, heroEyeSlash })],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup = new FormGroup({})

  inputType: string = 'password'

  loading: boolean = false

  requestResponse: any = undefined;

  _StoreService = inject(State)
  _Actions = inject(Actions)

  constructor(private fb: FormBuilder, private router: Router) {
    effect( () => {
      if (this._StoreService.store().loading) {
        this.loading = this._StoreService.store().loading
      } else {
        this.loading = this._StoreService.store().loading
      }
      if (this._StoreService.store().registeredResult) {
        this.requestResponse = this._StoreService.store().registeredResult
        if (this.requestResponse.status === 200) {
          this.autoDismissAlert()
        }
      }
    } )
  }

  register() {
    const {confirmPwd, ...data} = this.registerForm.value
    this._Actions.register(data)
  }

  
  buildForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.minLength(5), Validators.required]],
      phone_number: ['', [Validators.minLength(10), Validators.required]],
      user_type: ['WEB', [Validators.maxLength(3), Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(7), Validators.required]],
      confirmPwd: ['', [Validators.minLength(7), Validators.required]],
    }, {
      validators: [Validation.match('password', 'confirmPwd')]
    })
  }

  ngOnInit(): void {
    this.buildForm()
  }

  changeInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text'
    } else {
      this.inputType = 'password'
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  autoDismissAlert() {
    setTimeout(() => { 
      this._StoreService.store.update(state => {
        state.registeredResult = null;
        return { ...state };
      });
      this.requestResponse = null;
      this.router.navigate(['/security/auth'])
    }, 10000)
  }


}
