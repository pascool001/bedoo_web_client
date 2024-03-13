import { Component, effect, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Validation from './pwds_matches';
import { provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import { Actions, State } from '../../../services/stores/security';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-reset-pwd',
  standalone: true,
  imports: [
    SharedModule
  ],
  providers: [provideIcons({ heroEye, heroEyeSlash })],
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.css'
})
export class ResetPwdComponent {

  resetForm: FormGroup = new FormGroup({});

  // _store = inject(SecurityStore)
  _StoreService = inject(State)
  _Actions = inject(Actions)

  queryparams:any = {} ;

  inputType: string = 'password'

  inputType2: string = 'password'

  loading: boolean = false

  requestResponse: any = undefined;


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {
    effect(() => {
      if (this._StoreService.store().loading) {
        this.loading = this._StoreService.store().loading
      } else {
        this.loading = this._StoreService.store().loading
      }
      if (this._StoreService.store().resetResult) {
        this.requestResponse = this._StoreService.store().resetResult
        if (this.requestResponse.status === 200) {
          this.autoDismissAlert()
        }
      }
    })
  }

  valider() {
    const {id: userId, token} = this.queryparams.params
    const {password} = this.resetForm.value
    this._Actions.resetPassword({ userId, token, password})
  }

  buildresetForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.minLength(7), Validators.required]],
      confirmPassword: ['', [Validators.minLength(7), Validators.required]],
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    })
  }

  changeInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text'
    } else {
      this.inputType = 'password'
    }
  }

  
  changeInputType2() {
    if (this.inputType2 === 'password') {
      this.inputType2 = 'text'
    } else {
      this.inputType2 = 'password'
    }
  }


  ngOnInit(): void {
    this.buildresetForm()
    this.route.queryParamMap.subscribe((params) => {
      this.queryparams = { ...params.keys, ...params };
      // console.log('this.queryparams : ', this.queryparams.params)
    } )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  autoDismissAlert() {
    setTimeout(() => { 
      this._StoreService.store.update(state => {
        state.resetResult = null;
        return { ...state };
      });
      this.requestResponse = null;
      this.router.navigate(['/security/auth'])
    }, 5000)
  }


}
