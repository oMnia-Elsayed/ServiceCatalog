import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { CatalogService } from 'src/app/_service/catalog-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  serviceId;
  // tslint:disable-next-line: no-input-rename
  @Input('Catalog') catalog;

  @ViewChild('myModal', {static: false}) myModal;
  constructor(public catalogService: CatalogService, private modalService: ModalManager) {
   }

  ngOnInit() {
  }

  roundRate(rate: number) {
    return  Math.round(rate * 10) / 10;
  }

  openModel(id: number) {
    this.modalService.open(this.myModal );
    this.serviceId = id;
  }

  closeModel() {
    this.modalService.close(this.myModal );
  }
  deleteService(id: number) {
    this.catalogService.deleteService(id).subscribe(res => {
      this.catalogService.getAllServices();
      this.modalService.close(this.myModal);
    });
  }
}
