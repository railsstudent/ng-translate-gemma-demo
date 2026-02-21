import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-translation',
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4 text-center">
      Dummy Translation Component
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslationComponent {}
