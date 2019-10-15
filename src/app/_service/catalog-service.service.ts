import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CatalogService {

  private subject = new Subject<any>() ;

  allData: [];
  readonly baseURL = 'http://10.0.15.125:5001/api/ServiceCatalog/GetService';
  readonly secondURL = 'http://10.0.15.125:5002/api/servicedbs/';

  constructor(private http: HttpClient) {}


  get refreshMethod() {
    return this.subject;
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + 's');
  }

  getServiceById(id: number): Observable<any> {
    return this.http.get<any>(this.baseURL + `/${id}`);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete<any>(this.secondURL + id)
    .pipe(
      tap(() => {
        this.refreshMethod.next();
      })
    );
  }

  addService(ser: any): Observable<any> {
    return this.http.post<any>(this.secondURL , ser,
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(() => {
        this.refreshMethod.next();
      })
    );
  }


  getAllChannels() {
    return this.http.get('http://10.0.15.125:5002/api/ServiceCatalogChannelDBs');
  }

  getAllCategories() {
    return this.http.get('http://10.0.15.125:5002/api/ServiceCatalogCategoryDBs');
  }

  getAllAudiences() {
    return this.http.get('http://10.0.15.125:5002/api/ServiceCatalogAudienceDBs');
  }
}
