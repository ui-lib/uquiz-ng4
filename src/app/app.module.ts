import { BrowserModule } from '@angular/platform-browser';
import { Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoolLoadingIndicatorModule } from 'angular2-cool-loading-indicator';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SubjectComponent } from './subject/subject.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { EditorComponent } from './editor/editor.component';
import { MyComponent } from './my/my.component';
import { PublishComponent } from './publish/publish.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SubjectComponent,
        DetailComponent,
        EditComponent,
        EditorComponent,
        MyComponent,
        PublishComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        CoolLoadingIndicatorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
