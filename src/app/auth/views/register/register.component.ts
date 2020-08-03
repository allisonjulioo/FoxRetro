import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { Auth } from 'src/app/services/auth/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  login: boolean;
  submitted: boolean;
  loading: boolean;
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
      name: ['Allison Julio', Validators.required],
      email: ['allison.julio@hotmail.com', [Validators.required, Validators.email]],
      password: ['121212julio', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['121212julio', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get r() { return this.registerForm.controls; }

  public register() {
    this.submitted = this.loading = true;
    if (this.r.email.errors && this.r.password.errors) {
      this.submitted = true;
      this.loading = false;
      return;
    }
    this.authService.register(this.registerForm.value)
      .subscribe(response => {
        if (response.isValid) {
          this.toast.show('Cadastro realizado com sucesso', {
            delay: 3000,
            autohide: true,
            type: 'success'
          });
          this.loginAfterRegister(this.registerForm.value);
        }
        this.loading = false;
      }, (error) => {
        const email = this.registerForm.controls.email;
        email.setErrors({ incorrect: true });
        this.toast.show(error, {
          delay: 5000,
          autohide: true,
          type: 'error'
        });
        this.submitted = true;
        this.loading = false;
      });
  }

  private loginAfterRegister({ email, password }: Auth) {
    this.authService.login({ email, password })
      .pipe(first())
      .subscribe((user) => {
        const { user_id, token } = user;
        this.loading = false;
        this.cookie.set('utok', token, 3600);
        this.cookie.set('uid', user_id, 3600);
        this.router.navigate(['/main/boards']);
      },
        error => { });
  }

}
