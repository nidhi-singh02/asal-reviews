import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { CreateAccountComponent } from "./pages/create-account/create-account.component";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { WriteReviewComponent } from "./pages/write-review/write-review.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../material-module";
import { GetReviewComponent } from "./pages/get-review/get-review.component";
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { ReviewTableComponent } from './components/review-table/review-table.component';
import { WhyAsalComponent } from './pages/why-asal/why-asal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    DashboardComponent,
    WriteReviewComponent,
    GetReviewComponent,
    ReviewCardComponent,
    ReviewTableComponent,
    WhyAsalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
