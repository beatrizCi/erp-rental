import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  template: `
    <button
      [class]="classes"
      [type]="type">
      <ng-content></ng-content>
    </button>
  `
})
export class Button {
  @Input() type: string = 'button';
  @Input() classes: string  =  'bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700';
}
