import { MapsAPILoader } from '@agm/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private state: 'granted' | 'denied' | 'prompt';
  private available = true;

  constructor(private mapsAPILoader: MapsAPILoader) {
    if ('geolocation' in navigator) {
      navigator.permissions.query({name: 'geolocation'}).then((result) => {
        this.state = result.state;
      }, () => {
        this.available = false;
      });
    } else {
      this.available = false;
    }
  }

  getCurrentGeolocation(type?: string): Observable<google.maps.GeocoderResult> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.getPlaceByLocation(latitude, longitude, type).subscribe((res) => {
            observer.next(res);
            observer.complete();
          }, (error) => {
            observer.error(error);
            observer.complete();
          });
        }, (error) => {
          observer.error(error);
          observer.complete();
        });
        // If they don't answer the request for location
        setTimeout(() => {
          observer.error();
        }, 5000);
      } else {
        observer.error();
        observer.complete();
      }
    });
  }

  getPlaceByLocation(latitude: number, longitude: number, type?: string): Observable<google.maps.GeocoderResult> {
    return new Observable((observer) => {
      this.mapsAPILoader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        const location = new google.maps.LatLng(latitude, longitude);
        geocoder.geocode({
          location,
          region: 'CA'
        }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results.length > 0) {
              const res = results.find(r =>
                !!r.formatted_address &&
                (type === 'address' || r.types.some(t => t === 'locality' || t === 'administrative_area_level_3'))
              );
              observer.next(res);
              observer.complete();
            } else {
              observer.error();
              observer.complete();
            }
          } else {
            observer.error();
            observer.complete();
          }
        });
      });
    });
  }

  hasGeolocation(): boolean {
    return this.available;
  }

  isDenied(): boolean {
    return this.state === 'denied';
  }

}
