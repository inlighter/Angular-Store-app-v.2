import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { Store } from '../stores/store.model';
import { Product } from '../stores/product.model';


@Component({ 
    
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {    
    
    store: Store;
    id: number;
    products: Product[];
     
    

    constructor(private route: ActivatedRoute, private storageService: StorageService) {

    }
    ngOnInit() {
         
        this.id = +this.route.snapshot.params['id'];
        this.store = this.storageService.getStoreById(this.id);
        this.products = this.store.products;
    }
    
}