import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match',
};

@Component({
  selector: 'app-input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css',
})
export class InputValidationComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  errorMessages: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onCheckValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.onCheckValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.onCheckValidation();
    });
  }

  onCheckValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
  }
}
