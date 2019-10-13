import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from 'src/app/_service/catalog-service.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  searchText;
  pagination;

  allData;
  constructor(public catalogService: CatalogService, private route: ActivatedRoute, private router: Router) {

  }


  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.catalogService.getAllServices().subscribe(res => this.allData = res['Services'] as []);
    // this.route.queryParamMap
    // .map(params => params.get('page'))
    // .subscribe(page => this.pagination.currentPage = page);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  // ngDoCheck() {
  //   this.pagination = {
  //     itemsPerPage: 6,
  //     currentPage: 1,
  //     totalItems: this.catalogService.serviceData.length
  //   };
  // }
  pageChanged(event) {
    // tslint:disable-next-line: no-string-literal
    this.pagination['currentPage'] = event;
    // this.router.navigate([''], { queryParams: { page: event } });
    // this.route.queryParamMap.subscribe(page => this.pagination.currentPage = page);
  }

}
