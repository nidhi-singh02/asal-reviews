import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AsalReviewAPIService } from "./services/asal-review-api.service";
import { $BroadcastManagerService } from "./services/broadcast-manager.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "AsalReviews";
  loggedIn = false;
  activeUrl = "/";

  constructor(
    private location: Location,
    private asalReviewAPI: AsalReviewAPIService,
    private router: Router,
    private broadcast: $BroadcastManagerService
  ) {}

  ngOnInit() {
    this.broadcast.getInstance().subscribe((r) => {
      console.log("event getInstance", r);
      if (r.name === "LOGIN_CHECK") {
        if (sessionStorage.getItem("userId")) {
          this.loggedIn = true;
        }
      }
    });
    if (sessionStorage.getItem("userId")) {
      this.loggedIn = true;
    }
    this.router.events.subscribe((val) => {
      this.activeUrl = this.location.path();
    });
  }

  logout() {
    sessionStorage.clear();
    this.asalReviewAPI.logout().subscribe(() => {});
    this.router.navigateByUrl("/");
    this.loggedIn = false;
  }
}
