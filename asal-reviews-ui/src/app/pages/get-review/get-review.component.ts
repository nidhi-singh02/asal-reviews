import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";
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
    private asalReviewAPI: AsalReviewAPIService,
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

  upvoteReview(reviewId) {
    const loggedInUserId = sessionStorage.getItem("userId");
    if (!loggedInUserId) {
      this.snackBar.showInfoMessage("Please login to upvote");
      return;
    }
    this.asalReviewAPI.upvoteReview(reviewId, loggedInUserId).subscribe(
      (r) => {
        this.reviewData = r.result;
      },
      (err) => {
        console.log("err", err);
        this.snackBar.showErrorMessage(err.error.message);
      }
    );
  }
}
