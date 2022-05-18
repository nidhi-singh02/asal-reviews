import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatSnackBar } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AsalReviewAPIService } from 'src/app/services/asal-review-api.service';

export interface CityType {
  code: string;
  name: string;
  regionCode: 'MH';
}
@NgModule({
  imports: [
    MatButtonModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
 
})

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})


export class WriteReviewComponent implements OnInit {


  @Input('rating') private rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Input('color') private color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  private ratingArr = [];



  public writeReview: FormGroup;
  filteredOptions: Observable<string[]>;



  constructor(
    private es: AsalReviewAPIService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.writeReview = this.fb.group({
    });
  }
  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

 
  onClick(rating:number) {
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  


  citieS= [
    {
      id: 'mum',
      name: 'Mumbai'
    },
    {
      id: 'pun',
      name: 'Pune'
    },
    {
      id: 'thn',
      name: 'Thane'
    },
    {
      id: 'nMum',
      name: 'Navi Mumbai'
    },
    {
      id: 'kol',
      name: 'Kolhapur'
    },
    {
      id: 'pan',
      name: 'Panvel'
    }
  ];

  serviceProvider = [
    {
      id: 'book',
      name: 'Booking.com'
    },
    {
      id: 'skyScan',
      name: 'Skyscanner'
    },
    {
      id: 'exp',
      name: 'Expedia'
    },
    {
      id: 'tripAd',
      name: 'TripAdvisor'
    },
    {
      id: 'ag',
      name: 'Agoda'
    }
  ];

  products=[];
  form = new FormGroup({
    country: new FormControl(),
    city: new FormControl(),
    serviceProvider: new FormControl(),
    product:new FormControl(),
  });
  
  checkFirstDropdown($event){
     this.products=productList.filter(c=>c.cid===$event);
      let  itm=this.products[0];
      this.form.controls['product'].setValue(itm.id);
     console.log($event);
  }
}

export const cityList = [
  {
    id: "1",
    cid: 'ca',
    city: "toronto",
  },
  {
    id: "2",
     cid: 'ca',
    city: "Vancouver",
  
  },
  {
    id: "3",
    cid: 'us',
    city: "New York City",
  },
  {
    id: "4",
     cid: 'us',
    city: "Los Angeles",
  
  },
  {
    id: "5",
    cid: 'uk',
    city: "London",
  },
  {
    id: "6",
    cid: 'uk',
    city: "BRIGHTON",
  
  }
];

export const productList = [
  {
    id: "1",
    cid: 'book',
    product: "Stay",
  },
  {
    id: "2",
     cid: 'book',
     product: "Flights",
  
  },
  {
    id: "3",
    cid: 'book',
    product: "Hotel",
  },
  {
    id: "4",
     cid: 'book',
     product: "Car Rental",
  
  },
  {
    id: "5",
    cid: 'book',
    product: "Attrraction",
  },
  {
    id: "6",
    cid: 'skyScan',
    product: "Filtes",
  
  },
  {
    id: "7",
    cid: 'skyScan',
    product: "Hotels",
  },
  {
    id: "8",
    cid: 'skyScan',
    product: "Car Hire",
  },
  {
    id: "9",
    cid: 'exp',
    product: "Stays",
  
  },
  {
    id: "10",
    cid: 'exp',
    product: "Flites",
  },
  {
    id: "11",
    cid: 'exp',
    product: "Packages",
  },
  {
    id: "12",
    cid: 'exp',
    product: "Holiday Activities",
  },
  {
    id: "13",
    cid: 'tripAd',
    product: "Holiday Homes",
  },
  {
    id: "14",
    cid: 'tripAd',
    product: "Restaurants",
  },
  {
    id: "15",
    cid: 'tripAd',
    product: "Airlines",
  },
  {
    id: "16",
    cid: 'tripAd',
    product: "Package Holidays",
  },
  {
    id: "17",
    cid: 'tripAd',
    product: "Cruises",
  }



  ,
  {
    id: "18",
    cid: 'ag',
    product: "Hotels & Homes",
  },
  {
    id: "19",
    cid: 'ag',
    product: "Hotels & Homes",
  },
  {
    id: "20",
    cid: 'ag',
    product: "Flight + Hotel",
  },
  {
    id: "21",
    cid: 'ag',
    product: "Flights",
  },
  {
    id: "22",
    cid: 'ag',
    product: "Long stays",
  }
];
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
