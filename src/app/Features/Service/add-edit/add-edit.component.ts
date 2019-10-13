import { Component, OnInit } from '@angular/core';
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

  constructor(public catalogService: CatalogService, private router: Router, private route: ActivatedRoute) {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
      this.catalogService.getServiceById(id).subscribe(res => this.service = res);
      console.log(this.service);
    }
    console.log(this.service);
  }

  ngOnInit() {

    this.serviceForm = new FormGroup({
      ServiceTitle: new FormControl(this.editMode ? this.service.ServiceTitle : '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)]),
      ServiceBrief: new FormControl(this.editMode ? this.service.ServiceBrief : '',
      [ Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[A-Za-z ]+(?:[_-][A-Za-z ]+)*$/)]),
      Rating: new FormControl('0', [Validators.pattern(/^[0-9]*$/)]),
      Rated: new FormControl('0', [Validators.pattern(/^[0-9]*$/)]),
      ServiceUsage: new FormControl('0', [Validators.pattern(/^[0-9]*$/)]),
      ServiceCategoryDBs: new FormArray([]),
      ServiceChannelDBs: new FormArray([]),
      ServiceCatalogAudienceDB: new FormControl(''),
      CreatedOn: new FormControl(moment().format()),
      ServiceCost: new FormControl(''),
      ServicePeriod: new FormControl(''),
      ServiceExternalLink: new FormControl(''),
      ServiceDocuments: new FormControl(''),
      ServiceAfterRequest: new FormControl(''),
      ServiceSteps: new FormControl(''),
      ServiceRequirements: new FormControl(''),
      ServiceWorkflow: new FormControl(''),
      Modified: new FormControl(''),
      ServiceAvailable: new FormControl('false'),
      AudienceId: new FormControl(''),
      ServiceAgency: new FormControl('')
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.catalogService.addService(JSON.stringify(this.serviceForm.value)).subscribe(res => {});
      this.router.navigate(['']);
    }
  }

}
