import { Component, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseService } from 'src/app/core/services/database/firebase.service';
import { UserBill } from 'src/app/models/bill';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private auth: Auth = this.authService.auth;
  user$ = authState(this.auth).pipe(
    filter((user) => user !== null),
    map((user) => user!)
  );
  users$!: Observable<UserBill[]>;
  userDb!: UserBill;
  private firebaseService = inject(FirebaseService);

  userSubscription!: Subscription;
  isAuth: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.users$ = this.firebaseService.getAll$();
    this.users$.subscribe((users) => console.log(users));
    this.getDisplayUser();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getDisplayUser() {
    return combineLatest([this.user$, this.users$]).pipe(
      map(([user, users]) => {
        return users.forEach((userDb) => {
          if(userDb === undefined && user.email !== null) {
            this.userDb.name = user.email
          }
          if (user.uid === userDb.uid) {
            this.userDb.name = userDb.name;
          }
          console.log(this.userDb.name);
        });
      })
    );
  }
  singOut() {
    this.authService.signOut(this.auth);
  }
}
