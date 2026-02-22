/// <reference lib="webworker" />

import { MODELS_MAP } from '../constants';

import { env, pipeline } from '@huggingface/transformers';
import { ModelStatus } from '../types';

env.allowLocalModels = false;

const transformer_pipelines: Record<string, any> = {};

async function deleteAllModels() {
  try {
    return await caches.delete('transformers-cache');
  } catch (error) {
    console.error('Error deleting cache:', error);
    return false;
  }
}


addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;

  if (!data.type) {
      const modelStatus: ModelStatus = {
        status: 'error',
        msg: 'No message type specified.',
      }
      postMessage(modelStatus);
      return;
  }
  const dataType = `${data.type}`;

  if (dataType === 'delete-all-models') {
    // Clear all models from transformers-cache
    deleteAllModels().then((result) => {
      if (result) {
        const modelStatus: ModelStatus = {
          status: 'success',
          msg: 'All models deleted.',
        }
        postMessage(modelStatus);
      } else {
        const modelStatus: ModelStatus = {
          status: 'error',
          msg: 'Error deleting models.',
        }
        postMessage(modelStatus);
      }
    });
  } else if (dataType === 'translate-blog') {
    const modelStatus: ModelStatus = {
      status: 'idle',
    }
    postMessage(modelStatus);
  } else if (dataType === 'read-blog') {
    const modelStatus: ModelStatus = {
      status: 'idle',
    }
    postMessage(modelStatus);
  } else if (MODELS_MAP[dataType]) {
    const modelId = MODELS_MAP[dataType].modelId;
    const task = MODELS_MAP[dataType].task;
    let progress = 0;
    const device = (navigator as any).gpu ? 'webgpu' : 'wasm';

    console.log('device', device);
    pipeline(task, modelId,  {
      device,
      progress_callback: (progressData: any) => {
        progress = progressData.progress;
        const modelStatus: ModelStatus = {
          status: 'downloading',
          modelId,
          progress,
        }
        postMessage(modelStatus);
      },
    }).then((pipe: any) => {
      transformer_pipelines[dataType] = pipe;
      const modelStatus: ModelStatus = {
        status: 'ready',
        modelId,
      }
      postMessage(modelStatus);
    }).catch((error: any) => {
      const modelStatus: ModelStatus = {
        status: 'error',
        msg: error instanceof Error ? error.message : 'Error downloading model.',
      }
      postMessage(modelStatus);
    });
  }
  postMessage(response);
});
