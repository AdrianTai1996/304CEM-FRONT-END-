import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  }
];

@NgModule({
  declarations: [SigninComponent],
  entryComponents: [SigninComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class SigninModule { }
