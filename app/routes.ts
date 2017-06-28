import { Routes } from '@angular/router';
import { StoreListComponent } from './stores/store-list.component';
import { ProductListComponent } from './products/product-list.component';
import { NewStoreComponent } from './create-store/new-store.component';
import { LocationResolver } from './map/location.resolver';
import { StoreRouteActivator } from './create-store/store-route-activator.service';
import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [

    { path: '', redirectTo: '/stores', pathMatch: 'full' },
    { path: 'stores', 
        children: [
            {
                path: '', component: StoreListComponent, resolve: {locations: LocationResolver}
            },
            {
                path: '**', redirectTo: '/404' 
            }
        ] },
    { path: 'products',
        children: [
            
            {
                path: ':id', component: ProductListComponent, canActivate: [StoreRouteActivator]
            },
            {
                path: '**', redirectTo: '/404' 
            }
        ] },
    { path: 'create', 
        children: [
            {
                path: '', component: NewStoreComponent
            },
            {
                path: ':id', component: NewStoreComponent, canActivate: [StoreRouteActivator]
            },
            {
                path: '**', redirectTo: '/404'
            }
        ]},
    
    { path: '404', component: Error404Component},
    { path: '**', redirectTo: '/404' }
];
