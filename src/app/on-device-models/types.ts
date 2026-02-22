export type StatusType = 'idle' | 'downloading' | 'ready' | 'success' | 'error' | 'unsupported';

export type ModelStatus = {
  status: StatusType;
  msg?: string;
  progress?: number;
  modelId?: string;
};
