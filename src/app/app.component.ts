import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header />
      <main class="flex-1 pt-16">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class App {}
