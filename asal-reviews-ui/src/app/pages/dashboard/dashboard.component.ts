import { Component, OnInit } from "@angular/core";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";
import { CustomSnackbarService } from "src/app/services/custom-snackbar.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  data = [];

  constructor(
    private asalReviewAPI: AsalReviewAPIService,
    private snackbar: CustomSnackbarService
  ) {}

  ngOnInit() {
    this.asalReviewAPI.getAllReviews().subscribe(
      (r) => {
        console.log(r);
        if (r.status === 200) {
          this.data = r.result;
          r.result.forEach((value, index) => {
            if (value.content.length > 60) {
              r.result[index].shortDesc = value.content.slice(0, 60) + "...";
            }
          });
        } else {
          this.snackbar.showInfoMessage(r.message);
        }
      },
      (err) => {
        console.log("err", err);
        this.snackbar.showErrorMessage("Unable to load reviews");
      }
    );
  }
}
