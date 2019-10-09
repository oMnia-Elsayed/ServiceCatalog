//  Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { SearchCriteriaComponent } from './Features/search-criteria/search-criteria.component';
import { ListComponent } from './Features/Service/list/list.component';
import { CatalogService } from './_service/catalog-service.service';
import { CardComponent } from './Features/Service/card/card.component';
import { PaginationComponent } from './Shared/pagination/pagination.component';
import { DetailsComponent } from './Features/Service/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchCriteriaComponent,
    ListComponent,
    CardComponent,
    PaginationComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ListComponent},
      { path: 'service/details/:id', component: DetailsComponent},
    ])
  ],
  providers: [
    CatalogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
