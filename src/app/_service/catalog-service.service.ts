import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver';

@Injectable()
export class CatalogService {

  service;
  serviceData: [];
  readonly baseURL = 'http://10.0.15.125:5001/api/ServiceCatalog/GetService';
  readonly secondURL = 'http://10.0.15.125:5002/api/servicedbs/';

  constructor(private http: HttpClient) {}

  getAllServices() {
    return this.http.get(this.baseURL + 's');

  }

   getServiceById(id: number) {
    return this.http.get(this.baseURL + `/${id}`);
  }

  deleteService(id: number) {
    return this.http.delete(this.secondURL + id);
  }

  addService(ser) {
    return this.http.post(this.secondURL , ser,
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getAllChannels() {
    return this.http.get('http://10.0.15.125:5002/api/ServiceCatalogChannelDBs').subscribe(res => console.log(res));
  }

  getAllCategories() {
    return this.http.get('http://10.0.15.125:5002/api/ServiceCatalogCategoryDBs').subscribe(res => console.log(res));
  }

  getAllAudiences() {
    return this.http.get('http://10.0.15.125:5002/api/ServiceCatalogAudienceDBs').subscribe(res => console.log(res));
  }
}
