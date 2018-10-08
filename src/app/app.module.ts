import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './componets/home/home.component';

import { HttpModule } from '@angular/http';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './componets/account/login/login.component';
import { routing } from './app.routing';
import { SortColumnComponent } from './shared/columSort/column-sort.component';
import { AuthService } from './commons/service/auth.service';
import { ApiService } from './commons/service/app.service';
import { HavePermission } from './commons/service/have-permission.permission';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SortColumnComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    routing
  ],
  providers: [AuthService,  ApiService, HavePermission],
  bootstrap: [AppComponent]
})
export class AppModule { }



