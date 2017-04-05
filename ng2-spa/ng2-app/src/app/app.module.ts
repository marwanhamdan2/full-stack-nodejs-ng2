/**
 * Import the Application modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

/**
 * For routing
 */
import {RouterModule, Routes} from '@angular/router';
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import {LoggedInGuard} from './Guards/loggedIn.guard';
import {AUTH_PROVIDERS} from './Services/Auth/auth.service'

/**
 * Import the application components
 */

//the root components, app bootstrap from here
//its the top of the tree (the top of the app DOM)
//its the top defined in index.html
//it calls other components (parent, root of any other) 
import {RootComponent} from './Components/Root/root';
import { PostComponent } from './Components/post/post.component';
import { NamesComponent } from './Components/Names/names.component';
import { DepartmentComponent } from './Components/department/department.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { PhotoComponent } from './Components/photo/photo.component';



/**
 * Define the app routes
 */


const routes: Routes = [
  {
    path: '',
    redirectTo: 'names',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'names',
    component: NamesComponent,
    //proteced, even if its accessed though route, it cant be accessed
    canActivate: [LoggedInGuard]
  },
  {
    path: 'posts',
    component: PostComponent
  },
  {
    path: 'photos',
    component: PhotoComponent
  },
  {
    path: 'departments/:id',
    component: DepartmentComponent
  }
];


/**
 * Module annotation
 */
@NgModule({
  /**
   * Declare the components
   */
  declarations: [
    RootComponent,
    PostComponent,
    NamesComponent,
    DepartmentComponent,
    EmployeeComponent,
    LoginComponent,
    RegisterComponent,
    PhotoComponent
  ],

  /**
   * Import the modules
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],

  /**
   * Define the providers
   * for dep. injection
   */
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard,
    {provide: APP_BASE_HREF, useValue: '/'},
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],

  /**
   * Define the bootstrap component
   */
  bootstrap: [RootComponent]
})

export class AppModule { }