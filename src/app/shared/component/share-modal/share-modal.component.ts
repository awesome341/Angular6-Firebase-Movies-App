import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyLink(movieId) {
    const inputElement = document.getElementById('inputId');
    (<any>inputElement).select();
    document.execCommand('copy');
    inputElement.blur();
    this.translateService.get('Error.Link').subscribe(results => this.snackBar.open(results, '', { duration: 2000 }));
    this.dialogRef.close();
  }

}
