import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  data = [];

  constructor(
    private asalReviewAPI: AsalReviewAPIService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.asalReviewAPI.getAllReviews().subscribe(
      (r) => {
        console.log(r);
        if (r.status === 200) {
          this.data = r.result;
        } else {
          this.snackbar.open(r.message, "", { duration: 3000 });
        }
      },
      (err) => {
        console.log("err", err);
        this.snackbar.open("Unable to load reviews", "", { duration: 3000 });
      }
    );
  }
}
