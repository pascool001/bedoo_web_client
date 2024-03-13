import { Injectable, inject, signal } from "@angular/core";
import { LocalStorageService } from "../../../utilities/local-storage.service";
import { QryResult, User } from "../../models/security";

@Injectable({
    providedIn: "root"
})
export class State {

    private key: string = 'authStore'

    private _localStorageService = inject(LocalStorageService);

    store = signal<StoreType>(initialStoreState);

    constructor() {
        const localStore = this._localStorageService.getItem<StoreType>(this.key);
        if (localStore) this.store.set(localStore);
    }
}


const initialStoreState: StoreType = {
    loading: false,
    authenticated: false,
    authResult: null,
    currentUser: null,
    reqResetResult:null,
    resetResult: null,
    registeredResult: null,
    activatedResult: {status: 0, message: "", data: null },
};

export interface StoreType {
    loading: boolean;
    authenticated: boolean;
    authResult: QryResult | null;
    currentUser: User|null;
    reqResetResult:QryResult | null; 
    resetResult:QryResult | null; 
    registeredResult: QryResult | null;
    activatedResult: QryResult;
}