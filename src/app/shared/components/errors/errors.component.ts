import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ErrorMessage } from 'src/app/models/error-message';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
})
export class ErrorsComponent {
  @Input() message!: ErrorMessage;
  @Input() isMessage: boolean = false;
  @Input() isError: boolean = false;
  @Input() isSuccess: boolean = false;

  @ViewChild('alert', { static: false }) alertMessage!: ElementRef;
}
