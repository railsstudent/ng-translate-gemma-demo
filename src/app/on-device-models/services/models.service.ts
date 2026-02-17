import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
    isTranslateGemmaDownloaded = signal(false);
    isDownloading = signal(false);
}
