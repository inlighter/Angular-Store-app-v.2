import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Store } from './store.model';
import { ILocation } from '../map/location.model';




 

@Component({ 
    
    template: `
    <div class="row no-gutters">
        <div class="col">
            <app-map [locations]="locations"></app-map>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-md-10">
                <ul class="list-unstyled list-group" [dragula]="'bag-one'" [dragulaModel]="stores">
                    <single-store [id]="store.id" *ngFor="let store of stores" [store]="store"></single-store>
                </ul>
            </div>
            <div class="col-12 text-center">
                <button *ngIf="stores.length" type="button" class="btn btn-danger btn-remove-all" 
                (click)="removeAllStores()">Remove All</button>
            </div>
            <h3 *ngIf="!stores.length">Sorry, there are no stores on the site yet.</h3>
        </div>
        
    </div>
    
    
    `,
    styleUrls: ['./dragula.css', './store-list.component.css']
})

export class StoreListComponent implements OnInit {
     stores: Store[];
     locations: ILocation[];
     draggedElementId: number;
     elIndxBeforeDrop: number;
     
     
     constructor(private storageService: StorageService, private route: ActivatedRoute, private dragulaService: DragulaService) {
        dragulaService.drag.subscribe((value) => {
            this.draggedElementId = +value[1].attributes.id.nodeValue;
            this.elIndxBeforeDrop = this.stores.map(shop => shop.id).indexOf(this.draggedElementId); 
            
        });
        
        dragulaService.dropModel.subscribe(() => {
            this.onDropModel();
            
        });
     }

     ngOnInit() {
         this.stores = this.storageService.getStores();                
         this.locations = this.route.snapshot.data['locations'];
         
     }

     onDropModel(): void {  
        const storesAfterDrop = this.stores.slice();
        const elIndexAfterDrop = storesAfterDrop.map(shop => shop.id).indexOf(this.draggedElementId);    
        this.stores = this.storageService.rearrangeStores(this.elIndxBeforeDrop, elIndexAfterDrop, storesAfterDrop);
        
     }

     removeAllStores(): void {
        this.stores = this.storageService.clearStorage();
        this.locations = [];
     }

     
}




