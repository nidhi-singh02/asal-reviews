import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-review-card",
  templateUrl: "./review-card.component.html",
  styleUrls: ["./review-card.component.css"],
})
export class ReviewCardComponent implements OnInit {
  @Input() data: {
    rating: string;
    content: string;
    productName: string;
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  goToUserReviews(userID) {
    this.router.navigate(["/getReview"], {
      queryParams: {
        userID,
      },
    });
  }
}
