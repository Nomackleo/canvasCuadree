import { Component, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private auth: Auth = this.authService.auth;
  user$ = authState(this.auth);

  userSubscription!: Subscription;
  isAuth: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  singOut() {
    this.authService
      .signOut(this.auth)
  }
}
