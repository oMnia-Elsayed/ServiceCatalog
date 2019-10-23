import { Injectable } from '@angular/core';
import { Country } from '../_model/country';
import { City } from '../_model/city';


@Injectable()
export class CountryCityService {

  countries: Country[];
  cities: City[];


  constructor() {

    this.countries = [
      { id: 1, name: 'Egypt' },
      { id: 2, name: 'Sudan' },
      { id: 3, name: 'America' },
      { id: 4, name: 'United Kingdom' },
      { id: 5, name: 'Germany' },
    ];

    this.cities = [
      { id: 1, name: 'Cairo', countryId: 1},
      { id: 2, name: 'Alex', countryId: 1},
      { id: 3, name: 'Auxor', countryId: 1},
      { id: 4, name: 'Tanta', countryId: 1},
      { id: 5, name: 'Banha', countryId: 1},

      { id: 6, name: 'Khartoum', countryId: 2},
      { id: 7, name: 'Port Sudan ', countryId: 2},

      { id: 8, name: 'New York City', countryId: 3},
      { id: 9, name: 'Los Angeles', countryId: 3},
      { id: 10, name: 'Chicago', countryId: 3},

      { id: 11, name: 'Cambridge', countryId: 4},
      { id: 12, name: 'London', countryId: 4},

      { id: 13, name: 'Berlin', countryId: 5},
      { id: 14, name: 'Hamburg', countryId: 5},

    ];
  }

  getAllCountries() {
    return this.countries;
  }

  getAllCities(): City[] {
    return this.cities;
  }

  getCountryById(id: number): Country {
    return this.countries.find( c => c.id === id);
  }

  getCityById(id: number) {
    return this.cities.find( c => c.id === id);
  }

  getCitiesByCountryId(id: number): City[] {
    return this.cities.filter( c => c.countryId === id);
  }

}
