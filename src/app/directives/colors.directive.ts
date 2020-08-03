import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[primary]'
})
export class ColorsDirective implements OnInit, OnChanges {
  @Input() primary: string;
  colorPrimary = '#803ef5';
  textColor = '#fff';
  title = 'Fox Retro';
  constructor(private el: ElementRef) {
  }
  @HostListener('mouseenter') onMouseEnter() {

  }
  public ngOnChanges(): void {
    this.set(this.primary, this.colorPrimary);
  }
  public ngOnInit(): void {
    document.querySelector('title').text = this.title;
    this.set(this.primary, this.colorPrimary);
  }
  private set(dom: string, color: string) {
    this.el.nativeElement.style = {};
    const span = this.el.nativeElement.childNodes[1];
    span.style.color = this.textColor;
    this.el.nativeElement.style[dom] = color;

    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = color;
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
}
