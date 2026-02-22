import { PipelineType } from '@huggingface/transformers';

export const DOWNLOAD_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000;

export const ALL_MODELS = ['translate-gemma', 'tts'];

export const MODELS_MAP: Record<string, { modelId: string, task: PipelineType }>= {
  'translate-gemma': {
    modelId: 'google/translategemma-4b-it',
    task: 'text2text-generation',
  },
  'tts': {
    modelId: 'onnx-community/Kokoro-82M-v1.0-ONNX',
    task: 'text-to-speech',
  }
};
