import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'vamoretro-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss']
})
export class RemindComponent implements OnInit {
  remindForm: FormGroup;
  submited: Boolean;
  loading: Boolean;

  constructor(
    private fb: FormBuilder, ) { }

  ngOnInit(): void {
    this.remindForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get r() { return this.remindForm.controls; }

  public remind() {
    this.submited = true;
    if (this.r.email.errors) { 
      return;
    }
    this.loading = true;
    console.log(this.remindForm.value);

  }

}
