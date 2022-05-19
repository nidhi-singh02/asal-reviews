import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class $BroadcastManagerService {
  private subject = new Subject();

  emit = (message: any) => this.subject.next(message);

  getInstance(): Observable<any> {
    if (this.subject === null) {
      this.subject = new Subject<any>();
    }
    return this.subject.asObservable();
  }
}
