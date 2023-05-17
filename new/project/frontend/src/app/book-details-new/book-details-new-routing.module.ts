import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/auth.guard';
import { Location1Component } from './location1/location1.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:'location1/:state',component:Location1Component,canActivate:[AuthGuard]},
  {path:'main-page',component:MainPageComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookDetailsNewRoutingModule { }
