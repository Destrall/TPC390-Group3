import {Component, ViewChild, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import {DayPilot} from "daypilot-pro-angular";
import {DataService} from "./data.service";
import {CreateComponent} from "./create.component";
import {EditComponent} from "./edit.component";

@Component({
  selector: 'scheduler-component',
  template: `
  <daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>
  <create-dialog #create (close)="createClosed($event)"></create-dialog>
  <edit-dialog #edit (close)="editClosed($event)"></edit-dialog>
`,
  styles: [``]
})
export class SchedulerComponent implements AfterViewInit {

  @ViewChild("scheduler") scheduler: DayPilot.Angular.Scheduler;
  @ViewChild("create") create: CreateComponent;
  @ViewChild("edit") edit: EditComponent;

  events: any[] = [];

  config: any = {
    timeHeaders : [
      {groupBy: "Month", format: "MMMM yyyy"},
      {groupBy: "Day", format: "d"}
    ],
    eventHeight: 40,
    scale: "Day",
    days: 31,
    startDate: "2017-01-01",
    contextMenu: new DayPilot.Menu({
      items: [
        { text: "Edit", onClick: args => this.edit.show(args.source) },
        ]
    }),
    onEventClicked: args => {
      this.edit.show(args.e);
    },
    onTimeRangeSelected: args => {
      this.create.show(args);
    }
  };

  constructor(private ds: DataService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);

    var from = this.scheduler.control.visibleStart();
    var to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;

      // this is required for getEvents() that resolves immediately (no http)
      this.cdr.detectChanges();
    });
  }

  createClosed(args) {
    if (args.result) {
      this.events.push(args.result);
      this.scheduler.control.message("Created.");
    }
    this.scheduler.control.clearSelection();
  }

  editClosed(args) {
    if (args.result) {
      this.scheduler.control.message("Updated");
    }
  }

}

