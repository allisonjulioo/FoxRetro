import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardsService } from 'src/app/services/boards/boards.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { I18nService } from './../../../services/i18n/i18n.service';

@Component({
  selector: 'moda-new-word',
  templateUrl: './moda-new-word.component.html',
  styleUrls: ['./moda-new-word.component.scss']
})
export class ModaNewWordComponent implements OnInit {
  wordForm: FormGroup;
  loading: Boolean = false;
  submited: Boolean = false;
  get a() { return this.wordForm.controls; }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public boardService: BoardsService,
    public i18n: I18nService,
    public toast: ToastService) {
  }

  ngOnInit(): void {
    this.wordForm = this.fb.group({
      key: ['', [Validators.required, Validators.minLength(3)]],
      pt: ['', [Validators.required, Validators.minLength(3)]],
      en: ['', [Validators.required, Validators.minLength(3)]],
      es: ['', [Validators.required, Validators.minLength(3)]],
      user_votes: ['', [Validators.required]]
    });
  }
  public saveLanguage() {
    const key = this.wordForm.value['key']
    this.i18n.langs.forEach((e) => {
      this.i18n.create({ [key]: this.wordForm.value[e] }, e)
        .subscribe(() => {
          this.activeModal.close()
        }, error => console.log(error))
    })
    this.toast.show('Adicionado com sucesso', 'success')
  }

}
