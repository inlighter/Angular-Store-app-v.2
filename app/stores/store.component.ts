import { Component, Input } from '@angular/core';
import { Store } from './store.model';

@Component({
    selector: 'single-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css']
})

export class StoreComponent {
    @Input() store: Store;
    

}


