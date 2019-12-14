import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatChipsModule, MatStepperModule, MatSelectModule, MatIconModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'app/guard/auth-guard';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PrivacyPolicyComponent } from './privacy-policy.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

const routes: Routes = [
  {
    path: '**',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxMaskModule.forRoot(options)
  ]
})
export class PrivacyPolicyModule { }