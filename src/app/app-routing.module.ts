import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SubjectComponent } from './subject/subject.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { MyComponent } from './my/my.component';
import { PublishComponent } from './publish/publish.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { 
  	path: 'home',
  	component: HomeComponent 
  },
  { 
  	path: 'subject',
  	component: SubjectComponent
  },
  { 
  	path: 'my',
  	component: MyComponent
  },
  { 
  	path: 'publish',
  	component: PublishComponent
  },
  {
  	path: 'detail/:id',
  	component: DetailComponent
  },
  {
  	path: 'edit/:id',
  	component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
