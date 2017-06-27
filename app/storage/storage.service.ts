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

    updateStorageOnDrop(stores: Store[]): void {        
        this.stores = stores;
        this.updateStorage();
        
    }

    addStore(store: Store): void {
        
        this.stores.push(store);         
        this.updateStorage();
        
    }

    isStoreExist(store: Store): boolean {
        return !!this.stores.find(shop => shop.id === store.id);
    }

    removeStore(store: Store): void {

        this.getStores();
        const storeIndex = this.stores.map(shop => shop.id).indexOf(store.id);
        this.stores = this.stores.filter(shop => shop.id !== store.id);
        console.log(storeIndex, this.stores);
        for (let i = storeIndex; i < this.stores.length; i++) {
            
            this.stores[i].id -= 1;
        }
        
        this.updateStorage();
        
        
    }

    clearStorage(): Store[] {
        this.stores.length = 0;
        sessionStorage.removeItem('list of stores');
        return this.stores;
    }

    getStores(): Store[] {
        return this.stores = JSON.parse(sessionStorage.getItem('List of stores')) || [];
    }

    getStoreById(id: number): Store {
        this.getStores();
        
        return this.stores.find(val => val.id === id);
    }

    getMaxStoreId(): number {
        const temp = this.stores.slice();
        temp.sort((a, b) => b.id - a.id);
        return temp[0].id;
    }

    replaceStore(store: Store): void {
        const storeIndex = this.stores.map(val => val.name).indexOf(store.name);
        if (storeIndex !== -1) {
            this.stores[storeIndex] = store;
        }
        this.updateStorage();
    }

    rearrangeStores(elementIndx: number, siblingIndx: number): Store[] {
        const tempStores = this.stores.slice();
        
        if (siblingIndx === undefined) {
            const storeToMove = tempStores.splice(elementIndx, 1);
            tempStores.push(storeToMove[0]);            
            
            let count = 0;
            const arrLen = tempStores.length;
            for (let i = elementIndx; i < arrLen - 1; i++) {
                
                tempStores[i].id -= 1;
                count++;
            }
            tempStores[tempStores.length-1].id += count; 
        } else if (siblingIndx > elementIndx) {
            let count = 0;
            const storeToMove = tempStores.splice(elementIndx, 1);
            tempStores.splice(siblingIndx-1, 0, storeToMove[0]); 
            for (let i = elementIndx; i < siblingIndx - 1; i++) {
                
                tempStores[i].id -= 1;
                count++;
            }
            tempStores[siblingIndx-1].id += count; 
        } else if (siblingIndx < elementIndx) {
            const storeToMove = tempStores.splice(elementIndx, 1);
            tempStores.splice(siblingIndx, 0, storeToMove[0]);
            let count = 0;
            for (let i = siblingIndx + 1; i <= elementIndx; i++) {
                tempStores[i].id += 1;
                count++;
            }
            tempStores[siblingIndx].id -= count; 
        }
        
        this.stores = tempStores;
        this.updateStorage();
        return this.stores;
    }



}
