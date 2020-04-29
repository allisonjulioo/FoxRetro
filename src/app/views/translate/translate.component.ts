import { Component, OnInit } from '@angular/core';
import { I18nService } from './../../services/i18n/i18n.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaNewWordComponent } from './moda-new-word/moda-new-word.component';

@Component({
  selector: 'translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  translations: Array<any> = [];
  size: Array<any> = [];
  locales;
  en: Array<any> = [];
  es: Array<any> = [];
  pt: Array<any> = [];
  constructor(
    public i18n: I18nService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    /*this.i18n.getAll('es').subscribe(async res => {
      this.locales = res;
      if (this.locales && this.locales.length) {
        console.log(this.locales.find(data => {
          return data.key === 'login';
        }));
      }

    })*/

    this.i18n.langs.forEach(lang => {
      this.i18n.getAll(lang).subscribe(async res => {
        console.log(res);
        this.locales = res;
        this.translations.push(res)
        this.resolveEndpoint()
      })
    })
  }
  public addNewWord() {
    console.log('res');

    const modalRef = this.modalService.open(ModaNewWordComponent, { windowClass: 'animated fadeIn fasted' });
    modalRef.result.then((result) => {
      if (result.id) {

      }
    })
      .catch(err => console.log(err))
  };
  public resolveEndpoint() {
    if (this.translations.length > 2) {
      this.translations.forEach(() => {
        this.en = Object.values(this.translations[0]);
        this.size = Object.keys(this.translations[0]);
        this.pt = Object.values(this.translations[1]);
        this.es = Object.values(this.translations[2]);
      })
    }
  }
  public editValue(locale, event) {
    console.log(locale, event);

  }

}
