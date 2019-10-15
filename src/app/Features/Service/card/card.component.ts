import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { CatalogService } from 'src/app/_service/catalog-service.service';
import { Router } from '@angular/router';

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
  constructor(public catalogService: CatalogService, private modalService: ModalManager, private router: Router) {
   }

  ngOnInit() {}

  roundRate(rate: number) {
    return  Math.round(rate * 10) / 10;
  }

  openModel(event, id: number) {
    event.stopPropagation();
    this.modalService.open(this.myModal );
    this.serviceId = id;
  }

  closeModel() {
    this.modalService.close(this.myModal );
  }
  deleteService(id: number) {
    this.catalogService.deleteService(id).subscribe(res => {});
    this.modalService.close(this.myModal);
  }

  navigateToEdit(cat) {
    console.log(cat);
    this.router.navigate([`/edit-service/${cat.Id}`]);
  }

}
