import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'vamoretro-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss']
})
export class RemindComponent implements OnInit {
  remindForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  isSentCode: boolean;
  isCodeCorrect: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.remindForm = this.fb.group({
      email: ['allison.julio@hotmail.com', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.pattern('[A-Z]{1,2}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }
  get r() { return this.remindForm.controls; }

  public remind() {
    this.loading = true;
    if (this.r.email.errors) {
      this.submitted = true;
      this.loading = false;
      return;
    }
    if (this.isSentCode) {
      this.checkCode();
    } else if (this.isCodeCorrect && !this.isSentCode) {
      this.changeNewPassword();
    } else {
      this.sentRemind();
    }
  }
  private changeNewPassword() {
    this.loading = false;
    if (this.r.confirmPassword.errors) {
      this.submitted = true;
      const password = this.remindForm.controls.password;
      password.setErrors({ incorrect: true });
      return;
    }
  }
  private checkCode() {
    if (this.remindForm.controls.code.value === 1234) {
      console.log('data');
      this.loading = false;
      this.isSentCode = false;
      this.isCodeCorrect = true;
    } else {
      this.loading = false;
      this.submitted = true;
      const code = this.remindForm.controls.code;
      code.setErrors({ incorrect: true });
    }
  }
  private sentRemind() {
    this.authService.remind(this.remindForm.value.email)
      .subscribe(res => {
        if (res.isValid) {
          this.toast.show(res.message, {
            delay: 3000,
            autohide: true,
            type: 'success'
          });
          this.isSentCode = true;
        }

        this.loading = false;
      }, error => {
        const email = this.remindForm.controls.email;
        email.setErrors({ incorrect: true });
        this.toast.show(error, {
          delay: 3000,
          autohide: true,
          type: 'error'
        });
        this.submitted = true;
        this.loading = false;
      });
  }
}
