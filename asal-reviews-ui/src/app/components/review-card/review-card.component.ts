import { Component, Input, OnInit } from "@angular/core";

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

  constructor() {}

  ngOnInit() {}
}
