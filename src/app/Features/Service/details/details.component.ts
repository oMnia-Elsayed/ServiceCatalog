import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/_service/catalog-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  max = 5;
  rate = 0 ;
  isReadonly = false;
  overStar: number | undefined;
  percent: number;
  service: any = {};
  channels: any = [];
  categories: any = [];
  audiences: any = '' ;
  constructor(private catalogService: CatalogService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.id;

      this.catalogService.getServiceById(id)
      .subscribe(res => {
        this.service = res;
        this.categories = this.service.Categoryies;
        this.channels = this.service.Channels;
        this.audiences = this.service.Audience;
      //  this.rate =  Math.round(this.service.RatingValue);
      });
    });
  }

  hoveringOver(value: number): void {
    this.overStar = value;
    // this.percent = value * 10;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
  getRate(event) {
    this.service.RatingValue = event;
  }

}
