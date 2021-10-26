import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ListComponent]
})
export class ListModule { }
