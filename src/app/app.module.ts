import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// Routes
import { APP_ROUTES } from './app.routes';

// Modules
import { PagesModule } from './pages/pages.module';
//Servicios
import { ServiceModule } from './service/service.module';

//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ServiceModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
