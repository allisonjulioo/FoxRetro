import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  login: Boolean = true;
  submited: Boolean = false;
  loading: Boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get r() { return this.registerForm.controls; }

  public register() {
    this.submited = true;
    if (this.r.email.errors && this.r.password.errors) {
      return;
    }
  }

}
