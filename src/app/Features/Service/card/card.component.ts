import { Component, OnInit, Input } from '@angular/core';
import { CatalogService } from 'src/app/_service/catalog-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('Catalog') catalog;
  constructor(public catalogService: CatalogService) {
   }

  ngOnInit() {
  }

  roundRate(rate: number) {
    return  Math.round(rate * 10) / 10;
  }
}
