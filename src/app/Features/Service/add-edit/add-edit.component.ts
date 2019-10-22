import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from 'src/app/_service/catalog-service.service';
import { FormGroup, FormControl, Validators, FormArray , FormBuilder} from '@angular/forms';
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

  stringValidators =  Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/);
  emailValidators =  Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
  numberValidators =  Validators.pattern(/^[0-9]*$/);
  decimalValidators =  Validators.pattern(/^(\d*\.)?\d+$/);
  minLength = Validators.minLength(3);
  maxLength = Validators.maxLength(50);

  constructor(private catalogService: CatalogService, private router: Router,
              private route: ActivatedRoute , private formBuilder: FormBuilder) {}

  ngOnInit() {

    this.serviceForm = this.formBuilder.group({
      ServiceTitle: ['', [ Validators.required, this.minLength , this.maxLength , this.stringValidators]],
      ServiceBrief: ['', [ this.minLength , this.maxLength , this.stringValidators]],
      Rating: ['0', this.decimalValidators],
      Rated: ['0', this.decimalValidators],
      ServiceUsage: ['0', this.decimalValidators],
      ServiceCategoryDBs: this.formBuilder.array([]),
      ServiceChannelDBs: this.formBuilder.array([]),
      ServiceCatalogAudienceDB: [''],
      CreatedOn: [moment().format()],
      ServiceCost: ['', this.numberValidators],
      ServicePeriod: ['', this.numberValidators],
      ServiceExternalLink: ['', this.emailValidators],
      ServiceDocuments: [''],
      ServiceAfterRequest: ['', this.stringValidators],
      ServiceSteps: ['', this.stringValidators],
      ServiceRequirements: ['', this.stringValidators],
      ServiceWorkflow: ['', this.stringValidators],
      Modified: [''],
      ServiceAvailable: [false],
      AudienceId: [''],
      ServiceAgency: ['']
    });

    // this.serviceForm = new FormGroup({
    //   ServiceTitle: new FormControl('',
    //   [Validators.required, this.minLength , this.maxLength , this.stringValidators]),
    //   ServiceBrief: new FormControl('',
    //   [ Validators.minLength(3), Validators.maxLength(50), this.stringValidators]),
    //   Rating: new FormControl('0', this.decimalValidators),
    //   Rated: new FormControl('0', this.decimalValidators),
    //   ServiceUsage: new FormControl('0', this.decimalValidators),
    //   ServiceCategoryDBs: new FormArray([]),
    //   ServiceChannelDBs: new FormArray([]),
    //   ServiceCatalogAudienceDB: new FormControl(''),
    //   CreatedOn: new FormControl(moment().format()),
    //   ServiceCost: new FormControl('', this.numberValidators),
    //   ServicePeriod: new FormControl('', this.numberValidators),
    //   ServiceExternalLink: new FormControl('', this.emailValidators),
    //   ServiceDocuments: new FormControl(''),
    //   ServiceAfterRequest: new FormControl('', this.stringValidators),
    //   ServiceSteps: new FormControl('', this.stringValidators),
    //   ServiceRequirements: new FormControl('', this.stringValidators),
    //   ServiceWorkflow: new FormControl('', this.stringValidators),
    //   Modified: new FormControl(''),
    //   ServiceAvailable: new FormControl(false),
    //   AudienceId: new FormControl(''),
    //   ServiceAgency: new FormControl('')
    // });

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
