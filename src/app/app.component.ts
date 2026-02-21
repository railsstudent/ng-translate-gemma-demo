import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapTranslate } from '@ng-icons/bootstrap-icons'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIcon],
  viewProviders: [provideIcons({ bootstrapGithub, bootstrapTranslate })],
  template: `
    <div>Hello {{ title() }}<ng-icon name="bootstrapGithub" /><ng-icon name="bootstrapTranslate" /></div>
    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('ng-translate-gemma-demo');
}
