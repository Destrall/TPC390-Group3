import {DataService} from "./data.service";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {SchedulerComponent} from "./scheduler.component";
import {DayPilot} from "daypilot-pro-angular";
import {CreateComponent} from "./create.component";
import {EditComponent} from "./edit.component";

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpModule ],
  declarations: [
    DayPilot.Angular.Scheduler,
    DayPilot.Angular.Modal,
    SchedulerComponent,
    CreateComponent,
    EditComponent
  ],
  exports:      [ SchedulerComponent ],
  providers:    [ DataService ]
})
export class SchedulerModule { }
