import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.scss']
})
export class SearchCriteriaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(id: string) {
    console.log(id);
    document.getElementById(id).classList.toggle('showMenu');
  }
}
