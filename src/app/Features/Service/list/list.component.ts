import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/_service/catalog-service.service';
import { element } from 'protractor';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchText;

  allData = [];
  allDataClone = [];

  channels = [];
  categories = [];
  audiences ;
  filterArray = [];

  showLoader = true;

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {

    this.catalogService.refreshMethod
    .subscribe(() => {
      this.getAll();
    });

    this.getAll();
    this.catalogService.getAllChannels().subscribe(res => this.channels = res as []);
    this.catalogService.getAllCategories().subscribe(res => this.categories = res as []);
    this.catalogService.getAllAudiences().subscribe(res => this.audiences = res );

  }

 getAll() {
    this.catalogService.getAllServices()
    .subscribe((all: any[]) => {
      // tslint:disable-next-line: no-string-literal
      this.allData = all['Services'] ;
      this.allDataClone = this.allData;
      this.showLoader = false;
    });

  }

  clearSearch() {
    this.searchText = '';
  }

  getFilter(event, type) {
    this.filterArray = [];
    this.allData = this.allDataClone;
    this.allData.forEach(el => {
      switch (type) {
        case 'channel':
            if (el.Channels.length > 0) {
              el.Channels.forEach(item => {
                this.pushInFilterArray(event, item, el);
              });
            }
            break;
        case 'category':
              if (el.Categories.length > 0) {
                el.Categories.forEach(item => {
                  this.pushInFilterArray(event, item, el);
                });
              }
              break;
          case 'audience':
                if (el.Audience.length > 0) {
                  el.Audience.forEach(item => {
                    this.pushInFilterArray(event, item, el);
                  });
                }
                break;
        default:
          break;
      }
    });

    this.allData = this.filterArray;
  }

  pushInFilterArray(event, item, el) {
    // tslint:disable-next-line: radix
    if (event.Id === parseInt(item.Id)) {
      this.filterArray.push(el);
    }
  }
}
