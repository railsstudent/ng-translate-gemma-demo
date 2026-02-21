import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapTranslate } from '@ng-icons/bootstrap-icons';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIcon, FooterComponent],
  viewProviders: [provideIcons({ bootstrapGithub, bootstrapTranslate })],
  template: `
    <div class="flex flex-col min-h-screen">
      <main class="flex-1">
        <div>Hello {{ title() }}<ng-icon name="bootstrapGithub" /><ng-icon name="bootstrapTranslate" /></div>
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {
  protected readonly title = signal('ng-translate-gemma-demo');
}
