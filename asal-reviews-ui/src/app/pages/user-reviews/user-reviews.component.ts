import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";
import { CustomSnackbarService } from "src/app/services/custom-snackbar.service";

@Component({
  selector: "app-user-reviews",
  templateUrl: "./user-reviews.component.html",
  styleUrls: ["./user-reviews.component.css"],
})
export class UserReviewsComponent implements OnInit {
  reviewData = [
    // {
    //   rating: 4,
    //   serviceprovider: "sdf",
    //   content: "sdfsefsef",
    //   product: "sdf",
    // },
    // {
    //   rating: 3,
    //   serviceprovider: "sdf",
    //   content: "sdfsefsef",
    //   product: "sdf",
    // },
    // {
    //   rating: 1,
    //   serviceprovider: "sdf",
    //   content: "sdfsefsef",
    //   product: "sdf",
    // },
  ];
  userID: string;

  constructor(
    private asalReviewAPI: AsalReviewAPIService,
    private snackBar: CustomSnackbarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("params", params);
      this.userID = params.userID || sessionStorage.getItem("userId");
      this.getUserReviews();
    });
  }

  getUserReviews() {
    if (!this.userID) {
      this.snackBar.showInfoMessage("Login to view your reviews");
      return;
    }
    const data = {
      userID: this.userID,
    };
    this.asalReviewAPI.getReview(data).subscribe(
      (r) => {
        console.log("r", r);
        if (r.status === 200) {
          this.reviewData = r.result;
          if (!r.result.length)
            this.snackBar.showInfoMessage("No reviews available");
        } else {
          this.snackBar.showInfoMessage(r.message);
        }
      },
      (err) => {
        console.log("error", err);
        this.snackBar.showErrorMessage("Error occured");
      }
    );
  }

  upvoteReview(reviewId) {
    const loggedInUserId = sessionStorage.getItem("userId");
    if (!loggedInUserId) {
      this.snackBar.showInfoMessage("Please login to upvote");
      return;
    }
    this.asalReviewAPI.upvoteReview(reviewId, loggedInUserId).subscribe(
      (r) => {
        if (r.status === 200) {
          let index = -1;
          this.reviewData.some((val, ind) => {
            if (val.reviewID === r.result.reviewID) {
              index = ind;
              return true;
            }
          });
          this.reviewData[index] = r.result;
        } else {
          this.snackBar.showSuccessMessage(r.message);
        }
      },
      (err) => {
        console.log("err", err);
        this.snackBar.showErrorMessage(err.error.message);
      }
    );
  }
}
