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

  allData = [];
  channels = [];
  categories = [];
  audiences ;

  constructor(public catalogService: CatalogService, private route: ActivatedRoute, private router: Router) {}

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

  private getAll() {
    this.catalogService.getAllServices()
    // tslint:disable-next-line: no-string-literal
    .subscribe((all: any[]) => this.allData = all['Services']);
  }
}
