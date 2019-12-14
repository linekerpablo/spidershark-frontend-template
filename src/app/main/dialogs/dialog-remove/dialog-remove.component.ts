import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from './dialog.data';

@Component({
    selector: 'app-dialog-remove',
    templateUrl: './dialog-remove.component.html',
    styleUrls: ['./dialog-remove.component.scss']
})
export class DialogRemoveComponent implements OnInit {
    data: DialogData;

    constructor(
        public dialogRef: MatDialogRef<DialogRemoveComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.data = data;
    }

    ngOnInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
