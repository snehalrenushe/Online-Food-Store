import { Component } from '@angular/core';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { InputValidationComponent } from '../../partials/input-validation/input-validation.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    TitleComponent,
    CommonModule,
    RouterModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [UserService],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService
      .login({ email: this.fc.email.value, password: this.fc.password.value })
      .subscribe(() => {
        // this.router.navigate(['/']);
        // window.location.reload();
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
