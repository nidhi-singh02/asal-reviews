import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomSnackbarService } from "src/app/services/custom-snackbar.service";

@Component({
  selector: "app-get-review",
  templateUrl: "./get-review.component.html",
  styleUrls: ["./get-review.component.css"],
})
export class GetReviewComponent implements OnInit {
  reviewData = [];

  constructor(
    private snackBar: CustomSnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reviewData = JSON.parse(sessionStorage.getItem("getReview"));
    sessionStorage.removeItem("getReview");
    if (!this.reviewData) {
      this.snackBar.showInfoMessage("No data available");
      this.router.navigateByUrl("/dashboard");
    }
  }
}
