import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// Routes
import { APP_ROUTES } from './app.routes';

//Servicios
import { ServiceModule } from './service/service.module';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTES,
    // PagesModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ServiceModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
