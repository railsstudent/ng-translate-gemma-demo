import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
    isTranslateGemmaDownloaded = signal(false);
    isDownloading = signal(false);

    constructor() {
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker(new URL('../workers/download-models.worker', import.meta.url));
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
