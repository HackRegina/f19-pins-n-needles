import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  view: 'welcome' | 'camera' | 'permission' | 'error' | 'thanks' = 'welcome';
  picture: File;
  pictureUrl: string;
  subscription: Subscription = Subscription.EMPTY;

  constructor(private reportingService: ReportingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.view = params.get('id') as 'welcome' | 'camera' | 'permission' | 'error';
        this.removePhoto()
      } else {
        this.view = 'welcome';
      }
    });
  }

  queryPermissions() {
    this.reportingService.queryPermissions().subscribe((state: 'granted' | 'denied' | 'prompt') => {
      switch (state) {
        case 'granted':
          this.router.navigate(['/app', 'camera']);
          break;
        case 'denied':
          this.router.navigate(['/app', 'error']);
          break;
        case 'prompt':
          this.router.navigate(['/app', 'permission']);
          break;
      }
    }, () => {
      this.router.navigate(['/app', 'error']);
    });
  }

  requestPermissions() {
    this.reportingService.requestPermissions().subscribe(() => {
      this.router.navigate(['/app', 'camera']);
    }, () => {
      this.queryPermissions();
    });
  }

  handleFileInput(files: FileList) {
    this.picture = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.picture);
    reader.onload = (e) => {
      const validType = (/image\/(jpg|jpeg|png)$/i).test(this.picture.type);
      this.pictureUrl = validType ? (e.target as any).result : '';
    };
  }

  removePhoto() {
    this.picture = null;
    this.pictureUrl = null;
  }

  submit() {
    this.subscription = this.reportingService.submit({
      ...this.picture,
      value: this.pictureUrl.split(',').pop()
    }).subscribe(() => {
      this.router.navigate(['/app', 'camera']);
    }, () => {
      this.router.navigate(['/app', 'error']);
    });
  }

}
