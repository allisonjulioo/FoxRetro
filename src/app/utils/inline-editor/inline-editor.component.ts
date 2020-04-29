import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.scss']
})
export class InlineEditorComponent implements OnInit {
  @ViewChild('cellInput', { static: false }) cellInput: ElementRef;
  @Input() data: string;
  @Input() color: string;
  @Input() textarea: boolean = false;
  @Output() focusOut: EventEmitter<string> = new EventEmitter<string>();
  editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  onFocusOut() {
    this.focusOut.emit(this.data);
  }
  onFocusIn() {
    this.editMode = true;
    setTimeout(() => {
      this.cellInput.nativeElement.focus();
    }, 10)
  }

}
