import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-review-table",
  templateUrl: "./review-table.component.html",
  styleUrls: ["./review-table.component.css"],
})
export class ReviewTableComponent implements OnInit {
  @Input() data = [];
  pageLimit: number = 8;
  pageNumber: number = 1;

  constructor() {}

  ngOnInit() {}

  onClickPrevious() {
    if (this.pageNumber > 1) this.pageNumber -= 1;
  }

  onClickNext() {
    console.log(this.pageNumber * this.pageLimit, this.data.length);
    if (this.pageNumber * this.pageLimit < this.data.length)
      this.pageNumber += 1;
  }
}
