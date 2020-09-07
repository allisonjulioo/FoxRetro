import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [SearchComponent],
})
export class SearchModule {}
