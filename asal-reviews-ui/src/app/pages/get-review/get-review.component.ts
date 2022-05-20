import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";

@Component({
  selector: "app-get-review",
  templateUrl: "./get-review.component.html",
  styleUrls: ["./get-review.component.css"],
})
export class GetReviewComponent implements OnInit {
  reviewData = [];

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.reviewData = JSON.parse(sessionStorage.getItem("getReview"));
    sessionStorage.removeItem("getReview");
    if (!this.reviewData) {
      this.snackBar.open("No data available", "", { duration: 3000 });
      this.router.navigateByUrl("/dashboard");
    }
  }
}
