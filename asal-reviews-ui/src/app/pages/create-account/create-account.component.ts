import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AsalReviewAPIService } from "src/app/services/asal-review-api.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
  accountForm: any;

  constructor(
    private asalReviewAPI: AsalReviewAPIService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const fb = new FormBuilder();
    this.accountForm = fb.group({
      website: [, [Validators.required]],
      firstName: [, [Validators.required]],
      lastName: [, [Validators.required]],
      companyName: [, [Validators.required]],
      email: [, [Validators.required]],
      password: [, [Validators.required]],
      confirmPassword: [, [Validators.required]],
      contactNo: [, [Validators.required]],
    });
  }

  submitForm() {
    console.log(this.accountForm);
    if (this.accountForm.invalid) {
      return;
    }

    const data = {
      email: this.accountForm.value.email,
      password: this.accountForm.value.password,
      name: this.accountForm.value.firstName + this.accountForm.value.lastName,
      contactNo: this.accountForm.value.contactNo,
    };

    this.asalReviewAPI.createAccount(data).subscribe(
      (r) => {
        console.log("r", r);
        this.snackBar.open("Account Created Successfully");
      },
      (err) => {
        console.log("err", err);
      }
    );
  }
}
