import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class CustomSnackbarService {
  public snackbarDuration: number = 3000;

  constructor(private snackbar: MatSnackBar) {}

  showSuccessMessage(message) {
    this.snackbar.open(message, "", {
      duration: this.snackbarDuration,
      panelClass: ["snackbar-success"],
    });
  }

  showErrorMessage(message) {
    this.snackbar.open(message, "", {
      duration: this.snackbarDuration,
      panelClass: ["snackbar-error"],
    });
  }

  showWarningMessage(message) {
    this.snackbar.open(message, "", {
      duration: this.snackbarDuration,
      panelClass: ["snackbar-warn"],
    });
  }

  showInfoMessage(message) {
    this.snackbar.open(message, "", {
      duration: this.snackbarDuration,
      panelClass: ["snackbar-info"],
    });
  }
}
