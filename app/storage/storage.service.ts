import { Injectable } from '@angular/core';
import { STORES } from '../storage/storage';
import { Store } from '../stores/store.model';
import { Product } from '../stores/product.model';

@Injectable()
export class StorageService {
    stores = STORES;
    constructor() {        
        this.updateStorage();
    }


    updateStorage(): void {        
        sessionStorage.setItem('List of stores', JSON.stringify(this.stores));
    }

    addStore(store: Store): void {        
        this.stores.push(store);       
        this.updateStorage();
        
    }

    isStoreExist(store: Store): boolean {
        return !!this.stores.find(shop => shop.id === store.id);
    }

    removeStore(store: Store): void {
        const storeIndex = this.stores.map(shop => shop.id).indexOf(store.id);
        this.stores = this.stores.filter(shop => shop.id !== store.id);
        for (let i = storeIndex; i < this.stores.length; i++) {            
            this.stores[i].id -= 1;
        }        
        this.updateStorage();       
        
    }

    clearStorage(): Store[] {
        this.stores.length = 0;
        sessionStorage.removeItem('list of stores');
        this.updateStorage();
        return this.stores;
    }

    getStores(): Store[] {
        return this.stores = JSON.parse(sessionStorage.getItem('List of stores')) || [];
    }

    getStoreById(id: number): Store {
        return this.stores.find(val => val.id === id);
    }

    getMaxStoreId(): number {
        if (this.stores.length !== 0) {
            const temp = this.stores.slice();
            temp.sort((a, b) => b.id - a.id);
            return temp[0].id;
        }
        return 0;
    }

    replaceStore(store: Store): void {
        const storeIndex = this.stores.map(val => val.name).indexOf(store.name);
        if (storeIndex !== -1) {
            this.stores[storeIndex] = store;
        }
        this.updateStorage();
    }

    rearrangeStores(indxBefore: number, indxAfter: number, stores: Store[]): Store[] {
        
        if (indxAfter > indxBefore) {
            
            let count = 0;            
            for (let i = indxBefore; i < indxAfter; i++) {                
                stores[i].id -= 1;
                count++;
            }
            stores[indxAfter].id += count; 
        } else if (indxAfter < indxBefore) { 
                        
            let count = 0;
            for (let i = indxAfter + 1; i <= indxBefore; i++) {
                stores[i].id += 1;
                count++;
            }
            stores[indxAfter].id -= count; 
        }

        this.stores = stores;
        this.updateStorage();
        return this.stores;
    }



}
