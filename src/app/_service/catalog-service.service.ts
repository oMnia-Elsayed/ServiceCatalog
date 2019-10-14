import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver';

@Injectable()
export class CatalogService {

  allData: [];
  readonly baseURL = 'http://10.0.15.125:5001/api/ServiceCatalog/GetService';
  readonly secondURL = 'http://10.0.15.125:5002/api/servicedbs/';

  constructor(private http: HttpClient) {}

  getAllServices() {
    return this.http.get(this.baseURL + 's').subscribe(res => this.allData = res as []);
  }

   getServiceById(id: number) {
    return this.http.get(this.baseURL + `/${id}`);
  }

  deleteService(id: number) {
    return this.http.delete(this.secondURL + id).subscribe(res => this.getAllServices());
  }

  addService(ser) {
    return this.http.post(this.secondURL , ser,
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(res => this.getAllServices());
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
