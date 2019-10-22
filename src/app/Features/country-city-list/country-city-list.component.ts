import { Component, OnInit } from '@angular/core';
import { CountryCityService } from 'src/app/_service/country-city.service';
import { Country } from 'src/app/_model/country';
import { City } from 'src/app/_model/city';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-city-list',
  templateUrl: './country-city-list.component.html',
  styleUrls: ['./country-city-list.component.scss']
})
export class CountryCityListComponent implements OnInit {

  countries: Country[];
  cities: City[];
  country: Country;
  addedCities = [];
  showCities = false;
  addedCountry = [];
  constructor(private countryCityService: CountryCityService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.countries = this.countryCityService.getAllCountries();

    // tslint:disable-next-line: radix
    const id = parseInt(this.route.snapshot.params.id);

    if (id) {
      this.showCities = true;
      this.country = this.countryCityService.getCountryById(id);
      this.cities = this.countryCityService.getCitiesByCountryId(id);
    } else {
      this.cities = this.countryCityService.getAllCities();
    }
  }

  getCountry(event) {
    console.log(event);

    // this.country = this.countryCityService.getCountryById(id);
    this.showCities = true;
    // this.getCities(id);
  }

  getCities(id: number) {
    this.cities = this.countryCityService.getCitiesByCountryId(id);
  }

  addCity(c: City) {
    if (!this.addedCities.find( e => e.id === c.id )) {
      this.addedCities.push(c);
      this.addedCountry.push({country: this.country , cities: this.addedCities});
      console.log(this.addedCountry);
    }
  }
}
