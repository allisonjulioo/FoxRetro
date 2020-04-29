import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineEditorComponent } from './inline-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    InlineEditorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    InlineEditorComponent
  ]
})
export class InlineEditorModule { }
