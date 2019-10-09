import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/_service/catalog-service.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // allServices: [];

  constructor(public catalogService: CatalogService) {

  }

  ngOnInit() {
    this.catalogService.getAllServices();
    // this.catalogService.getServiceById(37);
  }

}
