import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
})
export class MaterialModule { }