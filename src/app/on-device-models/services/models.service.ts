import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ModelStatus } from '../types';
import { ALL_MODELS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
    storage = inject(LocalStorageService);

    readonly all_models = ALL_MODELS;

    #status = signal<ModelStatus>({ status: 'idle' });
    status = this.#status.asReadonly();

    statusMessage = computed(() => {
      const status = this.#status().status;
      if (status === 'error' || status === 'success' || status === 'unsupported') {
        return this.#status().msg || '';
      } else if (status === 'ready') {
        return `Model ${this.#status().modelId} is ready.`;
      } else if (status === 'downloading') {
        const progress = (this.#status().progress || 0).toFixed(0);
        return `Downloading ${this.#status().modelId}: ${progress}%`;
      }

      return '';
    });

    statusType = computed(() => this.#status().status);

    constructor() {
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker(new URL('../workers/download-models.worker', import.meta.url));
        worker.onmessage = ({data}) => {
          console.log(`page got message: ${data}`);
        };
        // Send messages to download models in the background
        worker.postMessage({ type: this.all_models[0]});
      } else {
        // Web workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
      }
    }
}
