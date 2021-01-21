import {Directive, ElementRef, forwardRef, HostListener, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: 'input[type="date"][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputConverter),
      multi: true,
    },
  ],
})
export class DateInputConverter implements ControlValueAccessor {
  private fnChange: (value: Date) => void = () => void 0;
  private fnTouched: () => void = () => void 0;

  constructor(
    private readonly host: ElementRef,
    private readonly renderer: Renderer2,
  ) {
  }

  @HostListener('input', ['$event'])
  private onInput(event: any) {
    const newValue = new Date(event.target.value);
    this.fnChange(newValue);
  }

  writeValue(obj: Date): void {
    this.renderer.setProperty(this.host.nativeElement, 'valueAsNumber', obj?.getTime() ?? '');
  }

  registerOnChange(fn: any): void {
    this.fnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.host.nativeElement, 'disabled', isDisabled);
  }
}
