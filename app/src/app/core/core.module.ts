import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { GeolocationService } from './geolocation.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CameraComponent, LoginComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'app/:id', component: CameraComponent },
      { path: '**', redirectTo: '/app/' },
    ])
  ],
  providers: [GeolocationService]
})
export class CoreModule { }
