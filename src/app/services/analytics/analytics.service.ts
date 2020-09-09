import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  public getCloudWords(): Observable<CloudData[]> {
    return this.http.get<CloudData[]>(
      `${environment.apiUrl}/analytics/get-cloud-words`
    );
  }
}
