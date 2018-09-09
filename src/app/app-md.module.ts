import { NgModule } from "@angular/core";
import {
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressSpinnerModule
} from "@angular/material";

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        MatBadgeModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        MatBadgeModule,
        MatProgressSpinnerModule
    ]
})

export class AppMdModule { }