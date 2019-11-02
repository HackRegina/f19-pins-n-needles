import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BootstrapGridService {

  private viewportWidth: number;

  constructor() {
    this.viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    this.resize().subscribe(() => {
      this.viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    });
  }

  isLessThan(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): boolean {
    return this.viewportWidth < this.getSize(size);
  }

  isGreaterThan(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): boolean {
    return this.viewportWidth > this.getSize(size);
  }

  resize(): Observable<any> {
    return new Observable((subscriber) => {
      window.addEventListener('resize', () => {
        subscriber.next();
      }, false);
    });
  }

  private getSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): number {
    const bodyStyles = window.getComputedStyle(document.body);
    return Number(bodyStyles.getPropertyValue(`--breakpoint-${size}`).replace('px', ''));
  }
}
