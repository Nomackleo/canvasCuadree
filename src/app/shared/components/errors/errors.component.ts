import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FirebaseCodeErrorService } from 'src/app/core/services/auth/firebase-code-error.service';
import { ErrorMessage } from 'src/app/models/error-message';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit, AfterViewInit {
  @Input() message!: ErrorMessage;
  @Input() isMessage: boolean = false
  @Input() isError: boolean = false
  @Input() isSuccess: boolean = false

  @ViewChild('alert', { static: false }) alertMessage!: ElementRef;

  private renderer = inject(Renderer2);

  private firebaseCodeErrorService = inject(FirebaseCodeErrorService);
  private ngUnsubscribe = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.firebaseCodeErrorService.message$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((message) => (this.message = message));
  }

  ngAfterViewInit(): void {
    // this.firebaseCodeErrorService.class$.subscribe((className) => {
    //   this.renderer.addClass(this.alertMessage.nativeElement, className);
    //   this.renderer.addClass(this.alertMessage.nativeElement, 'show');
    // });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.unsubscribe();
  }
}
