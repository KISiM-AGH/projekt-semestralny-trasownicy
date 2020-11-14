import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { Factory1Component } from "./modules/factory1/factory1.component";
import { Factory2Component } from './modules/factory2/factory2.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { CompareComponent } from "./modules/compare/compare.component";
import { PhotosComponent } from "./modules/photos/photos.component";
import { LoginComponent } from "./modules/login/login.component";


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: LoginComponent
  }, {
    path: "login",
    component: LoginComponent
  }, {
    path: 'factory1',
    component: Factory1Component
  }, {
    path: 'factory2',
    component: Factory2Component
  }, {
    path: 'compare',
    component: CompareComponent
  }, {
    path: 'contacts',
    component: ContactsComponent
  }, {
    path: 'photos',
    component: PhotosComponent
  } ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
