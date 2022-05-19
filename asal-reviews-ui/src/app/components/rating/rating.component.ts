import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  color: string = "green";

  constructor() {}

  ngOnInit() {
    if (this.rating > 3) this.color = "primary";
    else if (this.rating > 1) this.color = "accent";
    else this.color = "warn";
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
}
