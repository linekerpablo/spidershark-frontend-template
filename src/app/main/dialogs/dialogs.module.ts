import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { DialogRemoveComponent } from './dialog-remove/dialog-remove.component';
import { SafePipe } from '../pipes/safepipe';

@NgModule({
    declarations: [
        DialogRemoveComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        DialogRemoveComponent
    ]
})
export class DialogsModule {}
