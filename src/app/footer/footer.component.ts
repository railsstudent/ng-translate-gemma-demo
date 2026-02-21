import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  viewProviders: [provideIcons({ bootstrapGithub })],
  template: `
    <footer class="flex justify-between items-center p-4 w-full bg-indigo-600 text-white">
      <div>
        &copy; {{ currentYear }} Connie Leung
      </div>
      <div>
        Angular, Transformers.js
      </div>
      <div>
        <a href="https://github.com/ng-translate-gemma-demo" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-gray-300">
          <ng-icon name="bootstrapGithub"></ng-icon>
          ng-translate-gemma-demo
        </a>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
