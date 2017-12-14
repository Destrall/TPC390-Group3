import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {DayPilot} from "daypilot-pro-angular";
import Modal = DayPilot.Angular.Modal;
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {DataService, CreateEventParams} from "./data.service";

@Component({
  selector: 'create-dialog',
  template: `
    <daypilot-modal #modal (close)="closed($event)">
    <div class="center">
      <h1>Create Event</h1>
      <form [formGroup]="form">
        <div class="form-item">
          <input formControlName="name" type="text" placeholder="Event Name"> <span *ngIf="!form.controls.name.valid">Event name required</span>
        </div>
        <div class="form-item">
          <select formControlName="resource">
            <option *ngFor="let r of resources" [ngValue]="r.id">{{r.name}}</option>
          </select>
        </div>
        <div class="form-item">
          <input formControlName="start" type="text" placeholder="Start"> <span *ngIf="!form.controls.start.valid">Invalid datetime</span>
        </div>
        <div class="form-item">
          <input formControlName="end" type="text" placeholder="End"> <span *ngIf="!form.controls.end.valid">Invalid datetime</span>
        </div>
        <div class="form-item">
          <button (click)="submit()" [disabled]="!form.valid">Create</button>
          <button (click)="cancel()">Cancel</button>
        </div>
    </form>
    </div>
    </daypilot-modal>
  `,
  styles: [`
  .center {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  .form-item {
    margin: 4px 0px;
  }
  `]
})
export class CreateComponent {
  @ViewChild("modal") modal : Modal;
  @Output() close = new EventEmitter();

  form: FormGroup;
  dateFormat = "MM/dd/yyyy h:mm tt";

  resources: any[];

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      start: ["", this.dateTimeValidator(this.dateFormat)],
      end: ["", [Validators.required, this.dateTimeValidator(this.dateFormat)]],
      resource: ["", Validators.required]
    });

    this.ds.getResources().subscribe(result => this.resources = result);
  }

  show(args: any) {
    args.name = "";
    this.form.setValue({
      start: args.start.toString(this.dateFormat),
      end: args.end.toString(this.dateFormat),
      name: "",
      resource: args.resource
    });
    this.modal.show();
  }

  submit() {
    let data = this.form.getRawValue();

    let params: CreateEventParams = {
      start: DayPilot.Date.parse(data.start, this.dateFormat).toString(),
      end: DayPilot.Date.parse(data.end, this.dateFormat).toString(),
      text: data.name,
      resource: data.resource
    };

    this.ds.createEvent(params).subscribe(result => {
      //params.id = result.id;
      this.modal.hide(result);
    });
  }

  cancel() {
    this.modal.hide();
  }

  closed(args) {
    this.close.emit(args);
  }

  dateTimeValidator(format: string) {
    return function(c:FormControl) {
      let valid = !!DayPilot.Date.parse(c.value, format);
      return valid ? null : {badDateTimeFormat: true};
    };
  }
}
