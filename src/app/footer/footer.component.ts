import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  viewProviders: [provideIcons({ bootstrapGithub })],
  template: `
    <footer class="flex justify-between items-center p-4 w-full bg-blue-800 text-white">
      <div class="flex">
        <span class="mr-2">&copy; {{ copyright }}</span>
        <a href="https://github.com/railsstudent/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-gray-300">
         <ng-icon name="bootstrapGithub"></ng-icon>Connie Leung
        </a>
      </div>
      <div>
        {{ techStack }}
      </div>
      <div>
        <a href="https://github.com/railsstudent/ng-translate-gemma-demo" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-gray-300">
          <ng-icon name="bootstrapGithub"></ng-icon>
          ng-translate-gemma-demo
        </a>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly copyright = new Date().getFullYear();
  readonly techStack = "The demo is built by Angular and Transformer.js.";
}
