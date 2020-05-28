import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[primary]'
})
export class ColorsDirective {
  @Input() primary: string;
  colorAccent: string = '#456881'
  constructor(private el: ElementRef) {
  }
  @HostListener('mouseenter') onMouseEnter() {

  }
  ngOnChanges(changes) {
    this.set(this.primary, this.colorAccent);
  }
  ngOnInit(): void {
    document.querySelector('title').text = 'Vamoretro';
    this.set(this.primary, this.colorAccent);
  }
  private set(dom: string, color: string) {
    this.el.nativeElement.style = {};
    const span = this.el.nativeElement.childNodes[1];
    span.style.color = '#fff';
    this.el.nativeElement.style[dom] = color;

    const meta = document.createElement('meta');
    meta.name = "theme-color";
    meta.content = color;
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
} 