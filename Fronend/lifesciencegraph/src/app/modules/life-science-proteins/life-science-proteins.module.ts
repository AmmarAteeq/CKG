import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';


import { LifeScienceProteinsRoutingModule } from './life-science-proteins-routing.module';
import { LifeScienceProteinsComponent } from './life-science-proteins.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    LifeScienceProteinsComponent
  ],
  imports: [
    CommonModule,
    LifeScienceProteinsRoutingModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NgSelectModule
  ]
})
export class LifeScienceProteinsModule {


}
