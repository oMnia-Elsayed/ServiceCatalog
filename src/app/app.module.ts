import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { SearchCriteriaComponent } from './Features/search-criteria/search-criteria.component';
import { ListComponent } from './Features/Service/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchCriteriaComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: ListComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
