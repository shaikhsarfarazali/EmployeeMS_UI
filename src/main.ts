import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { tokenInterceptor } from './app/core/interceptors/token.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appConfig } from './app/app.config';

export function tokenGetter() {
  return localStorage.getItem('token');
}

bootstrapApplication(AppComponent, appConfig
  //   {
  //   providers: [
  //     provideRouter(routes),
  //     provideHttpClient(withInterceptors([tokenInterceptor]),
  //     provideStore(),
  //     provideEffects()
  //     )
  //   ]
  // }
).catch(err => console.error(err));
