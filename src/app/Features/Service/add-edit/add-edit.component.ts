import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from 'src/app/_service/catalog-service.service';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  service: any = {};
  serviceForm: FormGroup;
  editMode = false;

  channelsArray = [];
  checkedChannels = [];
  categoryArray = [];
  checkedCategories = [];

  constructor(public catalogService: CatalogService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    this.serviceForm = new FormGroup({
      ServiceTitle: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)]),
      ServiceBrief: new FormControl('',
      [ Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)]),
      Rating: new FormControl('0', Validators.pattern(/^(\d*\.)?\d+$/)),
      Rated: new FormControl('0', Validators.pattern(/^(\d*\.)?\d+$/)),
      ServiceUsage: new FormControl('0', Validators.pattern(/^(\d*\.)?\d+$/)),
      ServiceCategoryDBs: new FormArray([]),
      ServiceChannelDBs: new FormArray([]),
      ServiceCatalogAudienceDB: new FormControl(''),
      CreatedOn: new FormControl(moment().format()),
      ServiceCost: new FormControl('', Validators.pattern(/^[0-9]*$/)),
      ServicePeriod: new FormControl('', Validators.pattern(/^[0-9]*$/)),
      ServiceExternalLink: new FormControl('',
        Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)),
      ServiceDocuments: new FormControl(''),
      ServiceAfterRequest: new FormControl('', Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
      ServiceSteps: new FormControl('', Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
      ServiceRequirements: new FormControl('', Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
      ServiceWorkflow: new FormControl('', Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
      Modified: new FormControl(''),
      ServiceAvailable: new FormControl(false),
      AudienceId: new FormControl(''),
      ServiceAgency: new FormControl('')
    });

    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
      this.catalogService.getServiceById(id)
      .subscribe(res => {
        this.service = res;
        this.serviceForm.patchValue(this.service);

        this.checkedChannels = this.service.Channels ;
        // console.log(this.checkedChannels);
        this.checkedCategories = this.service.Categoryies ;
        this.checkedChannels.forEach(item => document.getElementById(`${item.Id}`).setAttribute('checked', 'checked'));
        this.checkedCategories.forEach(item => document.getElementById(`c${item.Id}`).setAttribute('checked', 'checked'));

      });
    }

    this.catalogService.getAllChannels().subscribe(res => this.channelsArray = res as []);
    this.catalogService.getAllCategories().subscribe(res => this.categoryArray = res as []);

  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.service.Channels = this.checkedChannels ;
      this.service.Categoryies = this.checkedCategories ;
      if (this.editMode) {
        // console.log(JSON.stringify(this.serviceForm.value));
        this.catalogService.updateService(JSON.stringify(this.serviceForm.value))
        .subscribe(res => {});
      } else {
        // console.log(JSON.stringify(this.serviceForm.value));
        this.catalogService.addService(JSON.stringify(this.serviceForm.value))
        .subscribe(res => {});
      }
    }
    this.router.navigate(['']);
  }

  getChannel(event) {
    if (event.target.checked === true) {
      console.log(this.channelsArray.find(e => e.Name === event.target.nextElementSibling.innerHTML));
      this.checkedChannels.push(this.channelsArray.find(e => e.Name === event.target.nextElementSibling.innerHTML));
    } else {
      this.checkedChannels.splice(this.checkedChannels.indexOf(event.target.nextElementSibling.innerHTML), 1);
    }
  }

  getCategory(event) {
    if (event.target.checked === true) {
      this.checkedCategories.push(this.categoryArray.find(e => e.Name === event.target.nextElementSibling.innerHTML));
      console.log(this.checkedCategories);
    } else {
      this.checkedCategories.splice(this.checkedCategories.indexOf(event.target.nextElementSibling.innerHTML), 1);
    }
  }

}
