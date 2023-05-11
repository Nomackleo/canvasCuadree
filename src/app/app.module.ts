import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CurrencyPipe } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, AuthModule } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PagesModule } from './pages/pages.module';
import { UserPanelModule } from './pages/user-panel/user-panel.module';
import { CounterPipe } from './pipes/counter.pipe';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    UserPanelModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
