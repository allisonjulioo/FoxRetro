import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  currentLang: string;
  public langs = this.i18n.langs;
  constructor(
    public i18n: TranslateService,
    private http: HttpClient) {
    i18n.addLangs(['en', 'pt', 'es']);
    i18n.setDefaultLang('en');
    this.currentLang = this.i18n.defaultLang;
    localStorage.setItem('locale', this.currentLang);

  }
  public switchLang(lang: string) {
    this.i18n.use(lang);
    this.currentLang = lang;
    localStorage.setItem('locale', this.currentLang);
  }
  public translate(data: string): string {
    const uta = `${this.currentLang}.${data}`;
    return this.i18n.instant([uta])[uta] || '...';
  }

  public getAll(locale: string) {
    return this.http.get(`http://localhost:3030/locales`)
      .pipe(map(res => res));
  }
  create(data: object, locale: string) {
    console.log(data, locale);

    return this.http.patch(`http://localhost:3030/${locale}`, data);
  }
  update(column: object) {
    return this.http.patch(`${environment.translateUrl}/`, column);
  }
  delete(id: number, boardId: number) {
    return this.http.delete(`${environment.translateUrl}/`);
  }
}
