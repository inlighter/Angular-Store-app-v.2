import { Routes } from '@angular/router';
import { StoreListComponent } from './stores/store-list.component';
import { ProductListComponent } from './products/product-list.component';
import { NewStoreComponent } from './create-store/new-store.component';
import { LocationResolver } from './map/location.resolver';
import { StoreRouteActivator } from './create-store/store-route-activator.service';
import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [

    { path: '', redirectTo: '/stores', pathMatch: 'full' },
    { path: 'stores', component: StoreListComponent, resolve: {locations: LocationResolver} },
    { path: 'products/:id', component: ProductListComponent, canActivate: [StoreRouteActivator] },
    { path: 'create', component: NewStoreComponent },
    { path: 'create/:id', component: NewStoreComponent, canActivate: [StoreRouteActivator] },
    { path: '404', component: Error404Component}
];
