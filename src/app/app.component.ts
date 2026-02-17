import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('ng-translate-gemma-demo');

  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./on-device-models/workers/download-models.worker', import.meta.url));
      worker.onmessage = ({data}) => {
        console.log(`page got message: ${data}`);
      };
      // Send messages to downlaod models in the background
      worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

}
