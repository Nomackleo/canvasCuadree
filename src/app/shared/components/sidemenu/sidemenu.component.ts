import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  private authService = inject(AuthService);
  private auth: Auth = this.authService.auth;
  private router: Router = inject(Router)

  user$ = this.authService.user$;
  constructor() {}

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut(this.auth);
  }
}
