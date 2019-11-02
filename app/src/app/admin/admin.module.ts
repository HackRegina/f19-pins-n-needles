import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AdminMainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdminMainComponent }
    ])
  ]
})
export class AdminModule { }
