import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService, User } from './login.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  submitted = false;
  valid = true;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}
  userData: any;
  loginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { Validators }
  );

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
      return;
    }
    const user: User = {
      email: this.userData.email!,
      password: this.userData.password!,
    };
    this.loginService.sendLoginData(user).subscribe({
      next: async (response: any) => {
        localStorage.setItem('token', response.token);

        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.valid = false;
      },
    });
  }
}
