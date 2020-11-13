import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { ContactsComponent } from 'src/app/modules/contacts/contacts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { Factory1Component } from "../../modules/factory1/factory1.component";
import { Factory2Component } from 'src/app/modules/factory2/factory2.component';
import { PhotosComponent } from "../../modules/photos/photos.component";
import { CompareComponent } from "../../modules/compare/compare.component";
import {LoginComponent} from "../../modules/login/login.component";

@NgModule({
  declarations: [
    DefaultComponent,
    LoginComponent,
    Factory1Component,
    Factory2Component,
    CompareComponent,
    PhotosComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
