import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LocationService } from './location.service';
import { StorageService } from '../storage/storage.service';
import { Store } from '../stores/store.model';


@Injectable()
export class LocationResolver implements Resolve<any> {    
    
    stores: Store[];
    addresses: string[];
    constructor(private locationService: LocationService, private storageService: StorageService) {
        
    }    

    getListAddresses(stores: Store[]): string[] {
        const addresses = [];
        for (let i = 0; i < stores.length; i++) {
            let temp = stores[i].address;
            temp = temp.replace(' ', '+');
            addresses.push(temp);
        }
        return addresses;
    }

    resolve() {
        this.stores = this.storageService.getStores();        
        this.addresses = this.getListAddresses(this.stores);

        const locations = [];
        this.addresses.forEach((ad, ind) => {
            this.locationService.getLocation(ad).then(res => {
                res.name = this.stores[ind].name;
                res.address = this.stores[ind].address;
                res.timetable = this.stores[ind].mode;
                locations.push(res);
            });
        });
        
        
        return locations;

    }
}