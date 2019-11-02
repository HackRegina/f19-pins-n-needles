import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CameraComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CameraComponent },
      { path: 'login', component: LoginComponent }
    ])
  ]
})
export class CoreModule { }
