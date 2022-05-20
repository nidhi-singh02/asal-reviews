import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-review-card",
  templateUrl: "./review-card.component.html",
  styleUrls: ["./review-card.component.css"],
})
export class ReviewCardComponent implements OnInit {
  @Input() data: any = {};

  constructor(private router: Router) {}

  ngOnInit() {}

  goToUserReviews() {
    sessionStorage.setItem("getReview", JSON.stringify(this.data));
    this.router.navigate(["/getReview"]);
  }
}
