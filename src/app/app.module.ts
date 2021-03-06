//  Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { ListComponent } from './Features/Service/list/list.component';
import { CatalogService } from './_service/catalog-service.service';
import { CardComponent } from './Features/Service/card/card.component';
import { DetailsComponent } from './Features/Service/details/details.component';
import { AddEditComponent } from './Features/Service/add-edit/add-edit.component';
import { CountryCityListComponent } from './Features/country-city-list/country-city-list.component';
import { CountryCityService } from './_service/country-city.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent,
    DetailsComponent,
    AddEditComponent,
    CountryCityListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    RatingModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ModalModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ListComponent },
      { path: 'service/details/:id', component: DetailsComponent },
      { path: 'add-service' , component: AddEditComponent},
      { path: 'edit-service/:id' , component: AddEditComponent},
      { path: 'add-country' , component: CountryCityListComponent},
      { path: 'edit-country' , component: CountryCityListComponent},
    ])
  ],
  providers: [
    CatalogService,
    CountryCityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
