import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { CustomSnackbarService } from "./custom-snackbar.service";

@Injectable({
  providedIn: "root",
})
export class RouteGuardService {
  constructor(
    private router: Router,
    private snackbar: CustomSnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("hello " + route.url);
    const r = Boolean(sessionStorage.getItem("userId"));
    if (!r) this.snackbar.showInfoMessage("Login to create a review");
    return r;
  }
}
