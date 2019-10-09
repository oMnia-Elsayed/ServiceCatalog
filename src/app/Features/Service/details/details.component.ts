import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/_service/catalog-service.service';
import { async } from 'q';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  max = 10;
  rate ;
  isReadonly = true;
  constructor(public catalogService: CatalogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.catalogService.getServiceById(id);
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck() {
    this.rate =  Math.round(this.catalogService.service.RatingValue);
  }
}
