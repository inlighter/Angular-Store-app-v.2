import { Component, Input } from '@angular/core';
import { LocationService } from './location.service';
import { ILocation } from './location.model';

@Component({
    selector: 'app-map', 
    template: `
        <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
            <agm-marker *ngFor="let location of locations" [openInfoWindow]="true" [title]="location.address" 
            [latitude]="location.lat" [longitude]="location.lng">
                <agm-info-window>
                    <h6>{{ location.name }}</h6>
                    <p *ngIf="!!location?.timetable">Time schedule: {{ location?.timetable }}</p>
                </agm-info-window>
            </agm-marker>            
        </agm-map>
    `,
    styles: [`
        agm-map {
            height: 400px;
            margin-bottom: 50px;            
        }
    `]
})

export class DisplayMapComponent {
    
    lat = 39.958;
    lng = -75.166;
    zoom = 12;
    location: ILocation;

    
    @Input() locations: ILocation[];
    constructor(private locationService: LocationService) {

    }

     
      
}
