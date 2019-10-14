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
  channelForm: FormGroup;
  categoryForm: FormGroup;
  editMode = false;

  channelsArray = [];
  categoryArray = [];
  @ViewChild('channelModal', {static: false}) channelModal;
  @ViewChild('categoryModal', {static: false}) categoryModal;

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

          // ServiceCategoryDBs: new FormArray([]),
          // ServiceChannelDBs: new FormArray(this.editMode ? this.service.Channels : []),
          ServiceCatalogAudienceDB: new FormControl(this.editMode ? this.service.Audience : ''),

          CreatedOn: new FormControl(moment().format()),
          ServiceCost: new FormControl(this.editMode ? this.service.ServiceCost : '', Validators.pattern(/^[0-9]*$/)),
          ServicePeriod: new FormControl(this.editMode ? this.service.ServicePeriod : '', Validators.pattern(/^[0-9]*$/)),

          ServiceExternalLink: new FormControl(this.editMode ? this.service.ServiceExternalLink : '',
           Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
          ServiceDocuments: new FormControl(this.editMode ? this.service.ServiceDocuments : '',
           Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)),
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

    this.channelForm = new FormGroup({
      Name: new FormControl(''),
    });
    this.categoryForm = new FormGroup({
      Name: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.serviceForm.get('ServiceChannelDBs').value.push(...this.channelsArray);
      this.serviceForm.get('ServiceCategoryDBs').value.push(...this.categoryArray);

      this.catalogService.addService(JSON.stringify(this.serviceForm.value));
      this.router.navigate(['']);
    }
  }

  openModel(event) {
    event.stopPropagation();
    if (event.target.innerText === 'Add Channel') {
      this.modalService.open(this.channelModal);
    } else {
      this.modalService.open(this.categoryModal);
    }
  }

  closeModel() {
    this.modalService.close(this.channelModal );
    this.modalService.close(this.categoryModal);
  }

  submitChannel() {
    this.channelsArray.push(this.channelForm.value);
    console.log(this.channelsArray);
    this.channelForm.reset();
    this.closeModel();
  }

  submitCategory() {
    this.categoryArray.push(this.categoryForm.value);
    this.categoryForm.reset();
    this.closeModel();
  }

}
