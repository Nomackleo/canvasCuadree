import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Toast } from 'bootstrap';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-popup-google',
  templateUrl: './popup-google.component.html',
  styleUrls: ['./popup-google.component.css']
})
export class PopupGoogleComponent implements OnInit {
  private authService = inject(AuthService);
  @ViewChild('toast', { static: false }) toast!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {}
  
  ngAfterViewInit(): void {
    const toastElement = this.toast.nativeElement;
    const toastInstance = new Toast(toastElement);
    toastInstance.show();
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  loginGuest() {
    this.authService.loginGuest();
  }
  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }
}
