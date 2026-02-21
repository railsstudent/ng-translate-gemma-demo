import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NgOptimizedImage } from '@angular/common';
import { bootstrapList, bootstrapTranslate, bootstrapX } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIcon, NgOptimizedImage],
  template: `
    <header class="fixed top-0 w-full z-50 bg-blue-800 text-white border-b border-blue-900">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <a routerLink="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img ngSrc="favicon.ico" width="32" height="32" alt="Logo" priority />
          <h1 class="text-xl font-bold tracking-tight">TranslateGemma</h1>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <a routerLink="/translate-blog" routerLinkActive="text-blue-200" class="flex items-center gap-2 hover:text-blue-200 transition-colors font-medium">
            <ng-icon name="bootstrapTranslate" class="text-xl" />
            <span>Translate</span>
          </a>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button (click)="toggleMenu()" class="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors" aria-label="Toggle Menu">
          <ng-icon [name]="isMenuOpen() ? 'bootstrapX' : 'bootstrapList'" class="text-2xl" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      @if (isMenuOpen()) {
        <div class="mobile-menu md:hidden absolute top-16 left-0 w-full bg-blue-800 border-b border-blue-900 animate-in slide-in-from-top duration-200">
          <nav class="flex flex-col p-4 gap-4">
            <a routerLink="/translate-blog" routerLinkActive="bg-blue-700" (click)="toggleMenu()" class="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <ng-icon name="bootstrapTranslate" class="text-xl" />
              <span>Translate</span>
            </a>
          </nav>
        </div>
      }
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ bootstrapTranslate, bootstrapList, bootstrapX })]
})
/**
 * HeaderComponent provides the primary navigation and brand identity for the application.
 */
export class HeaderComponent {
  readonly isMenuOpen = signal(false);

  /**
   * Toggles the visibility of the mobile navigation menu.
   */
  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }
}
