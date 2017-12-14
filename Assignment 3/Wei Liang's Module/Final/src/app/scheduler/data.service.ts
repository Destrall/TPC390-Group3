import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {DayPilot} from 'daypilot-pro-angular';

@Injectable()
export class DataService {

  resources: any[] = [
    { name: "Room 01", id: "R1"},
    { name: "Room 02", id: "R2"},
	{ name: "Room 03", id: "R3"},
	{ name: "Room 04", id: "R4"},
	{ name: "Room 05", id: "R5"},
	{ name: "Room 06", id: "R6"},
	{ name: "Room 07", id: "R7"},
	{ name: "Room 08", id: "R8"},
	{ name: "Room 09", id: "R9"},
	{ name: "Room 10", id: "R10"},
	{ name: "Room 11", id: "R11"},
	{ name: "Room 12", id: "R12"},
	{ name: "Room 13", id: "R13"},
	{ name: "Room 14", id: "R14"},
	{ name: "Room 15", id: "R15"},
	{ name: "Room 16", id: "R16"},
	{ name: "Room 17", id: "R17"},
	{ name: "Room 18", id: "R18"}
	
  ];

  events: any[] = [
    {
      id: "1",
      resource: "R1",
      start: "2017-01-03",
      end: "2017-01-15",
      text: "Event 1"
    }
  ];

  constructor(private http : Http){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return Observable.of(this.events);
    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString()).map((response:Response) => response.json());
  }

  getResources(): Observable<any[]> {
    return Observable.of(this.resources);
    // return this.http.get("/api/resources").map((response:Response) => response.json());
  }

  createEvent(data: CreateEventParams): Observable<EventData> {
    let e: EventData = {
      start: data.start,
      end: data.end,
      resource: data.resource,
      id: DayPilot.guid(),
      text: data.text
    };

    return Observable.of(e);
    //return this.http.post("/api/events/create", data).map((response:Response) => response.json());
  }

  updateEvent(data: DayPilot.Event): Observable<any> {
    console.log("Updating event: " + data.text());
    console.log(data);
    return Observable.of({result: "OK"});
  }

}


export interface CreateEventParams {
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

export interface UpdateEventParams {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

export interface EventData {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
}
