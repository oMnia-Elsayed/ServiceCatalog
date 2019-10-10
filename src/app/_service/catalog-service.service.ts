import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CatalogService {

  service;
  serviceData: [];
  readonly baseURL = 'http://10.0.15.125:5001/api/ServiceCatalog/GetService';

  constructor(private http: HttpClient) {}

  getAllServices() {
    // tslint:disable-next-line: no-string-literal
    return this.http.get(this.baseURL + 's').toPromise().then(res => this.serviceData = res as []);
  }

  getServiceById(id: number) {
    return this.http.get(this.baseURL + `/${id}`).toPromise().then(res => {this.service = res;
                                                                           console.log(res); });
  }

  deleteService(id: number) {
    return this.http.delete(`http://10.0.15.125:5002/api/servicedbs/${id}`);
  }

}
