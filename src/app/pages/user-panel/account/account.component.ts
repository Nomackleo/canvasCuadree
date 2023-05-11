import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  private authService = inject(AuthService);
  user$ = this.authService.user$;

  constructor() {}

  ngOnInit(): void {
    this.user$.subscribe((user) => console.log(user));
  }
}
