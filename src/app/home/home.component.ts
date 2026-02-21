import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">On Device Blog Translation with Gemma</h1>
      <p class="text-lg md:text-xl max-w-2xl mb-8">
        Run TranslateGemma directly in your browser to translate technical blog posts without sending data to a server. Private, lower latency, zero cost, on-device translation powered by Hugging Face Transformers.js, Angular, and Web Worker.
      </p>
      <a routerLink="/translate-blog" class="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
        Start Translating
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {}
