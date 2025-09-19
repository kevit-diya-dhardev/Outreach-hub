import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { SnackbarService } from '../../snackbar/snackbar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService:SnackbarService
  ) {}
  userData: any;
  submitted = false;
  valid = true;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  sendFormData() {
    this.userData = this.loginForm.value;
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('Invalid form');
      return;
    }
    const user: User = {
      email: this.userData.email!,
      password: this.userData.password!,
    };
    this.authService.sendLoginData(user).subscribe({
      next: async (response: any) => {
        localStorage.setItem('token', response.token);
        this.snackbarService.show('logged in successfully','success')
        this.router.navigate(['dashboard']);
      },
      error: (error: any) => {
        this.valid = false;this.snackbarService.show(error.error.message,'error')
        console.log(error);
      },
    });
  }
}
