import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { StorageService } from './storage/storage.service';

import { StoreComponent } from './stores/store.component';
import { StoreListComponent } from './stores/store-list.component';

import { ProductListComponent } from './products/product-list.component';
import { NewStoreComponent } from './create-store/new-store.component';
import { NavBarComponent } from './nav/navbar.component';
import { DisplayMapComponent } from './map/display-map.component';
import { LocationService } from './map/location.service';
import { LocationResolver } from './map/location.resolver';
import { StoreRouteActivator } from './create-store/store-route-activator.service';
import { Error404Component } from './errors/404.component';
import { DragulaModule } from 'ng2-dragula';

import { appRoutes } from './routes';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, 
    StoreComponent, 
    StoreListComponent, 
    ProductListComponent,
    NewStoreComponent,
    NavBarComponent,
    DisplayMapComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDEQQ-iBRSfcY3YMO3Tshs0lwUr08G45Bo'
    }),
    DragulaModule
  ],
  providers: [
    StorageService,
    LocationService,
    LocationResolver,
    StoreRouteActivator
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
