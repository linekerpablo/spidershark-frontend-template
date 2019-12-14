import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatTooltipModule
} from "@angular/material";

import { FuseSearchBarModule, FuseShortcutsModule } from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";

import { ToolbarComponent } from "app/layout/components/toolbar/toolbar.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatProgressBarModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MatTooltipModule,
        FormsModule
    ],
    exports: [ToolbarComponent]
})
export class ToolbarModule {}
