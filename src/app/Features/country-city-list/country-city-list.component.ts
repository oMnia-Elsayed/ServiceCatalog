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

  selectedCountryId;
  selectedCityId;
  selectedCountry;
  selectedCity;

  localData;
  showCities = false;
  showTable = false;
  constructor(private countryCityService: CountryCityService, private route: ActivatedRoute) { }

  ngOnInit() {

    // localStorage.clear();

    this.localData = JSON.parse(localStorage.getItem('countries')) || [];
    this.countries = this.countryCityService.getAllCountries();

    // tslint:disable-next-line: radix
    this.selectedCountryId = parseInt(this.route.snapshot.params.id);

    // tslint:disable-next-line: radix
    this.selectedCityId = parseInt(this.route.snapshot.params.cid);

    if (this.selectedCountryId) {
      this.showCities = true;
      this.cities = this.countryCityService.getCitiesByCountryId(this.selectedCountryId);
    } else {
      this.cities = this.countryCityService.getAllCities();
    }
  }

  updateCityList(event) {
    this.selectedCountryId = Number(event.target.value);
    this.showCities = true;
    this.cities = this.countryCityService.getCitiesByCountryId(this.selectedCountryId);
  }

  addCity(event) {
    this.selectedCityId = Number(event.target.value);
    this.selectedCountry = this.countryCityService.getCountryById(this.selectedCountryId);
    this.selectedCity = this.countryCityService.getCityById(this.selectedCityId);
    this.showTable = true;
    this.addEditData();
  }

  addEditData() {
    let dataFound = false;
    if (this.localData.length > 0) {
      this.localData.forEach(el => {
        if (el.country.id === this.selectedCountryId) {
          el.city = this.selectedCity;
          dataFound = true;
        }
      });
    }

    if (!dataFound) {
      this.localData.push({ country: this.selectedCountry, city: this.selectedCity });
    }
    localStorage.setItem('countries', JSON.stringify(this.localData));
  }
}
