import { Injectable, effect, inject } from "@angular/core";
import { SecurityApi } from "../../backend/httpRequests/securityApi";
import { LocalStorageService } from "../../../utilities/local-storage.service";
import { State } from "./state";
import { ActivationData, RegisterData, ResetPwdData, ResetPwdReqData, authData } from "../../models/security";


@Injectable({
    providedIn: "root"
})
export class Actions {
    private key: string = 'authStore'
    security = inject(SecurityApi)
    private _localStorageService = inject(LocalStorageService);
    private _stateService = inject(State);

    constructor() {
        effect(() => {
            console.log('Auth Store content: ', this._stateService.store());
            console.log('activated result : ', this._stateService.store().activatedResult);

            this._localStorageService.setItem(this.key, this._stateService.store());
        });
    }

    login(data: authData) {
        this.enableLoading()
        this.security.login(data).then(resp => {
          this._stateService.store.update( (state) => {
            state.authenticated = true
            state.authResult = resp.data
            return { ...state }
          })
          const {data} = resp.data
          localStorage.setItem('accessToken', data.accessToken)
          this.disableLoading()
          
        }).catch(err => {
          this._stateService.store.update( (state) => {
            state.authenticated = false
            state.authResult = err.response.data
            return { ...state }
          })
          this.disableLoading()
        })
    }

    getMe() {
        this.enableLoading()
        this.security.getMe().then(resp => {
          this._stateService.store.update((state) => {
            state.currentUser = resp.data
            return {...state}
          })
        } )
        this.disableLoading()
    }
    
    logout() {
        this.enableLoading()
        this.security.logout().then((resp) => {
          this._stateService.store.update( (state) => {
            state.authenticated = false
            state.authResult = null
            return { ...state }
          })
          const {data} = resp.data
          localStorage.setItem('accessToken', data.accessToken)
        }).catch(err => {
          console.log('error logout: ', err)
          this.disableLoading()
        })
        this.disableLoading()
    }

    async pwdForgotten(data:ResetPwdReqData) {
        this.enableLoading()
        this.security.pwdForgotten(data).then(resp => {
          this._stateService.store.update( (state) => {
            state.reqResetResult = resp.data
            return { ...state }
          })
          this.disableLoading()
        }).catch(err => {
          this._stateService.store.update( (state) => {
            state.reqResetResult = err.response.data
            return { ...state }
          })
          this.disableLoading()
        })
    }
    
    
    resetPassword(data:ResetPwdData) {
    this.enableLoading()
    this.security.resetpassword(data).then(resp => {
        this._stateService.store.update( (state) => {
            state.resetResult = resp.data
            return { ...state }
        })
        this.disableLoading()
    }).catch(err => {
        this._stateService.store.update( (state) => {
            state.resetResult = err.response.data
            return { ...state }
        })
        this.disableLoading()
    })
    }

    register(data:RegisterData) {
        this.enableLoading()
        this.security.register(data).then(resp => {
            this._stateService.store.update( (state) => {
            state.registeredResult = resp.data
            return { ...state }
        })
        this.disableLoading()
    }).catch(err => {
        this._stateService.store.update( (state) => {
            state.registeredResult = err.response.data
            return { ...state }
        })
        this.disableLoading()
    })
    
    }

    async activate(tokenAndUserId:ActivationData) {
        this.enableLoading()
        this.security.activate(tokenAndUserId).then(resp => {
        this._stateService.store.update( (state) => {
            state.activatedResult = resp.data
            return { ...state }
        })
        this.disableLoading()
    }).catch(err => {
        this._stateService.store.update( (state) => {
            state.activatedResult = err.response.data
            return { ...state }
        })
        this.disableLoading()
    })
    
    }



    private enableLoading() {
        this._stateService.store.update(state => {
          state.loading = true;
          return { ...state };
        });
    }

    private disableLoading() {
        this._stateService.store.update(state => {
          state.loading = false;
          return { ...state };
        });
    }


}