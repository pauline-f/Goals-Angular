import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ListComponent } from './goal/list/list.component';
import { AddComponent } from './goal/add/add.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { GoalService } from './services/goal.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'goal/list', canActivate:[AuthGuardService], component: ListComponent },
  { path: 'goal/add', canActivate:[AuthGuardService], component: AddComponent },
  { path: '', redirectTo:'goal/list', pathMatch:'full' },
  { path:'**', redirectTo:'goal/list'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ListComponent,
    AddComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, GoalService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
