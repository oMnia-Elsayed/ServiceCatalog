import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from 'src/app/_service/catalog-service.service';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ModalManager } from 'ngb-modal';

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

  constructor(public catalogService: CatalogService, private router: Router,
              private route: ActivatedRoute, private modalService: ModalManager) {

    const id = this.route.snapshot.params.id;

    if (id) {
      this.editMode = true;
      this.catalogService.getServiceById(id).subscribe(res => {this.service = res;
                                                               console.log(this.service);
                                                               this.serviceForm = new FormGroup({
          ServiceTitle: new FormControl(this.editMode ? this.service.Name : '',
           [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)]),

          ServiceBrief: new FormControl(this.editMode ? this.service.Brief : '',
           [ Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)]),

          Rating: new FormControl(this.editMode ? this.service.Rating : '0', [Validators.pattern(/^(\d*\.)?\d+$/)]),
          Rated: new FormControl(this.editMode ? this.service.Rated : '0', [Validators.pattern(/^(\d*\.)?\d+$/)]),
          ServiceUsage: new FormControl(this.editMode ? this.service.ServiceUsage : '0', [Validators.pattern(/^(\d*\.)?\d+$/)]),

          // ServiceCategoryDBs: new FormArray(this.editMode ? this.service.Categoryies : []),
          // ServiceChannelDBs: new FormArray(this.editMode ? this.service.Channels : []),
          ServiceCatalogAudienceDB: new FormControl(this.editMode ? this.service.Audience : ''),

          CreatedOn: new FormControl(moment().format()),
          ServiceCost: new FormControl(this.editMode ? this.service.ServiceCost : '', Validators.pattern(/^[0-9]*$/)),
          ServicePeriod: new FormControl(this.editMode ? this.service.ServicePeriod : '', Validators.pattern(/^[0-9]*$/)),

          ServiceExternalLink: new FormControl(this.editMode ? this.service.ServiceExternalLink : '',
           Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)),
          ServiceDocuments: new FormControl(''),
          ServiceAfterRequest: new FormControl(this.editMode ? this.service.ServiceAfterRequest : '',
           Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
          ServiceSteps: new FormControl(this.editMode ? this.service.ServiceSteps : '',
           Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
          ServiceRequirements: new FormControl(this.editMode ? this.service.ServiceRequirements : '',
           Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
          ServiceWorkflow: new FormControl(this.editMode ? this.service.ServiceWorkflow : '',
           Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),

          Modified: new FormControl(this.editMode ? this.service.Modified : ''),
          ServiceAvailable: new FormControl(this.editMode ? this.service.ServiceAvailable : false),
          AudienceId: new FormControl(this.editMode ? this.service.Audience : ''),
          ServiceAgency: new FormControl(this.editMode ? this.service.Agency : '')
        });
                                                               this.checkedChannels = this.service.Channels ;
                                                               console.log(this.checkedChannels);
                                                               this.checkedCategories = this.service.Categoryies ;
                                                               // tslint:disable-next-line: max-line-length
                                                               this.checkedChannels.forEach(item => document.getElementById(`${item.Id}`).setAttribute('checked', 'checked'));
                                                               // tslint:disable-next-line: max-line-length
                                                               this.checkedCategories.forEach(item => document.getElementById(`c${item.Id}`).setAttribute('checked', 'checked'));

      });
    }
  }

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

    this.catalogService.getAllChannels().subscribe(res => this.channelsArray = res as []);
    this.catalogService.getAllCategories().subscribe(res => this.categoryArray = res as []);

  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.service.Channels = this.checkedChannels ;
      this.service.Categoryies = this.checkedCategories ;
      if (this.editMode) {

      } else {
        console.log(JSON.stringify(this.serviceForm.value));
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
