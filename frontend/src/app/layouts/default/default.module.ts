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
import { Factory1Component } from '../../modules/factory1/factory1.component';
import { Factory2Component } from 'src/app/modules/factory2/factory2.component';
import { PhotosComponent } from '../../modules/photos/photos.component';
import { CompareComponent } from '../../modules/compare/compare.component';
import {LoginComponent} from '../../modules/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ApiService} from '../../core/api.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../../core/interceptor';
import {NgxCaptchaModule} from "ngx-captcha";

@NgModule({
  declarations: [
    DefaultComponent,
    Factory1Component,
    Factory2Component,
    CompareComponent,
    PhotosComponent,
    ContactsComponent,
    LoginComponent
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
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCaptchaModule
    ],
  // providers: [
  //   DashboardService
  // ]
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}]
})
export class DefaultModule { }
