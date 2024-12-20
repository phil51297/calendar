import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventItemComponent } from './components/event-item/event-item.component';
import { CustomDatePipe } from './shared/pipes/custom-date.pipe';
import { HighlightDirective } from './shared/directives/highlight.directive';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        CalendarComponent,
        EventFormComponent,
        EventItemComponent,
        CustomDatePipe,
        HighlightDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
