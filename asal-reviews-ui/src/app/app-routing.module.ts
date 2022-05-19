import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { CreateAccountComponent } from "./pages/create-account/create-account.component";
import { WriteReviewComponent } from "./pages/write-review/write-review.component";
import { GetReviewComponent } from "./pages/get-review/get-review.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signUp", component: CreateAccountComponent },
  { path: "writeReview", component: WriteReviewComponent },
  { path: "getReview", component: GetReviewComponent },
  { path: "**", component: DashboardComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
