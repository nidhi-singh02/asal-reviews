import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";

@Component({
  selector: "app-get-review",
  templateUrl: "./get-review.component.html",
  styleUrls: ["./get-review.component.css"],
})
export class GetReviewComponent implements OnInit {
  @Input("rating") private rating: number = 3;
  @Input("starCount") private starCount: number = 5;
  @Input("color") private color: string = "accent";
  @Output() private ratingUpdated = new EventEmitter();

  filteredOptions: Observable<string[]>;

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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("params", params);
      this.userID = params.userID || sessionStorage.getItem("userId");
      this.getUserReviews();
    });
  }

  setRating(rating: number) {
    console.log(rating);
    this.rating = rating;
    this.snackBar.open("You rated " + rating + " / " + this.starCount, "", {
      duration: 3000,
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }

  getUserReviews() {
    const data = {
      userID: this.userID,
    };
    this.asalReviewAPI.getReview(data).subscribe(
      (r) => {
        console.log("r", r);
        if (r.status === 200) {
          this.reviewData = r.result;
          if (!r.result.length)
            this.snackBar.open("No reviews available", "", { duration: 3000 });
        } else {
          this.snackBar.open(r.message, "", { duration: 3000 });
        }
      },
      (err) => {
        console.log("error", err);
        this.snackBar.open("Error occured", "", { duration: 3000 });
      }
    );
  }
}
