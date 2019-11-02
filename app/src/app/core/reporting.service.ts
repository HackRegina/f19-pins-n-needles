import { Injectable } from '@angular/core';
import { Observable, forkJoin, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private available = false;
  private position: Position;

  constructor(private http: HttpClient) { }

  queryPermissions(): Observable<'granted' | 'denied' | 'prompt'> {
    return new Observable((observer) => {
      from(navigator.permissions.query({name: 'geolocation'})).subscribe((geolocation) => {
        this.available = geolocation.state === 'granted' && 'geolocation' in navigator;
        if (this.available) {
          observer.next('granted');
          observer.complete();
        } else if (geolocation.state === 'denied') {
          observer.next('denied');
          observer.complete();
        } else if (geolocation.state === 'prompt') {
          observer.next('prompt');
          observer.complete();
        } else {
          observer.error();
          observer.complete();
        }
      }, () => {
        observer.error();
        observer.complete();
      });
    });
  }

  requestPermissions(): Observable<boolean> {
    return new Observable((observer) => {
      forkJoin([
        new Observable<Position>((o) => {
          navigator.geolocation.getCurrentPosition((pos: Position) => {
            o.next(pos);
            o.complete();
          }, () => {
            o.error(null);
            o.complete();
          });
        }),
      ]).subscribe(([geolocation]) => {
        this.position = geolocation;
        observer.next(true);
        observer.complete();
      }, () => {
        observer.error(false);
        observer.complete();
      });
    });
  }

  submit(image: any) {
    return new Observable<any>((observer) => {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.http.post(`${environment.baseUrl}/api/v1/reportings`, {
          position: {latitude, longitude},
          image
        }).subscribe((resp) => {
          observer.next(resp);
          observer.complete();
        }, () => {
          observer.error(null);
          observer.complete();
        });
      }, () => {
        observer.error(null);
        observer.complete();
      });
    });
  }
}
