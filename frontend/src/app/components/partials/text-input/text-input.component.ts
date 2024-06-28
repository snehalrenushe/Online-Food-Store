import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    CommonModule,
    InputContainerComponent,
    FormsModule,
    ReactiveFormsModule,
    InputValidationComponent
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  @Input()
  label!: string;
  @Input()
  type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }
  constructor() {}

  ngOnInit(): void {}
}
