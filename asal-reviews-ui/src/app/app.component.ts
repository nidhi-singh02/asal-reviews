import { Component, OnInit } from "@angular/core";
import { AsalReviewAPIService } from "./services/asal-review-api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "AsalReviews";
  loggedIn = false;

  constructor(private asalReviewAPI: AsalReviewAPIService) {}

  ngOnInit() {
    if (sessionStorage.getItem("userId")) {
      this.loggedIn = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.asalReviewAPI.logout().subscribe(() => {});
  }
}
