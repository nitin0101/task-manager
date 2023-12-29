import { Component } from '@angular/core';
import { CommonServiceService } from '../../../services/common-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  showSpinner$: Observable<boolean> | undefined;

  constructor(private commonService: CommonServiceService) {}

  ngOnInit() {
    this.showSpinner$ = this.commonService.spinnerSubject$;
  }
}
