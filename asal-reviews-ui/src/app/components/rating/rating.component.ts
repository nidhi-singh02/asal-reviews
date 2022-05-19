import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() size: string = "normal";
  color: string;

  constructor() {}

  ngOnInit() {
    if (this.rating > 3) this.color = "forestgreen";
    else if (this.rating > 1) this.color = "orange";
    else this.color = "orangered";
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
}
