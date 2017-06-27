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
                <ul class="list-unstyled list-group" [dragula]='"bag-one"' [dragulaModel]='stores'>
                    <single-store [id]="store.id" *ngFor="let store of stores" [store]="store"></single-store>
                </ul>
            </div>
        </div>
        
    </div>
    
    
    `,
    styleUrls: ['./dragula.css']
})

export class StoreListComponent implements OnInit {
     stores: Store[];
     locations: ILocation[];
     
     
     constructor(private storageService: StorageService, private route: ActivatedRoute, private dragulaService: DragulaService) {
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
            
        });
     }

     ngOnInit() {
         this.stores = this.storageService.getStores();
         
         this.locations = this.route.snapshot.data['locations'];
         
     }

     onDrop(args) {    
        const [el, target, source, sibling] = args;        
        const elId = el.attributes.id.nodeValue;         

        const siblingId = sibling !== null ? sibling.attributes.id.nodeValue : undefined;

        this.stores = this.storageService.getStores();
        const arrStoresId = this.stores.map(shop => shop.id);
        const elIndex = arrStoresId.indexOf(+elId);       
          
        const siblingIndex = !!siblingId ? arrStoresId.indexOf(+siblingId) : undefined;

        this.stores = this.storageService.rearrangeStores(elIndex, siblingIndex);
        
     }

     
}




