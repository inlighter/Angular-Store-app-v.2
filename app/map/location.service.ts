import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {
    get(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = () => {
                if (req.status === 200) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = () => {
                reject(Error('Network Error'));
            };

            req.send();
        });

    }

    getJSON(url: string): Promise<any> {
        return this.get(url).then(JSON.parse).catch(error => {
            console.log('getJSON failed for', url, error);
            throw error;
        });
    }

    getLocation(address: string): Promise<any> {
        
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDEQQ-iBRSfcY3YMO3Tshs0lwUr08G45Bo';
        
        return this.getJSON(url).then(loc => {
            if (loc.results[0]) {
                return loc.results[0].geometry.location;
            }
            return {};
        });
    }

}
