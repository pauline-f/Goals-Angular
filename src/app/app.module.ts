import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ListComponent } from './goal/list/list.component';
import { AddComponent } from './goal/add/add.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './services/user.service';
import { GoalService } from './services/goal.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './goal/view/view.component';
import { AddActionComponent } from './action/add-action/add-action.component';

const appRoutes: Routes = [
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'goal/list', canActivate:[AuthGuardService], component: ListComponent },
  { path: 'goal/add', canActivate:[AuthGuardService], component: AddComponent },
  { path: 'goal/view/:id', canActivate:[AuthGuardService], component: ViewComponent },
  { path: 'action/add/:id', canActivate:[AuthGuardService], component: AddActionComponent },
  { path: '', redirectTo:'goal/list', pathMatch:'full' },
  { path:'**', redirectTo:'goal/list'}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListComponent,
    AddComponent,
    HeaderComponent,
    ViewComponent,
    AddActionComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, GoalService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
