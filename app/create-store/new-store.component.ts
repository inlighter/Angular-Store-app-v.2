 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute } from '@angular/router';
 import { Router } from '@angular/router';

 import { StorageService } from '../storage/storage.service';
 import { Store } from '../stores/store.model';
 import { Product } from '../stores/product.model';

 @Component({
     templateUrl: './new-store.component.html',
     styleUrls: ['./new-store.component.css']
 })

 export class NewStoreComponent implements OnInit {
     currentStore: Store = {
                id: 0,
                name: '',
                address: '',
                mode: '',
                products: [
                    {
                        name: '',
                        description: ''
                    }
                ]
            }
    

     activeMode = true;
     productName: string;
     productDescription: string;
     

     constructor(private router: Router, private storageService: StorageService, private route: ActivatedRoute) {

     }

     ngOnInit() {
        const id: number = +this.route.snapshot.params['id'];
        if (id) {
            this.currentStore = this.storageService.getStoreById(id);
            this.activeMode = false;
        }
     }

     save(): void {
        if (this.currentStore.name.trim() && this.currentStore.address.trim()) {
            const maxStoreId = this.storageService.getMaxStoreId();
            if (!this.storageService.isStoreExist(this.currentStore)) {

                this.currentStore.id = maxStoreId + 1;                       
                this.storageService.addStore(this.currentStore);
                
                
            } else {
                this.storageService.replaceStore(this.currentStore); 
            }
            
            this.activeMode = !this.activeMode;
        }
        
         
     }
     

     addProduct(): void {
         const isDuplicate = !!this.currentStore.products.find(val => val.name === this.productName);
         
         if (!isDuplicate) {
            if (this.productName.trim() && this.productDescription.trim()) {
                this.currentStore.products.unshift({
                name: this.productName,
                description: this.productDescription
            });
            } 
        } else {
            const productIndex = this.currentStore.products.map(val => val.name).indexOf(this.productName);
            this.currentStore.products[productIndex].description = this.productDescription;
            this.storageService.replaceStore(this.currentStore);
            
        } 
        this.productDescription = undefined;
        this.productName = undefined;
     }

     removeProduct(product: Product): void {
        
        this.currentStore.products = this.currentStore.products.filter(prod => prod.name !== product.name);
        this.storageService.replaceStore(this.currentStore);
        this.productDescription = undefined;
        this.productName = undefined;
     }

     editProduct(product: Product): void {
        this.productName = product.name;
        this.productDescription = product.description;
     }

     editStore(): void {
        this.activeMode = !this.activeMode;
     }

     deleteStore(store: Store): void {
        this.storageService.removeStore(store);
        this.currentStore =  {
                id: 0,
                name: '',
                address: '',
                mode: '',
                products: [{
                    name: '',
                    description: ''
                }]

            }
        this.activeMode = !this.activeMode;
     
    
    }
        

 }