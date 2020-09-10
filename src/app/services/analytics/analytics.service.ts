import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Data {
  data: {
    labels: string[];
    data: any[];
  };
}

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
  public getChartLine(): Observable<Data> {
    return this.http.get<Data>(`${environment.apiUrl}/analytics/get-lines`);
  }
}
