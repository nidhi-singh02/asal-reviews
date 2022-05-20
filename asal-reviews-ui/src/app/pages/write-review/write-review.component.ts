import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";

export interface CityType {
  code: string;
  name: string;
  regionCode: "MH";
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn",
}

export const cityList = [
  {
    id: "1",
    cid: "ca",
    city: "toronto",
  },
  {
    id: "2",
    cid: "ca",
    city: "Vancouver",
  },
  {
    id: "3",
    cid: "us",
    city: "New York City",
  },
  {
    id: "4",
    cid: "us",
    city: "Los Angeles",
  },
  {
    id: "5",
    cid: "uk",
    city: "London",
  },
  {
    id: "6",
    cid: "uk",
    city: "BRIGHTON",
  },
];

export const productList = [
  {
    id: "1",
    cid: "book",
    product: "Stay",
  },
  {
    id: "2",
    cid: "book",
    product: "Flights",
  },
  {
    id: "3",
    cid: "book",
    product: "Hotel",
  },
  {
    id: "4",
    cid: "book",
    product: "Car Rental",
  },
  {
    id: "5",
    cid: "book",
    product: "Attraction",
  },
  {
    id: "6",
    cid: "skyScan",
    product: "Flights",
  },
  {
    id: "7",
    cid: "skyScan",
    product: "Hotels",
  },
  {
    id: "8",
    cid: "skyScan",
    product: "Car Hire",
  },
  {
    id: "9",
    cid: "exp",
    product: "Stays",
  },
  {
    id: "10",
    cid: "exp",
    product: "Flights",
  },
  {
    id: "11",
    cid: "exp",
    product: "Packages",
  },
  {
    id: "12",
    cid: "exp",
    product: "Holiday Activities",
  },
  {
    id: "13",
    cid: "tripAd",
    product: "Holiday Homes",
  },
  {
    id: "14",
    cid: "tripAd",
    product: "Restaurants",
  },
  {
    id: "15",
    cid: "tripAd",
    product: "Airlines",
  },
  {
    id: "16",
    cid: "tripAd",
    product: "Package Holidays",
  },
  {
    id: "17",
    cid: "tripAd",
    product: "Cruises",
  },
  {
    id: "18",
    cid: "ag",
    product: "Hotels & Homes",
  },
  {
    id: "19",
    cid: "ag",
    product: "Hotels & Homes",
  },
  {
    id: "20",
    cid: "ag",
    product: "Flight + Hotel",
  },
  {
    id: "21",
    cid: "ag",
    product: "Flights",
  },
  {
    id: "22",
    cid: "ag",
    product: "Long stays",
  },
];

@Component({
  selector: "app-write-review",
  templateUrl: "./write-review.component.html",
  styleUrls: ["./write-review.component.css"],
})
export class WriteReviewComponent implements OnInit {
  @Input("rating") private rating: number = 3;
  @Input("starCount") private starCount: number = 5;
  @Input("color") private color: string = "accent";
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  private ratingArr = [];

  public writeReview: FormGroup;
  filteredOptions: Observable<string[]>;

  selectedCity: string;
  selectedServiceProvider: string;

  cities = [
    {
      id: "mum",
      name: "Mumbai",
    },
    {
      id: "pun",
      name: "Pune",
    },
    {
      id: "thn",
      name: "Thane",
    },
    {
      id: "nMum",
      name: "Navi Mumbai",
    },
    {
      id: "kol",
      name: "Kolhapur",
    },
    {
      id: "pan",
      name: "Panvel",
    },
  ];

  serviceProvider = [
    {
      id: "book",
      name: "Booking.com",
    },
    {
      id: "skyScan",
      name: "Skyscanner",
    },
    {
      id: "exp",
      name: "Expedia",
    },
    {
      id: "tripAd",
      name: "TripAdvisor",
    },
    {
      id: "ag",
      name: "Agoda",
    },
  ];

  products = [];

  form: any;

  constructor(
    private asalReviewAPI: AsalReviewAPIService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.writeReview = this.fb.group({});
  }

  ngOnInit() {
    this.form = new FormBuilder().group({
      country: [""],
      city: ["", [Validators.required]],
      serviceprovider: ["", [Validators.required]],
      productType: ["", [Validators.required]],
      comment: ["", [Validators.required]],
      product: ["", [Validators.required]],
    });

    console.log("a " + this.starCount);
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  get f() {
    return this.form.controls;
  }

  setRating(rating: number) {
    console.log(rating);
    this.rating = rating;
    this.snackBar.open("You rated " + rating + " / " + this.starCount, "", {
      duration: this.snackBarDuration,
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

  checkFirstDropdown($event) {
    console.log($event);
    this.products = productList.filter((c) => c.cid === $event.target.value);
    let itm = this.products[0];
    this.form.controls["productType"].setValue(itm.id);
    const select = $event.target;
    const text = select.options[select.selectedIndex].text;
    console.log("d", text);
    this.selectedServiceProvider = text;
  }

  onSubmit() {
    console.log("form", this.form);
    if (this.form.invalid) {
      return;
    }

    const { comment } = this.form.value;

    const data = { ...this.form.value };
    data.rating = this.rating;
    data.userID = sessionStorage.getItem("userId");
    data.content = comment;
    data.city = this.selectedCity;
    data.serviceprovider = this.selectedServiceProvider;

    console.log("data", data);

    this.asalReviewAPI.createReview(data).subscribe(
      (r) => {
        console.log("r", r);
        this.snackBar.open(r.message, "", { duration: 3000 });
        this.form.reset();
      },
      (err) => {
        console.log("error", err);
        this.snackBar.open("Error occured", "", { duration: 3000 });
      }
    );
  }

  changeCity($event) {
    const select = $event.target;
    const text = select.options[select.selectedIndex].text;
    console.log("d", text);
    this.selectedCity = text;
  }
}
