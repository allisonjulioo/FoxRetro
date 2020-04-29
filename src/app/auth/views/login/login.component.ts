import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { I18nService } from './../../../services/i18n/i18n.service';
import { ToastService } from '../../../services/toasts/toasts.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChildren('password') pass: QueryList<any>;

  submited: Boolean = false;
  loading: Boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  lang: 'en'

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router,
    private toast: ToastService,
    public i18n: I18nService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['allison.julio@sympla.com.br', [Validators.required, Validators.email]],
      password: ['121212julio', [Validators.required, Validators.minLength(6)]]
    });

  }
  get a() { return this.loginForm.controls; }

  public auth() {
    this.loading = this.submited = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.authService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(data => {
        this.logged(data)
      },
        error => {
          const pass = this.loginForm.controls['password'];
          pass.setErrors({ 'incorrect': true })
          this.pass.last.nativeElement.focus();
          this.pass.last.nativeElement.value = '';
          this.toast.show('Login ou senha incorretos', {
            delay: 2500,
            autohide: true,
            type: 'error'
          })
          this.loading = false;
        });

  }
  public logged(res) {
    const { user_id, token } = res;
    this.loading = false;
    this.cookie.set('utok', token, 3600)
    this.cookie.set('uid', user_id, 3600)
    this.router.navigate(['/main/boards'])
  }

  public facebookAuth() {
    window.open("https://www.facebook.com", "_blank", "toolbar=no,scrollbars=yes,resizable=no,top=500,left=500,width=400,height=400");
  }

}
