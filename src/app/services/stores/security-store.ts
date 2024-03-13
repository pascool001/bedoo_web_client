import { Injectable, inject, signal } from "@angular/core";
import { ActivationData, RegisterData, ResetPwdData, ResetPwdReqData, SecuStoreType, authData } from "../models/security";
import { SecurityApi } from "../backend/httpRequests/securityApi";


const initialStoreState: SecuStoreType = {
    loading: false,
    authenticated:false,
    authResult: undefined,
    currentUser: undefined,
    reqResetResult:undefined,
    resetResult: undefined,
    registeredResult: undefined,
    activatedResult: undefined,
};


@Injectable({
  providedIn: "root"
})
export class SecurityStore {

    security = inject(SecurityApi)

    store = signal<SecuStoreType>(initialStoreState);

    constructor(){
      console.log('security store on constuction authenticated :', this.store().authenticated)
    }

      login(data: authData) {
        this.enableLoading()
        this.security.login(data).then(resp => {
          this.store.update( (state) => {
            state.authenticated = true
            state.authResult = resp.data
            return { ...state }
          })
          const {data} = resp.data
          localStorage.setItem('accessToken', data.accessToken)
          this.disableLoading()
          
        }).catch(err => {
          this.store.update( (state) => {
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
          this.store.update((state) => {
            state.currentUser = resp.data
            return {...state}
          })
        } )
        this.disableLoading()
      }
    
      logout() {
        this.enableLoading()
        this.security.logout().then((resp) => {
          this.store.update( (state) => {
            state.authenticated = false
            state.authResult = undefined
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
          this.store.update( (state) => {
            state.reqResetResult = resp.data
            return { ...state }
          })
          this.disableLoading()
        }).catch(err => {
          this.store.update( (state) => {
            state.reqResetResult = err.response.data
            return { ...state }
          })
          this.disableLoading()
        })
      }
    
    
      resetPassword(data:ResetPwdData) {
        this.enableLoading()
        this.security.resetpassword(data).then(resp => {
          this.store.update( (state) => {
            state.resetResult = resp.data
            return { ...state }
          })
          this.disableLoading()
        }).catch(err => {
          this.store.update( (state) => {
            state.resetResult = err.response.data
            return { ...state }
          })
          this.disableLoading()
        })
      }

      register(data:RegisterData) {
        this.enableLoading()
        this.security.register(data).then(resp => {
          this.store.update( (state) => {
            state.registeredResult = resp.data
            return { ...state }
          })
          this.disableLoading()
        }).catch(err => {
          this.store.update( (state) => {
            state.registeredResult = err.response.data
            return { ...state }
          })
          this.disableLoading()
        })
       
      }

      async activate(tokenAndUserId:ActivationData) {
        this.enableLoading()
        this.security.activate(tokenAndUserId).then(resp => {
          this.store.update( (state) => {
            state.activatedResult = resp.data
            return { ...state }
          })
          this.disableLoading()
        }).catch(err => {
          this.store.update( (state) => {
            state.activatedResult = err.response.data
            return { ...state }
          })
          this.disableLoading()
        })
       
      }
    

    private enableLoading() {
        this.store.update(state => {
          state.loading = true;
          return { ...state };
        });
    }

    private disableLoading() {
        this.store.update(state => {
          state.loading = false;
          return { ...state };
        });
    }

}