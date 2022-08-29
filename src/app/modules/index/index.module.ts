import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IIndexComponent } from './comp/i-index/i-index.component';
import { IFooterComponent } from './comp/i-footer/i-footer.component';
import { IMainbarComponent } from './comp/i-mainbar/i-mainbar.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IIndexComponent,
    IFooterComponent,
    IMainbarComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class IndexModule { }
