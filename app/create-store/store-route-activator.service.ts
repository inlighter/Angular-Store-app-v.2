import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class StoreRouteActivator implements CanActivate {
    constructor(private storageService: StorageService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot) {
        const storeExists = !!this.storageService.getStoreById(+route.params['id']);
        if (!storeExists) {
            this.router.navigate(['/404']);
        }
        return storeExists;
    }
}
