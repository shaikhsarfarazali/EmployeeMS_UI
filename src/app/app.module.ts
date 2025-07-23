import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: ['localhost:7052'],
                disallowedRoutes: ['localhost:7052/api/auth/login']
            }
        })
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }